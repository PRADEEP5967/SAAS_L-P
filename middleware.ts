import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from '@supabase/supabase-js';

// Paths that require authentication
const protectedPaths = [
  "/dashboard",
  "/settings",
  "/api/metrics",
  "/api/users",
  "/api/integrations",
];

// Paths that should redirect to dashboard if user is already authenticated
const authPaths = ["/auth/signin", "/auth/signup", "/auth/forgot-password"];

// Public API routes that don't need authentication
const publicApiPaths = [
  "/api/auth",
  "/api/health",
];

async function getUser(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    },
  });

  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes that don't need processing
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".") && !pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  // Check if this is a protected path
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  const isAuthPath = authPaths.some(path => pathname === path);
  const isPublicApiPath = publicApiPaths.some(path => pathname.startsWith(path));

  // For API routes, check authentication
  if (pathname.startsWith("/api/") && !isPublicApiPath && isProtectedPath) {
    const user = await getUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
  }

  // For page routes, handle redirects
  if (!pathname.startsWith("/api/")) {
    const user = await getUser(request);

    // If trying to access protected path without session, redirect to login
    if (isProtectedPath && !user) {
      const url = new URL("/auth/signin", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }

    // If trying to access auth paths with session, redirect to dashboard
    if (isAuthPath && user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
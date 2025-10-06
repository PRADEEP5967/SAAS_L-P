import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

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

async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret");
    const { payload } = await jwtVerify(token, secret);
    return payload;
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
  if (pathname.startsWith("/api/") && !isPublicApiPath) {
    const token = request.cookies.get("session")?.value ||
                  request.headers.get("authorization")?.replace("Bearer ", "");

    if (isProtectedPath && !token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (token) {
      const payload = await verifyToken(token);
      if (!payload) {
        const response = NextResponse.json(
          { error: "Invalid token" },
          { status: 401 }
        );
        response.cookies.delete("session");
        return response;
      }
    }
  }

  // For page routes, handle redirects
  if (!pathname.startsWith("/api/")) {
    const session = request.cookies.get("session")?.value;

    // If trying to access protected path without session, redirect to login
    if (isProtectedPath && !session) {
      const url = new URL("/auth/signin", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }

    // If trying to access auth paths with session, redirect to dashboard
    if (isAuthPath && session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
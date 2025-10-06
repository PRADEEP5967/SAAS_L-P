import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return errorResponse("Email and password are required", "INVALID_CREDENTIALS");
    }

    // Trim inputs and make email case-insensitive
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // TODO: Implement your actual authentication logic here
    // This is just a mock implementation
    if (trimmedEmail === "demo@example.com" && trimmedPassword === "password") {
      const response = successResponse({
        user: {
          id: "1",
          email: "demo@example.com",
          name: "Demo User"
        },
        token: "mock_jwt_token"
      });

      // Set session cookie
      response.cookies.set("session", "mock_session_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return errorResponse("Invalid credentials", "INVALID_CREDENTIALS", 401);
  } catch (error) {
    console.error("Sign in error:", error);
    return errorResponse(
      "An error occurred during sign in",
      "AUTH_ERROR",
      500
    );
  }
}

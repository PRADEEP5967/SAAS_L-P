import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    // Get session cookie
    const sessionCookie = request.cookies.get("session");

    if (!sessionCookie) {
      return errorResponse("No session found", "NO_SESSION", 401);
    }

    // TODO: Implement proper session validation
    // For now, return mock user data if session exists
    const response = successResponse({
      user: {
        id: "1",
        email: "demo@example.com",
        name: "Demo User"
      }
    });

    return response;
  } catch (error) {
    console.error("Session check error:", error);
    return errorResponse(
      "An error occurred during session check",
      "SESSION_ERROR",
      500
    );
  }
}

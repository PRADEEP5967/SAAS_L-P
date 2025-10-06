import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return errorResponse(
        "Email, password, and name are required",
        "INVALID_REQUEST"
      );
    }

    // TODO: Implement your actual registration logic here
    // This is just a mock implementation
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
    };

    return successResponse({
      user,
      token: "mock_jwt_token"
    }, 201);
  } catch (error) {
    console.error("Sign up error:", error);
    return errorResponse(
      "An error occurred during sign up",
      "AUTH_ERROR",
      500
    );
  }
}
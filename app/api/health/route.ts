import { NextRequest } from "next/server"
import { successResponse } from "@/lib/api-response"

export async function GET(request: NextRequest) {
  return successResponse({
    status: "ok",
    service: "saas-landing",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  })
}

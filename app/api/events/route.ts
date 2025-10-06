import { type NextRequest, NextResponse } from "next/server"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, payload } = body ?? {}

    if (typeof type !== "string" || !type.trim()) {
      return new NextResponse(JSON.stringify({ error: "Invalid 'type'. Expected non-empty string." }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      })
    }

    // Simulate event ingestion
    const receivedAt = new Date().toISOString()
    const id = `evt_${Math.random().toString(36).slice(2, 10)}`

    return new NextResponse(JSON.stringify({ received: true, id, type, payload: payload ?? null, receivedAt }), {
      status: 201,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    })
  } catch {
    return new NextResponse(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    })
  }
}

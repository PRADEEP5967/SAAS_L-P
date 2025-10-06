import { NextResponse } from "next/server"

export async function GET() {
  // Example statuses. Wire up to real integrations later.
  const integrations = [
    { key: "slack", name: "Slack", status: "connected" },
    { key: "stripe", name: "Stripe", status: "disconnected" },
    { key: "notion", name: "Notion", status: "connected" },
  ]
  return NextResponse.json({ integrations, updatedAt: new Date().toISOString() })
}

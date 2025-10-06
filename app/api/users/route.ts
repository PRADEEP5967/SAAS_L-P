import { NextResponse } from "next/server"

export async function GET() {
  // Sample data. Replace with your data layer when ready.
  const users = [
    { id: "u_01", name: "Alex Johnson", email: "alex@example.com", role: "admin" },
    { id: "u_02", name: "Priya Patel", email: "priya@example.com", role: "member" },
    { id: "u_03", name: "Diego Ramos", email: "diego@example.com", role: "member" },
  ]
  return NextResponse.json({ users, count: users.length, fetchedAt: new Date().toISOString() })
}

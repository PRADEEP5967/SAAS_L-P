import { NextResponse } from "next/server"

export async function GET() {
  const now = Date.now()
  const hour = 1000 * 60 * 60
  const timeseries = Array.from({ length: 24 }).map((_, i) => ({
    t: new Date(now - (23 - i) * hour).toISOString(),
    visitors: Math.round(200 + Math.random() * 150),
    signups: Math.round(10 + Math.random() * 30),
  }))

  const totals = timeseries.reduce(
    (acc, cur) => {
      acc.visitors += cur.visitors
      acc.signups += cur.signups
      return acc
    },
    { visitors: 0, signups: 0 },
  )

  const conversionRate = totals.visitors > 0 ? Number(((totals.signups / totals.visitors) * 100).toFixed(2)) : 0

  return NextResponse.json({
    summary: {
      visitors: totals.visitors,
      signups: totals.signups,
      conversionRate,
    },
    timeseries,
    generatedAt: new Date().toISOString(),
  })
}

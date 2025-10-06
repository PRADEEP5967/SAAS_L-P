"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ApiTryIt() {
  const [endpoint, setEndpoint] = useState("/api/health")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>("")

  async function handleSend() {
    try {
      setLoading(true)
      setResult("")
      const res = await fetch(endpoint, { method: "GET" })
      const text = await res.text()
      setResult(text)
    } catch (err: any) {
      setResult(`Request failed: ${err?.message ?? "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full rounded-lg border bg-background p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <Input
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          placeholder="/api/health"
          className="md:max-w-md"
        />
        <Button onClick={handleSend} disabled={loading}>
          {loading ? "Sending..." : "Send GET"}
        </Button>
      </div>
      <div className="mt-4">
        <label className="text-sm text-muted-foreground">Response</label>
        <pre className="mt-2 max-h-72 overflow-auto rounded-md bg-muted p-3 text-xs leading-5">
          {result || "{ /* Response will appear here */ }"}
        </pre>
      </div>
    </div>
  )
}

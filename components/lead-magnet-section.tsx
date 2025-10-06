"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Download, CheckCircle, AlertCircle } from "lucide-react"

export function LeadMagnetSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // Simulate API call
    setTimeout(() => {
      if (email.includes("@")) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    }, 1000)
  }

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12">
            <CardContent className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Download className="h-8 w-8 text-primary" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-balance mb-6">Get Your Free SaaS Growth Guide</h2>

              <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Download our comprehensive 50-page guide with proven strategies to scale your SaaS business. Includes
                templates, checklists, and real case studies.
              </p>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
                <div className="flex gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button type="submit" disabled={status === "loading"}>
                    {status === "loading" ? "Sending..." : "Download Free"}
                  </Button>
                </div>

                {status === "success" && (
                  <div className="flex items-center justify-center gap-2 text-green-600 mt-4">
                    <CheckCircle className="h-5 w-5" />
                    <span>Success! Check your email for the download link.</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center justify-center gap-2 text-red-600 mt-4">
                    <AlertCircle className="h-5 w-5" />
                    <span>Please enter a valid email address.</span>
                  </div>
                )}
              </form>

              <p className="text-sm text-muted-foreground">
                No spam, ever. Unsubscribe at any time. By downloading, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

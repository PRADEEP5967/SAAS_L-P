import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing - SaaSFlow",
  description: "Simple, transparent pricing that scales with your business. Choose the perfect plan for your team with no hidden fees.",
  keywords: ["pricing", "plans", "subscription", "costs", "enterprise"],
  authors: [{ name: "SaaSFlow Team" }],
  openGraph: {
    title: "Pricing - SaaSFlow",
    description: "Simple, transparent pricing that scales with your business. Choose the perfect plan for your team with no hidden fees.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pricing - SaaSFlow",
    description: "Simple, transparent pricing that scales with your business. Choose the perfect plan for your team with no hidden fees.",
  },
}

export default function PricingPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-balance">Pricing</h1>
      <p className="text-muted-foreground mt-3">Simple, transparent pricing that scales with you.</p>
    </main>
  )
}

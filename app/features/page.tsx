import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Features - SaaSFlow",
  description: "Discover powerful features designed to accelerate your workflow and help your team ship faster. Analytics, automation, and collaboration tools.",
  keywords: ["features", "functionality", "tools", "productivity", "workflow"],
  authors: [{ name: "SaaSFlow Team" }],
  openGraph: {
    title: "Features - SaaSFlow",
    description: "Discover powerful features designed to accelerate your workflow and help your team ship faster. Analytics, automation, and collaboration tools.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Features - SaaSFlow",
    description: "Discover powerful features designed to accelerate your workflow and help your team ship faster. Analytics, automation, and collaboration tools.",
  },
}

export default function FeaturesPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-balance">Features</h1>
      <p className="text-muted-foreground mt-3">
        Powerful features to accelerate your workflow and help your team ship faster.
      </p>
    </main>
  )
}

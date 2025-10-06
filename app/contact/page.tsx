import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - SaaSFlow",
  description: "Get in touch with our team. We reply within 1 business day and are here to help with any questions about our SaaS platform.",
  keywords: ["contact", "support", "help", "customer service"],
  authors: [{ name: "SaaSFlow Team" }],
  openGraph: {
    title: "Contact Us - SaaSFlow",
    description: "Get in touch with our team. We reply within 1 business day and are here to help with any questions about our SaaS platform.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us - SaaSFlow",
    description: "Get in touch with our team. We reply within 1 business day and are here to help with any questions about our SaaS platform.",
  },
}

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-balance">Contact</h1>
      <p className="text-muted-foreground mt-3">We reply within 1 business day. Email us at support@example.com.</p>
    </main>
  )
}

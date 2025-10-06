import { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { UrgencyBanner } from "@/components/urgency-banner"
import { LogoRow } from "@/components/logo-row"
import { BenefitsSection } from "@/components/benefits-section"
import { ProductShowcase } from "@/components/product-showcase"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FeaturesSection } from "@/components/features-section"
import { ComparisonSection } from "@/components/comparison-section"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { LeadMagnetSection } from "@/components/lead-magnet-section"
import { Footer } from "@/components/footer"
import { EndpointsSection } from "@/components/endpoints-section"
import { AnalyticsDashboardSection } from "@/components/analytics-dashboard-section"
import { WorkflowAutomationSection } from "@/components/workflow-automation-section"
import { TeamCollaborationSection } from "@/components/team-collaboration-section"

export const metadata: Metadata = {
  title: "SaaSFlow - Modern Business Software Solutions",
  description: "Streamline your business operations with our comprehensive SaaS platform. Analytics, automation, and collaboration tools built for modern teams.",
  keywords: ["SaaS", "business software", "analytics", "automation", "collaboration", "productivity"],
  authors: [{ name: "SaaSFlow Team" }],
  openGraph: {
    title: "SaaSFlow - Modern Business Software Solutions",
    description: "Streamline your business operations with our comprehensive SaaS platform. Analytics, automation, and collaboration tools built for modern teams.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaSFlow - Modern Business Software Solutions",
    description: "Streamline your business operations with our comprehensive SaaS platform. Analytics, automation, and collaboration tools built for modern teams.",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <UrgencyBanner />
      <Header />
      <main>
        <HeroSection />
        <LogoRow />
        <BenefitsSection />
        <ProductShowcase />
        <TestimonialsSection />
        <FeaturesSection />
        <EndpointsSection />
        <AnalyticsDashboardSection />
        <WorkflowAutomationSection />
        <TeamCollaborationSection />
        <ComparisonSection />
        <PricingSection />
        <FAQSection />
        <LeadMagnetSection />
      </main>
      <Footer />
    </div>
  )
}

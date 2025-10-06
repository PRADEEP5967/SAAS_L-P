import { Card, CardContent } from "@/components/ui/card"
import { Zap, Shield, TrendingUp } from "lucide-react"

export function BenefitsSection() {
  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Deploy and scale your applications in seconds, not hours. Our optimized infrastructure ensures peak performance.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level security with end-to-end encryption, compliance certifications, and advanced threat protection.",
    },
    {
      icon: TrendingUp,
      title: "Proven Growth",
      description: "Join thousands of companies that have increased their productivity by 300% using our platform.",
    },
  ]

  return (
    <section className="py-20" id="benefits">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">Why Choose SaaSFlow?</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Experience the difference with our cutting-edge platform designed for modern businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow border-border/50">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

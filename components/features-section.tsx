import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Users, Workflow, Lock, Globe, Smartphone } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time insights with customizable dashboards and automated reporting.",
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Collaborate seamlessly with role-based permissions and team workspaces.",
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      description: "Automate repetitive tasks and streamline your business processes.",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-level security with SOC 2 compliance and data encryption.",
    },
    {
      icon: Globe,
      title: "Global CDN",
      description: "Lightning-fast performance with our worldwide content delivery network.",
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Access your data anywhere with our responsive mobile applications.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">Powerful Features for Modern Teams</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Everything you need to build, deploy, and scale your applications with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

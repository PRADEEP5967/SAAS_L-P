import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"

export function ComparisonSection() {
  const features = [
    "Advanced Analytics Dashboard",
    "Unlimited Team Members",
    "Workflow Automation",
    "API Access",
    "24/7 Priority Support",
    "Custom Integrations",
    "Advanced Security Features",
    "White-label Options",
  ]

  const competitors = [
    { name: "SaaSFlow", features: [true, true, true, true, true, true, true, true] },
    { name: "Competitor A", features: [true, false, true, false, false, true, false, false] },
    { name: "Competitor B", features: [false, true, false, true, false, false, true, false] },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">Why SaaSFlow Leads the Market</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            See how we compare to the competition across key features and capabilities.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto overflow-hidden">
          <CardHeader>
            <CardTitle className="text-center">Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium">Features</th>
                    {competitors.map((competitor, index) => (
                      <th key={index} className={`text-center p-4 font-medium ${index === 0 ? "bg-primary/5" : ""}`}>
                        {competitor.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, featureIndex) => (
                    <tr key={featureIndex} className="border-b border-border last:border-b-0">
                      <td className="p-4 font-medium">{feature}</td>
                      {competitors.map((competitor, compIndex) => (
                        <td key={compIndex} className={`text-center p-4 ${compIndex === 0 ? "bg-primary/5" : ""}`}>
                          {competitor.features[featureIndex] ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

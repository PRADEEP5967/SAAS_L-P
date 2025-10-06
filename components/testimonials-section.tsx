import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO at TechCorp",
      avatar: "/professional-woman-headshot.png",
      content:
        "SaaSFlow transformed our development workflow. We've reduced deployment time by 80% and our team productivity has never been higher.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Founder at GrowthCo",
      avatar: "/professional-man-headshot.png",
      content:
        "The analytics insights helped us identify key growth opportunities. Our revenue increased by 150% in just 6 months.",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "VP Engineering at ScaleUp",
      avatar: "/professional-woman-headshot-2.png",
      content:
        "Outstanding platform with exceptional support. The automation features saved us countless hours of manual work.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their businesses with SaaSFlow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

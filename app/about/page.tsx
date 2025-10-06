import { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About Us - SaaSFlow",
  description: "Learn about SaaSFlow's mission to democratize business software. We're building the future of enterprise tools for everyone.",
  keywords: ["about", "company", "mission", "team", "business software"],
  authors: [{ name: "SaaSFlow Team" }],
  openGraph: {
    title: "About Us - SaaSFlow",
    description: "Learn about SaaSFlow's mission to democratize business software. We're building the future of enterprise tools for everyone.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Us - SaaSFlow",
    description: "Learn about SaaSFlow's mission to democratize business software. We're building the future of enterprise tools for everyone.",
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Building the Future of Business Software
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            We're on a mission to make powerful business tools accessible to everyone.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-8">
            At SaaSFlow, we believe that every business, regardless of size, deserves
            access to powerful, enterprise-grade software tools. We're breaking down
            barriers and democratizing business technology.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Innovation",
              description:
                "We're constantly pushing boundaries and exploring new ways to solve complex problems.",
            },
            {
              title: "Transparency",
              description:
                "We believe in open communication and building trust through honesty.",
            },
            {
              title: "Customer First",
              description:
                "Every decision we make starts with our customers' needs and success.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="p-6 rounded-lg border bg-card text-card-foreground"
            >
              <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Want to be part of our mission? We're always looking for talented
            individuals to join our team.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/careers">View Careers</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

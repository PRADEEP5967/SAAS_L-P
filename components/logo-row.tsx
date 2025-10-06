export function LogoRow() {
  const logos = [
    { name: "TechCorp", logo: "/tech-company-logo.jpg" },
    { name: "InnovateLab", logo: "/innovation-lab-logo.png" },
    { name: "GrowthCo", logo: "/growth-company-logo.png" },
    { name: "ScaleUp", logo: "/abstract-startup-logo.png" },
    { name: "Enterprise", logo: "/abstract-enterprise-logo.png" },
    { name: "FutureTech", logo: "/future-tech-logo.png" },
  ]

  return (
    <section className="py-16 border-b border-border">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground mb-12 text-lg">Trusted by industry leaders worldwide</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {logos.map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
            >
              <img
                src={company.logo || "/placeholder.svg"}
                alt={`${company.name} logo`}
                className="h-8 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

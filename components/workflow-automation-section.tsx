import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const steps = [
  { title: "Trigger", desc: "New lead created" },
  { title: "Filter", desc: "Plan is Pro" },
  { title: "Action", desc: "Create onboarding task" },
  { title: "Notify", desc: "Slack and Email" },
]

export function WorkflowAutomationSection() {
  return (
    <section aria-labelledby="automation" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 id="automation" className="text-3xl md:text-4xl font-semibold text-balance">
            Workflow Automation
          </h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            Automate repetitive work with reliable, visual workflows. Ship more by letting automations do the busywork.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                  <CardDescription>{s.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {i === 0 && "Start automation with 50+ triggers"}
                    {i === 1 && "Branch by rules, tags, or user traits"}
                    {i === 2 && "Native actions across popular tools"}
                    {i === 3 && "Confirm delivery and retries"}
                  </div>
                </CardContent>
              </Card>
              {i !== steps.length - 1 && (
                <div
                  className="hidden md:block absolute right-[-12px] top-1/2 -translate-y-1/2 w-6 h-[2px] bg-border"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button className="px-6">Build a workflow</Button>
          <Button variant="secondary" className="px-6">
            Browse templates
          </Button>
        </div>
      </div>
    </section>
  )
}

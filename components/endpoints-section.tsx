import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function EndpointsSection() {
  return (
    <section aria-labelledby="endpoints" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 id="endpoints" className="text-3xl md:text-4xl font-semibold text-balance">
            Powerful API Endpoints
          </h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            Ship faster with a clean, consistent API. REST-first endpoints, idempotent mutations, and secure webhooks.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <CardHeader className="border-b">
              <CardTitle className="text-base">Create Resource</CardTitle>
              <CardDescription>Idempotent write with conflict handling</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <pre className="text-sm overflow-x-auto p-4 bg-secondary/50">
                {`POST /v1/resources
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Pro Plan",
  "active": true
}`}
              </pre>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="border-b">
              <CardTitle className="text-base">Webhook Delivery</CardTitle>
              <CardDescription>Signed events with retries</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <pre className="text-sm overflow-x-auto p-4 bg-secondary/50">
                {`POST https://yourapp.com/webhooks/events
X-Signature: t=172..., v1=23ab...

{
  "type": "resource.updated",
  "data": { "id": "res_123", "active": true }
}`}
              </pre>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button className="px-6">Explore API docs</Button>
          <Button variant="secondary" className="px-6">
            Get a test token
          </Button>
        </div>
      </div>
    </section>
  )
}

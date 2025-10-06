import { Card, CardContent } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-16 bg-background border-b animate-pulse" />
      <main className="container mx-auto px-4 py-8">
        <div className="h-12 w-48 bg-muted rounded-md animate-pulse mb-8" />
        
        <div className="grid gap-8">
          {/* Metrics Section Loading */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                    <div className="h-8 w-32 bg-muted rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Section Loading */}
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                    <div className="h-[200px] bg-muted rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map Section Loading */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                <div className="h-[400px] bg-muted rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
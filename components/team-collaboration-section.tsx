import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TeamCollaborationSection() {
  return (
    <section aria-labelledby="collaboration" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 id="collaboration" className="text-3xl md:text-4xl font-semibold text-balance">
            Built for Team Collaboration
          </h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            Real-time comments, role-based access, and shared workspaces keep everyone aligned and shipping together.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Real-time threads</CardTitle>
              <CardDescription>Context where work happens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src="/team-member-photo.jpg" alt="Team member avatar" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">Alex Morgan</p>
                  <p className="text-sm text-muted-foreground">
                    Let’s roll this to the Pro plan experiment behind a flag.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src="/team-member-photo.jpg" alt="Team member avatar" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">Jordan Park</p>
                  <p className="text-sm text-muted-foreground">
                    Agreed—adding an owner checklist to the onboarding flow.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Access controls</CardTitle>
              <CardDescription>Granular roles and audit logs</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Owner</p>
                <p className="font-medium">Full access</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Admin</p>
                <p className="font-medium">Manage teams</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Editor</p>
                <p className="font-medium">Create + edit</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Viewer</p>
                <p className="font-medium">Read-only</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button className="px-6">Start collaborating</Button>
          <Button variant="secondary" className="px-6">
            Invite your team
          </Button>
        </div>
      </div>
    </section>
  )
}

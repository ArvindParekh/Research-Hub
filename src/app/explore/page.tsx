import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Zap, Users, Calendar, Briefcase } from "lucide-react"
import Link from "next/link"

export default function ExplorePage() {
  const sections = [
    {
      title: "Featured Researchers",
      description: "Discover leading academics across all disciplines",
      icon: Users,
      href: "/profiles",
      count: "2,500+",
    },
    {
      title: "Research Repository",
      description: "Access pre-prints and published research papers",
      icon: BookOpen,
      href: "/repository",
      count: "50,000+",
    },
    {
      title: "Research Groups",
      description: "Join collaborative research communities",
      icon: Users,
      href: "/groups",
      count: "150+",
    },
    {
      title: "Academic Jobs",
      description: "Explore opportunities in academia and research",
      icon: Briefcase,
      href: "/jobs",
      count: "500+",
    },
    {
      title: "Events & Conferences",
      description: "Attend virtual and in-person academic events",
      icon: Calendar,
      href: "/events",
      count: "100+",
    },
    {
      title: "Collaboration Tools",
      description: "Real-time messaging, projects, and whiteboard",
      icon: Zap,
      href: "/whiteboard",
      count: "Active",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Academic Nexus</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/profiles" className="text-muted-foreground hover:text-foreground transition-colors">
                Researchers
              </Link>
              <Link href="/groups" className="text-muted-foreground hover:text-foreground transition-colors">
                Groups
              </Link>
              <Link href="/repository" className="text-muted-foreground hover:text-foreground transition-colors">
                Repository
              </Link>
              <Link href="/jobs" className="text-muted-foreground hover:text-foreground transition-colors">
                Jobs
              </Link>
              <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                Events
              </Link>
            </nav>
            <Button asChild>
              <Link href="/register">Join Now</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Explore Academic Nexus</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover researchers, research groups, academic opportunities, and collaborate with peers worldwide
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <Link key={index} href={section.href}>
                <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {section.count}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3 text-foreground">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join thousands of researchers collaborating on Academic Nexus
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">Create Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/profiles">Browse Researchers</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

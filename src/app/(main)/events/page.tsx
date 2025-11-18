import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Search,
  Filter,
  Plus,
  Calendar,
  MapPin,
  Users,
  Video,
  Mic,
  Globe,
  Star,
  Play,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default function EventsPage() {
  const featuredEvents = [
    {
      id: "neurips-2024",
      title: "Neural Information Processing Systems 2024",
      subtitle: "NeurIPS 2024",
      description:
        "The premier conference on neural information processing systems, featuring cutting-edge research in machine learning, AI, and computational neuroscience.",
      type: "Conference",
      format: "Virtual",
      startDate: "2024-12-10",
      endDate: "2024-12-16",
      timezone: "PST",
      attendees: 8500,
      maxAttendees: 10000,
      price: "Free",
      organizer: "NeurIPS Foundation",
      tags: ["Machine Learning", "AI", "Neural Networks", "Research"],
      sessions: 156,
      speakers: 89,
      posters: 234,
      isLive: false,
      isFeatured: true,
      rating: 4.9,
      image: "/neural-networks-conference.png",
    },
    {
      id: "quantum-symposium-2024",
      title: "International Quantum Computing Symposium",
      subtitle: "IQCS 2024",
      description:
        "Join leading researchers and industry experts to explore the latest advances in quantum computing, quantum algorithms, and quantum information theory.",
      type: "Symposium",
      format: "Hybrid",
      startDate: "2024-02-15",
      endDate: "2024-02-17",
      timezone: "EST",
      attendees: 1200,
      maxAttendees: 1500,
      price: "$299",
      organizer: "Quantum Research Institute",
      tags: ["Quantum Computing", "Physics", "Algorithms", "Hardware"],
      sessions: 24,
      speakers: 18,
      posters: 45,
      isLive: true,
      isFeatured: true,
      rating: 4.7,
      image: "/placeholder-k1l85.png",
    },
    {
      id: "bioai-workshop-2024",
      title: "AI in Biology and Medicine Workshop",
      subtitle: "BioAI 2024",
      description:
        "Exploring the intersection of artificial intelligence and biological sciences, with focus on drug discovery, genomics, and medical imaging.",
      type: "Workshop",
      format: "Virtual",
      startDate: "2024-03-22",
      endDate: "2024-03-22",
      timezone: "GMT",
      attendees: 450,
      maxAttendees: 500,
      price: "$99",
      organizer: "BioAI Consortium",
      tags: ["AI", "Biology", "Medicine", "Drug Discovery"],
      sessions: 8,
      speakers: 12,
      posters: 28,
      isLive: false,
      isFeatured: false,
      rating: 4.5,
      image: "/ai-biology-medicine-conference.png",
    },
  ];

  const upcomingEvents = [
    {
      id: "icml-2024",
      title: "International Conference on Machine Learning",
      date: "2024-07-21",
      type: "Conference",
      attendees: 6500,
    },
    {
      id: "cvpr-2024",
      title: "Computer Vision and Pattern Recognition",
      date: "2024-06-17",
      type: "Conference",
      attendees: 4200,
    },
    {
      id: "acl-2024",
      title: "Association for Computational Linguistics",
      date: "2024-08-11",
      type: "Conference",
      attendees: 3800,
    },
  ];

  const eventTypes = [
    "All Types",
    "Conference",
    "Workshop",
    "Symposium",
    "Seminar",
    "Webinar",
  ];
  const formats = ["All Formats", "Virtual", "In-Person", "Hybrid"];
  const categories = [
    "All Categories",
    "Machine Learning",
    "Computer Science",
    "Physics",
    "Biology",
    "Chemistry",
    "Mathematics",
  ];

  const getFormatColor = (format: string) => {
    switch (format) {
      case "Virtual":
        return "bg-blue-100 text-blue-800";
      case "In-Person":
        return "bg-green-100 text-green-800";
      case "Hybrid":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "Virtual":
        return <Video className="w-4 h-4" />;
      case "In-Person":
        return <MapPin className="w-4 h-4" />;
      case "Hybrid":
        return <Globe className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar page="events" />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Academic Events & Conferences
          </h1>
          <p className="text-muted-foreground">
            Discover, attend, and host virtual and hybrid academic events with
            interactive features
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search events by title, topic, or organizer..."
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((type) => (
                <SelectItem
                  key={type}
                  value={type.toLowerCase().replace(" ", "-")}
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              {formats.map((format) => (
                <SelectItem
                  key={format}
                  value={format.toLowerCase().replace(" ", "-")}
                >
                  {format}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Events</TabsTrigger>
            <TabsTrigger value="live">Live Now</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                All Events
              </Button>
              <Button variant="outline" size="sm">
                <Video className="w-4 h-4 mr-2" />
                Virtual
              </Button>
              <Button variant="outline" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                Hybrid
              </Button>
              <Button variant="outline" size="sm">
                Free Events
              </Button>
              <Button variant="outline" size="sm">
                This Week
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* Featured Events */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Featured Events</h2>
              <div className="grid gap-6">
                {featuredEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <CardTitle className="text-xl">
                                  <Link
                                    href={`/events/${event.id}`}
                                    className="hover:text-primary transition-colors"
                                  >
                                    {event.title}
                                  </Link>
                                </CardTitle>
                                {event.isLive && (
                                  <Badge className="bg-red-100 text-red-800 animate-pulse">
                                    <div className="flex items-center gap-1">
                                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                      LIVE
                                    </div>
                                  </Badge>
                                )}
                                {event.isFeatured && (
                                  <Badge className="bg-yellow-100 text-yellow-800">
                                    Featured
                                  </Badge>
                                )}
                              </div>

                              <p className="text-muted-foreground font-medium mb-2">
                                {event.subtitle}
                              </p>
                              <CardDescription className="mb-4 line-clamp-2">
                                {event.description}
                              </CardDescription>

                              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                                <Badge className={getFormatColor(event.format)}>
                                  <div className="flex items-center gap-1">
                                    {getFormatIcon(event.format)}
                                    {event.format}
                                  </div>
                                </Badge>
                                <Badge variant="outline">{event.type}</Badge>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>
                                    {event.startDate} - {event.endDate}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  <span>
                                    {event.attendees.toLocaleString()}/
                                    {event.maxAttendees.toLocaleString()}{" "}
                                    attendees
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span>{event.rating}</span>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {event.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Mic className="w-4 h-4" />
                                <span>{event.sessions} sessions</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{event.speakers} speakers</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{event.posters} posters</span>
                              </div>
                              <span className="font-medium">{event.price}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {event.isLive && (
                                <Button
                                  size="sm"
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  <Play className="w-4 h-4 mr-2" />
                                  Join Live
                                </Button>
                              )}
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/events/${event.id}`}>
                                  View Details
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline">Load More Events</Button>
            </div>
          </TabsContent>

          <TabsContent value="live" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  Live Events
                </CardTitle>
                <CardDescription>
                  Events currently happening now
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featuredEvents
                    .filter((event) => event.isLive)
                    .map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {event.attendees.toLocaleString()} attendees •{" "}
                              {event.format}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Join Now
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events starting soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.date} • {event.type} •{" "}
                          {event.attendees.toLocaleString()} registered
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Register
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-events" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Registered Events</CardTitle>
                  <CardDescription>Events you're attending</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      You haven't registered for any events yet.
                    </p>
                    <Button variant="outline">Browse Events</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>My Organized Events</CardTitle>
                  <CardDescription>Events you're hosting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      You haven't created any events yet.
                    </p>
                    <Button asChild>
                      <Link href="/events/create">Create Event</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

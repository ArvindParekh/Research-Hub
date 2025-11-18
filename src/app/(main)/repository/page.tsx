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
  Upload,
  Download,
  Eye,
  MessageSquare,
  Star,
  Calendar,
  GitBranch,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default function RepositoryPage() {
  const featuredPapers = [
    {
      id: "neural-arch-2024",
      title:
        "Advanced Neural Architecture Search with Quantum-Inspired Optimization",
      authors: ["Dr. Sarah Chen", "Alex Thompson", "Maria Garcia"],
      abstract:
        "We present a novel approach to neural architecture search that leverages quantum-inspired optimization techniques to discover more efficient neural network architectures...",
      category: "Machine Learning",
      submissionDate: "2024-01-10",
      version: "v2",
      downloads: 1247,
      views: 3891,
      reviews: 8,
      rating: 4.6,
      status: "under-review",
    },
    {
      id: "quantum-sim-2024",
      title: "Efficient Quantum Circuit Simulation on Classical Hardware",
      authors: ["Prof. Michael Rodriguez", "James Liu"],
      abstract:
        "This paper introduces new algorithms for simulating quantum circuits on classical computers, achieving significant speedups over existing methods...",
      category: "Quantum Computing",
      submissionDate: "2024-01-08",
      version: "v1",
      downloads: 892,
      views: 2156,
      reviews: 5,
      rating: 4.8,
      status: "published",
    },
    {
      id: "brain-imaging-2024",
      title: "Deep Learning Approaches for Advanced Brain Imaging Analysis",
      authors: ["Dr. Emily Johnson", "Lisa Wang", "Robert Kim"],
      abstract:
        "We develop novel deep learning methods for analyzing complex brain imaging data, with applications to neurodegenerative disease detection...",
      category: "Neuroscience",
      submissionDate: "2024-01-05",
      version: "v3",
      downloads: 2103,
      views: 5672,
      reviews: 12,
      rating: 4.4,
      status: "published",
    },
  ];

  const categories = [
    "Machine Learning",
    "Quantum Computing",
    "Neuroscience",
    "Computer Vision",
    "Natural Language Processing",
    "Robotics",
    "Bioinformatics",
    "Physics",
    "Mathematics",
    "Chemistry",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500";
      case "under-review":
        return "bg-yellow-500";
      case "draft":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case "under-review":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>
        );
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar page="repository" />
      {/* <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Academic Nexus</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/profiles" className="text-muted-foreground hover:text-foreground transition-colors">
                Researchers
              </Link>
              <Link href="/messages" className="text-muted-foreground hover:text-foreground transition-colors">
                Messages
              </Link>
              <Link href="/repository" className="text-primary font-medium">
                Repository
              </Link>
              <Link href="/jobs" className="text-muted-foreground hover:text-foreground transition-colors">
                Jobs
              </Link>
            </nav>
            <Button asChild>
              <Link href="/repository/submit">
                <Upload className="w-4 h-4 mr-2" />
                Submit Paper
              </Link>
            </Button>
          </div>
        </div>
      </header> */}

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Academic Nexus Repository</h1>
          <p className="text-muted-foreground">
            Open access preprint repository with community peer review and
            version control
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search papers by title, author, or keywords..."
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem
                  key={category}
                  value={category.toLowerCase().replace(" ", "-")}
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="highly-rated">Highest Rated</SelectItem>
              <SelectItem value="most-downloaded">Most Downloaded</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Papers</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recent">Recent Submissions</TabsTrigger>
            <TabsTrigger value="my-papers">My Papers</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Featured Papers */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Featured Papers</h2>
              <div className="grid gap-6">
                {featuredPapers.map((paper) => (
                  <Card
                    key={paper.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">
                              <Link
                                href={`/repository/${paper.id}`}
                                className="hover:text-primary transition-colors"
                              >
                                {paper.title}
                              </Link>
                            </CardTitle>
                            {getStatusBadge(paper.status)}
                            <Badge variant="outline">{paper.version}</Badge>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            {paper.authors.map((author, index) => (
                              <span
                                key={index}
                                className="text-sm text-muted-foreground"
                              >
                                {author}
                                {index < paper.authors.length - 1 && ", "}
                              </span>
                            ))}
                          </div>

                          <CardDescription className="mb-4 line-clamp-2">
                            {paper.abstract}
                          </CardDescription>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <Badge variant="secondary">{paper.category}</Badge>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{paper.submissionDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{paper.views.toLocaleString()} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="w-4 h-4" />
                              <span>
                                {paper.downloads.toLocaleString()} downloads
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              <span>{paper.reviews} reviews</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{paper.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                          <Button variant="outline" size="sm">
                            <GitBranch className="w-4 h-4 mr-2" />
                            View Versions
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/repository/${paper.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline">Load More Papers</Button>
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Trending This Week
                </CardTitle>
                <CardDescription>
                  Papers gaining the most attention in the research community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featuredPapers.slice(0, 2).map((paper, index) => (
                    <div
                      key={paper.id}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <div className="text-2xl font-bold text-primary">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{paper.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {paper.authors.join(", ")} • {paper.category}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>↗ {paper.views.toLocaleString()} views</span>
                          <span>
                            ↗ {paper.downloads.toLocaleString()} downloads
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
                <CardDescription>
                  Latest papers submitted to the repository
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featuredPapers.map((paper) => (
                    <div
                      key={paper.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{paper.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {paper.authors.join(", ")} • {paper.category}
                        </p>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(paper.status)}
                          <Badge variant="outline">{paper.version}</Badge>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {paper.submissionDate}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-papers" className="space-y-6">
            <div className="flex gap-2 flex-wrap">
              {["All", "Draft", "Under Review", "Published"].map((filter) => (
                <Button key={filter} variant="outline" size="sm">
                  {filter}
                </Button>
              ))}
            </div>

            <div className="grid gap-6">
              {[
                {
                  id: "my-paper-1",
                  title: "My Research on Advanced Algorithms",
                  status: "published",
                  version: "v1",
                  views: 234,
                  downloads: 89,
                  reviews: 5,
                  lastUpdated: "2024-01-15",
                },
                {
                  id: "my-paper-2",
                  title: "A Draft on Novel Approaches",
                  status: "draft",
                  version: "v1",
                  views: 0,
                  downloads: 0,
                  reviews: 0,
                  lastUpdated: "2024-01-10",
                },
              ].map((paper) => (
                <Card
                  key={paper.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle>
                            <Link
                              href={`/repository/${paper.id}`}
                              className="hover:text-primary"
                            >
                              {paper.title}
                            </Link>
                          </CardTitle>
                          <Badge
                            className={
                              paper.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {paper.status.charAt(0).toUpperCase() +
                              paper.status.slice(1)}
                          </Badge>
                          <Badge variant="outline">{paper.version}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <span>Last updated: {paper.lastUpdated}</span>
                      <div className="flex items-center gap-4">
                        <span>{paper.views} views</span>
                        <span>{paper.downloads} downloads</span>
                        <span>{paper.reviews} reviews</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/repository/${paper.id}/edit`}>
                            Edit
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Upload Version
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Empty state fallback */}
              {false && (
                <Card>
                  <CardHeader>
                    <CardTitle>No Papers Yet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      You haven't submitted any papers yet.
                    </p>
                    <Button asChild>
                      <Link href="/repository/submit">
                        Submit Your First Paper
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

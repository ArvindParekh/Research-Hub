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
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Building,
  GraduationCap,
  Briefcase,
  Bell,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default function JobsPage() {
  const featuredJobs = [
    {
      id: "mit-ml-prof-2024",
      title: "Assistant Professor in Machine Learning",
      institution: "Massachusetts Institute of Technology",
      department: "Computer Science and Artificial Intelligence Laboratory",
      location: "Cambridge, MA, USA",
      type: "Faculty",
      level: "Assistant Professor",
      salary: "$120,000 - $150,000",
      deadline: "2024-03-15",
      posted: "2024-01-10",
      description:
        "We are seeking an exceptional researcher to join our faculty in machine learning. The successful candidate will have a strong research record in deep learning, neural networks, or related areas.",
      requirements: [
        "PhD in Computer Science, Machine Learning, or related field",
        "Strong publication record in top-tier venues",
        "Experience in deep learning and neural networks",
        "Excellent teaching and mentoring skills",
      ],
      benefits: [
        "Health insurance",
        "Retirement plan",
        "Research funding",
        "Sabbatical leave",
      ],
      tags: ["Machine Learning", "Deep Learning", "Faculty", "Tenure Track"],
      applicants: 127,
      isUrgent: false,
      isFeatured: true,
    },
    {
      id: "stanford-quantum-postdoc-2024",
      title: "Postdoctoral Researcher in Quantum Computing",
      institution: "Stanford University",
      department: "Department of Physics",
      location: "Stanford, CA, USA",
      type: "Postdoc",
      level: "Postdoctoral",
      salary: "$65,000 - $75,000",
      deadline: "2024-02-28",
      posted: "2024-01-08",
      description:
        "Join our cutting-edge quantum computing research group. We are looking for a motivated postdoc to work on quantum algorithms and quantum information theory.",
      requirements: [
        "PhD in Physics, Computer Science, or related field",
        "Experience with quantum computing or quantum information",
        "Strong mathematical background",
        "Programming skills in Python or similar",
      ],
      benefits: [
        "Health insurance",
        "Professional development funds",
        "Conference travel support",
      ],
      tags: ["Quantum Computing", "Postdoc", "Physics", "Algorithms"],
      applicants: 89,
      isUrgent: true,
      isFeatured: true,
    },
    {
      id: "harvard-neuro-phd-2024",
      title: "PhD Position in Computational Neuroscience",
      institution: "Harvard University",
      department: "Department of Neurobiology",
      location: "Boston, MA, USA",
      type: "PhD",
      level: "Graduate Student",
      salary: "$35,000 stipend",
      deadline: "2024-04-01",
      posted: "2024-01-05",
      description:
        "We offer a PhD position in computational neuroscience focusing on brain imaging analysis and neural network modeling. Full funding provided.",
      requirements: [
        "Bachelor's or Master's degree in relevant field",
        "Strong background in mathematics and programming",
        "Interest in neuroscience and brain imaging",
        "GRE scores (recommended)",
      ],
      benefits: [
        "Full tuition coverage",
        "Health insurance",
        "Research stipend",
        "Conference funding",
      ],
      tags: ["Neuroscience", "PhD", "Brain Imaging", "Computational"],
      applicants: 234,
      isUrgent: false,
      isFeatured: false,
    },
    {
      id: "google-research-scientist-2024",
      title: "Research Scientist - AI/ML",
      institution: "Google Research",
      department: "AI Research Division",
      location: "Mountain View, CA, USA",
      type: "Industry",
      level: "Senior Researcher",
      salary: "$180,000 - $250,000",
      deadline: "2024-02-15",
      posted: "2024-01-12",
      description:
        "Join Google Research to work on cutting-edge AI/ML projects. We're looking for researchers with strong backgrounds in machine learning and AI.",
      requirements: [
        "PhD in Computer Science, Machine Learning, or related field",
        "5+ years of research experience",
        "Strong publication record",
        "Experience with large-scale ML systems",
      ],
      benefits: [
        "Competitive salary",
        "Stock options",
        "Health benefits",
        "Research freedom",
      ],
      tags: ["Industry", "AI", "Machine Learning", "Research"],
      applicants: 456,
      isUrgent: false,
      isFeatured: true,
    },
  ];

  const jobTypes = [
    "All Types",
    "Faculty",
    "Postdoc",
    "PhD",
    "Industry",
    "Research Staff",
  ];
  const locations = [
    "All Locations",
    "United States",
    "Europe",
    "Asia",
    "Remote",
  ];
  const fields = [
    "All Fields",
    "Computer Science",
    "Physics",
    "Biology",
    "Chemistry",
    "Mathematics",
    "Engineering",
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Faculty":
        return "bg-blue-100 text-blue-800";
      case "Postdoc":
        return "bg-green-100 text-green-800";
      case "PhD":
        return "bg-purple-100 text-purple-800";
      case "Industry":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Faculty":
        return <GraduationCap className="w-4 h-4" />;
      case "Postdoc":
        return <BookOpen className="w-4 h-4" />;
      case "PhD":
        return <GraduationCap className="w-4 h-4" />;
      case "Industry":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar page="jobs" />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Academic Job Board</h1>
          <p className="text-muted-foreground">
            Discover opportunities in academia and research. Apply with your
            Sociolect profile.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, institution, or keywords..."
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
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
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem
                  key={location}
                  value={location.toLowerCase().replace(" ", "-")}
                >
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="alerts">Job Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                All Jobs
              </Button>
              <Button variant="outline" size="sm">
                Faculty Positions
              </Button>
              <Button variant="outline" size="sm">
                Postdoc Opportunities
              </Button>
              <Button variant="outline" size="sm">
                PhD Positions
              </Button>
              <Button variant="outline" size="sm">
                Industry Research
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {featuredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">
                            <Link
                              href={`/jobs/${job.id}`}
                              className="hover:text-primary transition-colors"
                            >
                              {job.title}
                            </Link>
                          </CardTitle>
                          {job.isUrgent && (
                            <Badge className="bg-red-100 text-red-800">
                              Urgent
                            </Badge>
                          )}
                          {job.isFeatured && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              Featured
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">
                              {job.institution}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {job.location}
                            </span>
                          </div>
                        </div>

                        <CardDescription className="mb-4 line-clamp-2">
                          {job.description}
                        </CardDescription>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                          <Badge className={getTypeColor(job.type)}>
                            <div className="flex items-center gap-1">
                              {getTypeIcon(job.type)}
                              {job.type}
                            </div>
                          </Badge>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Deadline: {job.deadline}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>Posted {job.posted}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.tags.map((tag) => (
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
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{job.applicants} applicants</span>
                        <span>•</span>
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Bookmark className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/jobs/${job.id}/apply`}>
                            Apply with Profile
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline">Load More Jobs</Button>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Saved Jobs</CardTitle>
                <CardDescription>
                  Jobs you've bookmarked for later review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    You haven't saved any jobs yet.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/jobs">Browse Jobs</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>
                  Track the status of your job applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      job: "Assistant Professor in Machine Learning",
                      institution: "MIT",
                      status: "Under Review",
                      applied: "2024-01-15",
                      statusColor: "bg-yellow-100 text-yellow-800",
                    },
                    {
                      job: "Postdoc in Quantum Computing",
                      institution: "Stanford",
                      status: "Interview Scheduled",
                      applied: "2024-01-10",
                      statusColor: "bg-blue-100 text-blue-800",
                    },
                  ].map((application, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{application.job}</h4>
                        <p className="text-sm text-muted-foreground">
                          {application.institution} • Applied{" "}
                          {application.applied}
                        </p>
                      </div>
                      <Badge className={application.statusColor}>
                        {application.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Job Alerts</CardTitle>
                <CardDescription>
                  Get notified when jobs matching your criteria are posted
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Keywords
                      </label>
                      <Input placeholder="e.g., machine learning, quantum computing" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Job Type
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTypes.slice(1).map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Location
                      </label>
                      <Input placeholder="e.g., Boston, Remote, Europe" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Notification Frequency
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button>Create Job Alert</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
   BookOpen,
   Download,
   Eye,
   MessageSquare,
   Star,
   Calendar,
   GitBranch,
   Share,
   Bookmark,
   ThumbsUp,
   ThumbsDown,
   ExternalLink,
   FileText,
} from "lucide-react";
import Link from "next/link";

// This would normally come from a database
const getPaper = (id: string) => {
   const papers = {
      "neural-arch-2024": {
         id: "neural-arch-2024",
         title: "Advanced Neural Architecture Search with Quantum-Inspired Optimization",
         authors: [
            { name: "Dr. Sarah Chen", affiliation: "MIT", id: "sarah-chen" },
            { name: "Alex Thompson", affiliation: "MIT", id: "alex-thompson" },
            { name: "Maria Garcia", affiliation: "MIT", id: "maria-garcia" },
         ],
         abstract:
            "We present a novel approach to neural architecture search that leverages quantum-inspired optimization techniques to discover more efficient neural network architectures. Our method combines the principles of quantum annealing with evolutionary algorithms to explore the vast space of possible architectures more effectively than traditional approaches. Through extensive experiments on benchmark datasets, we demonstrate that our quantum-inspired NAS method can discover architectures that achieve state-of-the-art performance while requiring significantly fewer computational resources during the search process. The discovered architectures show improved accuracy on image classification tasks and better generalization capabilities across different domains.",
         category: "Machine Learning",
         submissionDate: "2024-01-10",
         lastUpdated: "2024-01-15",
         version: "v2",
         versions: [
            {
               version: "v1",
               date: "2024-01-10",
               changes: "Initial submission",
            },
            {
               version: "v2",
               date: "2024-01-15",
               changes:
                  "Added experimental results and improved methodology section",
            },
         ],
         downloads: 1247,
         views: 3891,
         citations: 23,
         reviews: 8,
         rating: 4.6,
         status: "under-review",
         keywords: [
            "Neural Architecture Search",
            "Quantum Computing",
            "Optimization",
            "Deep Learning",
         ],
         pdfUrl: "/papers/neural-arch-2024-v2.pdf",
      },
   };
   return papers[id as keyof typeof papers];
};

export default function PaperPage({ params }: { params: { id: string } }) {
   const paper = getPaper(params.id);

   if (!paper) {
      return <div>Paper not found</div>;
   }

   const reviews = [
      {
         id: 1,
         reviewer: "Anonymous Reviewer 1",
         rating: 5,
         date: "2024-01-12",
         summary: "Excellent work with novel approach",
         content:
            "This paper presents a compelling approach to neural architecture search. The quantum-inspired optimization is well-motivated and the experimental results are convincing. The writing is clear and the methodology is sound.",
         helpful: 12,
         notHelpful: 1,
      },
      {
         id: 2,
         reviewer: "Dr. Michael Rodriguez",
         rating: 4,
         date: "2024-01-14",
         summary: "Strong contribution with minor concerns",
         content:
            "The quantum-inspired approach is interesting and shows promise. However, I would like to see more analysis of the computational overhead compared to traditional methods. The results are impressive but could benefit from more statistical analysis.",
         helpful: 8,
         notHelpful: 2,
      },
      {
         id: 3,
         reviewer: "Prof. Lisa Wang",
         rating: 5,
         date: "2024-01-16",
         summary: "Innovative and well-executed research",
         content:
            "This is exactly the kind of interdisciplinary work we need more of. The combination of quantum computing principles with neural architecture search is novel and the execution is excellent. The paper is well-written and the experiments are comprehensive.",
         helpful: 15,
         notHelpful: 0,
      },
   ];

   return (
      <div className='min-h-screen bg-background'>
         {/* Header */}
         <header className='border-b bg-card'>
            <div className='container mx-auto px-4 py-4'>
               <div className='flex items-center justify-between'>
                  <Link href='/' className='flex items-center gap-2'>
                     <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                        <BookOpen className='w-5 h-5 text-primary-foreground' />
                     </div>
                     <h1 className='text-xl font-bold text-foreground'>
                        Research Hub
                     </h1>
                  </Link>
                  <nav className='hidden md:flex items-center gap-6'>
                     <Link
                        href='/repository'
                        className='text-primary font-medium'
                     >
                        Repository
                     </Link>
                  </nav>
               </div>
            </div>
         </header>

         <div className='container mx-auto px-4 py-8'>
            {/* Paper Header */}
            <div className='mb-8'>
               <div className='flex items-start justify-between mb-4'>
                  <div className='flex-1'>
                     <h1 className='text-3xl font-bold mb-4'>{paper.title}</h1>

                     {/* Authors */}
                     <div className='flex flex-wrap items-center gap-4 mb-4'>
                        {paper.authors.map((author, index) => (
                           <div key={index} className='flex items-center gap-2'>
                              <Avatar className='w-8 h-8'>
                                 <AvatarImage
                                    src={`/placeholder.svg?height=32&width=32&query=professional academic portrait`}
                                 />
                                 <AvatarFallback className='text-xs'>
                                    {author.name
                                       .split(" ")
                                       .map((n) => n[0])
                                       .join("")}
                                 </AvatarFallback>
                              </Avatar>
                              <div>
                                 <Link
                                    href={`/profile/${author.id}`}
                                    className='font-medium hover:text-primary'
                                 >
                                    {author.name}
                                 </Link>
                                 <p className='text-sm text-muted-foreground'>
                                    {author.affiliation}
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>

                     {/* Metadata */}
                     <div className='flex flex-wrap items-center gap-4 mb-4'>
                        <Badge className='bg-green-100 text-green-800'>
                           Under Review
                        </Badge>
                        <Badge variant='outline'>{paper.version}</Badge>
                        <Badge variant='secondary'>{paper.category}</Badge>
                        <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                           <Calendar className='w-4 h-4' />
                           <span>Submitted {paper.submissionDate}</span>
                        </div>
                        <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                           <Calendar className='w-4 h-4' />
                           <span>Updated {paper.lastUpdated}</span>
                        </div>
                     </div>
                  </div>

                  <div className='flex flex-col gap-2'>
                     <Button>
                        <Download className='w-4 h-4 mr-2' />
                        Download PDF
                     </Button>
                     <Button variant='outline'>
                        <Share className='w-4 h-4 mr-2' />
                        Share
                     </Button>
                     <Button variant='outline'>
                        <Bookmark className='w-4 h-4 mr-2' />
                        Save
                     </Button>
                  </div>
               </div>

               {/* Stats */}
               <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mb-6'>
                  <Card>
                     <CardContent className='p-4 text-center'>
                        <div className='text-2xl font-bold text-primary'>
                           {paper.views.toLocaleString()}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                           Views
                        </div>
                     </CardContent>
                  </Card>
                  <Card>
                     <CardContent className='p-4 text-center'>
                        <div className='text-2xl font-bold text-primary'>
                           {paper.downloads.toLocaleString()}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                           Downloads
                        </div>
                     </CardContent>
                  </Card>
                  <Card>
                     <CardContent className='p-4 text-center'>
                        <div className='text-2xl font-bold text-primary'>
                           {paper.citations}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                           Citations
                        </div>
                     </CardContent>
                  </Card>
                  <Card>
                     <CardContent className='p-4 text-center'>
                        <div className='text-2xl font-bold text-primary'>
                           {paper.reviews}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                           Reviews
                        </div>
                     </CardContent>
                  </Card>
                  <Card>
                     <CardContent className='p-4 text-center'>
                        <div className='text-2xl font-bold text-primary flex items-center justify-center gap-1'>
                           <Star className='w-5 h-5 fill-yellow-400 text-yellow-400' />
                           {paper.rating}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                           Rating
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>

            {/* Main Content */}
            <Tabs defaultValue='abstract' className='space-y-6'>
               <TabsList className='grid w-full grid-cols-5'>
                  <TabsTrigger value='abstract'>Abstract</TabsTrigger>
                  <TabsTrigger value='reviews'>
                     Reviews ({paper.reviews})
                  </TabsTrigger>
                  <TabsTrigger value='versions'>Versions</TabsTrigger>
                  <TabsTrigger value='citations'>Citations</TabsTrigger>
                  <TabsTrigger value='discussion'>Discussion</TabsTrigger>
               </TabsList>

               <TabsContent value='abstract' className='space-y-6'>
                  <Card>
                     <CardHeader>
                        <CardTitle>Abstract</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <p className='text-muted-foreground leading-relaxed mb-6'>
                           {paper.abstract}
                        </p>

                        <div className='mb-6'>
                           <h4 className='font-semibold mb-3'>Keywords</h4>
                           <div className='flex flex-wrap gap-2'>
                              {paper.keywords.map((keyword) => (
                                 <Badge key={keyword} variant='outline'>
                                    {keyword}
                                 </Badge>
                              ))}
                           </div>
                        </div>

                        <div className='flex items-center gap-4'>
                           <Button>
                              <Download className='w-4 h-4 mr-2' />
                              Download Full Paper
                           </Button>
                           <Button variant='outline'>
                              <ExternalLink className='w-4 h-4 mr-2' />
                              View in PDF Viewer
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>

               <TabsContent value='reviews' className='space-y-6'>
                  {/* Review Summary */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Review Summary</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='grid md:grid-cols-2 gap-6'>
                           <div>
                              <div className='flex items-center gap-2 mb-4'>
                                 <Star className='w-6 h-6 fill-yellow-400 text-yellow-400' />
                                 <span className='text-2xl font-bold'>
                                    {paper.rating}
                                 </span>
                                 <span className='text-muted-foreground'>
                                    out of 5
                                 </span>
                              </div>
                              <div className='space-y-2'>
                                 {[5, 4, 3, 2, 1].map((stars) => (
                                    <div
                                       key={stars}
                                       className='flex items-center gap-2'
                                    >
                                       <span className='text-sm w-8'>
                                          {stars}★
                                       </span>
                                       <Progress
                                          value={
                                             stars === 5
                                                ? 60
                                                : stars === 4
                                                ? 40
                                                : 0
                                          }
                                          className='flex-1'
                                       />
                                       <span className='text-sm text-muted-foreground w-8'>
                                          {stars === 5
                                             ? "5"
                                             : stars === 4
                                             ? "3"
                                             : "0"}
                                       </span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                           <div>
                              <h4 className='font-semibold mb-3'>
                                 Review Status
                              </h4>
                              <div className='space-y-2 text-sm'>
                                 <div className='flex justify-between'>
                                    <span>Total Reviews:</span>
                                    <span className='font-medium'>
                                       {paper.reviews}
                                    </span>
                                 </div>
                                 <div className='flex justify-between'>
                                    <span>Peer Reviews:</span>
                                    <span className='font-medium'>6</span>
                                 </div>
                                 <div className='flex justify-between'>
                                    <span>Community Reviews:</span>
                                    <span className='font-medium'>2</span>
                                 </div>
                                 <div className='flex justify-between'>
                                    <span>Average Review Time:</span>
                                    <span className='font-medium'>
                                       3.2 days
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Individual Reviews */}
                  <div className='space-y-4'>
                     {reviews.map((review) => (
                        <Card key={review.id}>
                           <CardHeader>
                              <div className='flex items-start justify-between'>
                                 <div>
                                    <div className='flex items-center gap-2 mb-1'>
                                       <CardTitle className='text-lg'>
                                          {review.reviewer}
                                       </CardTitle>
                                       <div className='flex items-center'>
                                          {[...Array(5)].map((_, i) => (
                                             <Star
                                                key={i}
                                                className={`w-4 h-4 ${
                                                   i < review.rating
                                                      ? "fill-yellow-400 text-yellow-400"
                                                      : "text-gray-300"
                                                }`}
                                             />
                                          ))}
                                       </div>
                                    </div>
                                    <CardDescription>
                                       {review.summary}
                                    </CardDescription>
                                    <p className='text-sm text-muted-foreground mt-1'>
                                       {review.date}
                                    </p>
                                 </div>
                              </div>
                           </CardHeader>
                           <CardContent>
                              <p className='text-muted-foreground mb-4'>
                                 {review.content}
                              </p>
                              <div className='flex items-center justify-between'>
                                 <div className='flex items-center gap-4'>
                                    <Button variant='ghost' size='sm'>
                                       <ThumbsUp className='w-4 h-4 mr-1' />
                                       Helpful ({review.helpful})
                                    </Button>
                                    <Button variant='ghost' size='sm'>
                                       <ThumbsDown className='w-4 h-4 mr-1' />
                                       Not Helpful ({review.notHelpful})
                                    </Button>
                                 </div>
                                 <Button variant='ghost' size='sm'>
                                    Reply
                                 </Button>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>

                  {/* Add Review */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Write a Review</CardTitle>
                        <CardDescription>
                           Share your thoughts and help improve this research
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-4'>
                           <div>
                              <label className='text-sm font-medium mb-2 block'>
                                 Rating
                              </label>
                              <div className='flex items-center gap-1'>
                                 {[...Array(5)].map((_, i) => (
                                    <Star
                                       key={i}
                                       className='w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer'
                                    />
                                 ))}
                              </div>
                           </div>
                           <div>
                              <label className='text-sm font-medium mb-2 block'>
                                 Review Summary
                              </label>
                              <input
                                 placeholder='Brief summary of your review...'
                                 className='w-full p-2 border rounded-lg bg-background'
                              />
                           </div>
                           <div>
                              <label className='text-sm font-medium mb-2 block'>
                                 Detailed Review
                              </label>
                              <Textarea placeholder='Provide detailed feedback on the methodology, results, and overall contribution...' />
                           </div>
                           <Button>Submit Review</Button>
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>

               <TabsContent value='versions' className='space-y-4'>
                  <Card>
                     <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                           <GitBranch className='w-5 h-5' />
                           Version History
                        </CardTitle>
                        <CardDescription>
                           Track changes and improvements across paper versions
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-4'>
                           {paper.versions.map((version, index) => (
                              <div
                                 key={version.version}
                                 className='flex items-center justify-between p-4 border rounded-lg'
                              >
                                 <div className='flex items-center gap-4'>
                                    <Badge
                                       variant={
                                          index === 0 ? "default" : "outline"
                                       }
                                    >
                                       {version.version}
                                    </Badge>
                                    <div>
                                       <p className='font-medium'>
                                          {version.changes}
                                       </p>
                                       <p className='text-sm text-muted-foreground'>
                                          {version.date}
                                       </p>
                                    </div>
                                 </div>
                                 <div className='flex items-center gap-2'>
                                    <Button variant='outline' size='sm'>
                                       <Download className='w-4 h-4 mr-2' />
                                       Download
                                    </Button>
                                    <Button variant='ghost' size='sm'>
                                       <Eye className='w-4 h-4 mr-2' />
                                       View
                                    </Button>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>

               <TabsContent value='citations' className='space-y-4'>
                  <Card>
                     <CardHeader>
                        <CardTitle>Citations ({paper.citations})</CardTitle>
                        <CardDescription>
                           Papers that have cited this work
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className='text-center py-8'>
                           <FileText className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                           <p className='text-muted-foreground'>
                              Citation tracking will be available once the paper
                              is published.
                           </p>
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>

               <TabsContent value='discussion' className='space-y-4'>
                  <Card>
                     <CardHeader>
                        <CardTitle>Community Discussion</CardTitle>
                        <CardDescription>
                           Join the conversation about this research
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className='text-center py-8'>
                           <MessageSquare className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                           <p className='text-muted-foreground mb-4'>
                              Start a discussion about this paper.
                           </p>
                           <Button>Start Discussion</Button>
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
}

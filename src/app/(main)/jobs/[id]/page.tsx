import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
   MapPin,
   Calendar,
   DollarSign,
   Clock,
   Building,
   Users,
   Share,
   Bookmark,
   ExternalLink,
   CheckCircle,
   AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

// This would normally come from a database
const getJob = (id: string) => {
   const jobs = {
      "mit-ml-prof-2024": {
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
            "We are seeking an exceptional researcher to join our faculty in machine learning. The successful candidate will have a strong research record in deep learning, neural networks, or related areas. This is a tenure-track position with excellent opportunities for collaboration and research funding.",
         fullDescription: `
        The Computer Science and Artificial Intelligence Laboratory (CSAIL) at MIT is seeking applications for a tenure-track Assistant Professor position in Machine Learning. We are particularly interested in candidates working in deep learning, neural networks, computer vision, natural language processing, or related areas.

        The successful candidate will be expected to:
        - Conduct cutting-edge research in machine learning
        - Teach undergraduate and graduate courses
        - Supervise PhD students and postdocs
        - Collaborate with faculty across MIT
        - Secure external research funding

        MIT offers a world-class research environment with access to state-of-the-art facilities, excellent students, and opportunities for interdisciplinary collaboration.
      `,
         requirements: [
            "PhD in Computer Science, Machine Learning, or related field",
            "Strong publication record in top-tier venues (NeurIPS, ICML, ICLR, etc.)",
            "Experience in deep learning and neural networks",
            "Excellent teaching and mentoring skills",
            "Demonstrated ability to conduct independent research",
            "Strong communication and collaboration skills",
         ],
         preferred: [
            "Postdoctoral research experience",
            "Industry research experience",
            "Experience with large-scale machine learning systems",
            "Interdisciplinary research background",
         ],
         benefits: [
            "Competitive salary and startup package",
            "Comprehensive health insurance",
            "Retirement plan with university matching",
            "Research funding opportunities",
            "Sabbatical leave eligibility",
            "Access to world-class facilities",
            "Collaborative research environment",
         ],
         applicationProcess: [
            "Submit application through Research Hub",
            "Provide CV, research statement, and teaching statement",
            "Include 3-5 representative publications",
            "Arrange for 3 letters of recommendation",
            "Applications reviewed on rolling basis",
         ],
         tags: [
            "Machine Learning",
            "Deep Learning",
            "Faculty",
            "Tenure Track",
            "MIT",
         ],
         applicants: 127,
         isUrgent: false,
         isFeatured: true,
         contactEmail: "search-committee@csail.mit.edu",
         website: "https://www.csail.mit.edu/careers",
      },
   };
   return jobs[id as keyof typeof jobs];
};

export default async function JobDetailsPage({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   const job = getJob(id);

   if (!job) {
      return <div>Job not found</div>;
   }

   return (
      <div className='min-h-screen bg-background'>
         {/* Header */}
         <Navbar page='jobs' />

         <div className='container mx-auto px-4 py-8'>
            {/* Job Header */}
            <div className='mb-8'>
               <div className='flex items-start justify-between mb-6'>
                  <div className='flex-1'>
                     <h1 className='text-3xl font-bold mb-4'>{job.title}</h1>

                     <div className='flex items-center gap-4 mb-4'>
                        <div className='flex items-center gap-2'>
                           <Building className='w-5 h-5 text-muted-foreground' />
                           <span className='text-lg font-medium'>
                              {job.institution}
                           </span>
                        </div>
                        <div className='flex items-center gap-2'>
                           <MapPin className='w-5 h-5 text-muted-foreground' />
                           <span className='text-muted-foreground'>
                              {job.location}
                           </span>
                        </div>
                     </div>

                     <p className='text-muted-foreground mb-4'>
                        {job.department}
                     </p>

                     <div className='flex flex-wrap items-center gap-4 mb-6'>
                        <Badge className='bg-blue-100 text-blue-800'>
                           {job.type}
                        </Badge>
                        <Badge variant='outline'>{job.level}</Badge>
                        <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                           <DollarSign className='w-4 h-4' />
                           <span>{job.salary}</span>
                        </div>
                        <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                           <Calendar className='w-4 h-4' />
                           <span>Deadline: {job.deadline}</span>
                        </div>
                        <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                           <Clock className='w-4 h-4' />
                           <span>Posted {job.posted}</span>
                        </div>
                     </div>
                  </div>

                  <div className='flex flex-col gap-2'>
                     <Button size='lg' asChild>
                        <Link href={`/jobs/${job.id}/apply`}>
                           Apply with Profile
                        </Link>
                     </Button>
                     <div className='flex gap-2'>
                        <Button variant='outline' size='sm'>
                           <Bookmark className='w-4 h-4 mr-2' />
                           Save Job
                        </Button>
                        <Button variant='outline' size='sm'>
                           <Share className='w-4 h-4 mr-2' />
                           Share
                        </Button>
                     </div>
                  </div>
               </div>

               {/* Quick Stats */}
               <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
                  <Card>
                     <CardContent className='p-4 text-center'>
                        <div className='text-2xl font-bold text-primary'>
                           {job.applicants}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                           Applicants
                        </div>
                     </CardContent>
                  </Card>
                  <Card>
                     <CardContent className='p-4 text-center'>
                        <div className='text-2xl font-bold text-primary'>
                           12
                        </div>
                        <div className='text-sm text-muted-foreground'>
                           Days Left
                        </div>
                     </CardContent>
                  </Card>
                  <Card>
                     <CardContent className='p-4 text-center'>
                        <div className='text-2xl font-bold text-primary'>
                           4.8
                        </div>
                        <div className='text-sm text-muted-foreground'>
                           Institution Rating
                        </div>
                     </CardContent>
                  </Card>
                  <Card>
                     <CardContent className='p-4 text-center'>
                        <div className='text-2xl font-bold text-primary'>
                           85%
                        </div>
                        <div className='text-sm text-muted-foreground'>
                           Response Rate
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>

            <div className='grid lg:grid-cols-3 gap-8'>
               {/* Main Content */}
               <div className='lg:col-span-2 space-y-6'>
                  {/* Job Description */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Job Description</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                           {job.description}
                        </p>
                        <div className='prose prose-sm max-w-none'>
                           <div className='whitespace-pre-line text-muted-foreground'>
                              {job.fullDescription}
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Requirements */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Requirements</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-4'>
                           <div>
                              <h4 className='font-semibold mb-3 flex items-center gap-2'>
                                 <CheckCircle className='w-5 h-5 text-green-500' />
                                 Required Qualifications
                              </h4>
                              <ul className='space-y-2'>
                                 {job.requirements.map((req, index) => (
                                    <li
                                       key={index}
                                       className='flex items-start gap-2'
                                    >
                                       <div className='w-2 h-2 bg-primary rounded-full mt-2 shrink-0'></div>
                                       <span className='text-muted-foreground'>
                                          {req}
                                       </span>
                                    </li>
                                 ))}
                              </ul>
                           </div>

                           <Separator />

                           <div>
                              <h4 className='font-semibold mb-3 flex items-center gap-2'>
                                 <AlertCircle className='w-5 h-5 text-blue-500' />
                                 Preferred Qualifications
                              </h4>
                              <ul className='space-y-2'>
                                 {job.preferred.map((pref, index) => (
                                    <li
                                       key={index}
                                       className='flex items-start gap-2'
                                    >
                                       <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0'></div>
                                       <span className='text-muted-foreground'>
                                          {pref}
                                       </span>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Benefits */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Benefits & Perks</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='grid md:grid-cols-2 gap-4'>
                           {job.benefits.map((benefit, index) => (
                              <div
                                 key={index}
                                 className='flex items-center gap-2'
                              >
                                 <CheckCircle className='w-4 h-4 text-green-500 shrink-0' />
                                 <span className='text-muted-foreground'>
                                    {benefit}
                                 </span>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>

                  {/* Application Process */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Application Process</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <ol className='space-y-3'>
                           {job.applicationProcess.map((step, index) => (
                              <li
                                 key={index}
                                 className='flex items-start gap-3'
                              >
                                 <div className='w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium shrink-0'>
                                    {index + 1}
                                 </div>
                                 <span className='text-muted-foreground'>
                                    {step}
                                 </span>
                              </li>
                           ))}
                        </ol>
                     </CardContent>
                  </Card>
               </div>

               {/* Sidebar */}
               <div className='space-y-6'>
                  {/* Apply Card */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Ready to Apply?</CardTitle>
                        <CardDescription>
                           Use your Research Hub profile to apply instantly
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <Button className='w-full mb-4' asChild>
                           <Link href={`/jobs/${job.id}/apply`}>
                              Apply with Profile
                           </Link>
                        </Button>
                        <div className='text-sm text-muted-foreground space-y-2'>
                           <p>✓ Auto-fill with your profile data</p>
                           <p>✓ Include your publications automatically</p>
                           <p>✓ Track application status</p>
                           <p>✓ Get notified of updates</p>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Institution Info */}
                  <Card>
                     <CardHeader>
                        <CardTitle>About {job.institution}</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-4'>
                           <div className='flex items-center gap-2'>
                              <Users className='w-4 h-4 text-muted-foreground' />
                              <span className='text-sm'>11,000+ students</span>
                           </div>
                           <div className='flex items-center gap-2'>
                              <Building className='w-4 h-4 text-muted-foreground' />
                              <span className='text-sm'>Founded 1861</span>
                           </div>
                           <div className='flex items-center gap-2'>
                              <MapPin className='w-4 h-4 text-muted-foreground' />
                              <span className='text-sm'>
                                 Cambridge, Massachusetts
                              </span>
                           </div>
                           <Button
                              variant='outline'
                              size='sm'
                              className='w-full bg-transparent'
                           >
                              <ExternalLink className='w-4 h-4 mr-2' />
                              Visit Website
                           </Button>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Tags */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Tags</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='flex flex-wrap gap-2'>
                           {job.tags.map((tag) => (
                              <Badge
                                 key={tag}
                                 variant='outline'
                                 className='text-xs'
                              >
                                 {tag}
                              </Badge>
                           ))}
                        </div>
                     </CardContent>
                  </Card>

                  {/* Contact */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-2 text-sm'>
                           <p>
                              <strong>Email:</strong> {job.contactEmail}
                           </p>
                           <p>
                              <strong>Website:</strong>{" "}
                              <Link
                                 href={job.website}
                                 className='text-primary hover:underline'
                              >
                                 {job.website}
                              </Link>
                           </p>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Similar Jobs */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Similar Jobs</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-3'>
                           {[
                              {
                                 title: "Postdoc in ML",
                                 institution: "Stanford",
                                 type: "Postdoc",
                              },
                              {
                                 title: "Research Scientist",
                                 institution: "Google",
                                 type: "Industry",
                              },
                           ].map((similarJob, index) => (
                              <div
                                 key={index}
                                 className='p-3 border rounded-lg'
                              >
                                 <h4 className='font-medium text-sm'>
                                    {similarJob.title}
                                 </h4>
                                 <p className='text-xs text-muted-foreground'>
                                    {similarJob.institution}
                                 </p>
                                 <Badge
                                    variant='outline'
                                    className='text-xs mt-1'
                                 >
                                    {similarJob.type}
                                 </Badge>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </div>
   );
}

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
   BookOpen,
   Upload,
   FileText,
   CheckCircle,
   User,
   Mail,
   Phone,
   MapPin,
   ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function JobApplicationPage({
   params,
}: {
   params: { id: string };
}) {
   // This would normally fetch job and user data
   const job = {
      title: "Assistant Professor in Machine Learning",
      institution: "Massachusetts Institute of Technology",
      department: "Computer Science and Artificial Intelligence Laboratory",
      deadline: "2024-03-15",
   };

   const userProfile = {
      name: "Dr. Alex Johnson",
      email: "alex.johnson@university.edu",
      phone: "+1 (555) 123-4567",
      location: "Boston, MA, USA",
      currentPosition: "Postdoctoral Researcher",
      institution: "Harvard University",
      hIndex: 15,
      publications: 23,
      recentPapers: [
         "Deep Learning for Computer Vision Applications",
         "Neural Architecture Search with Reinforcement Learning",
         "Efficient Training of Large-Scale Neural Networks",
      ],
   };

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
                        href='/jobs'
                        className='text-muted-foreground hover:text-foreground transition-colors'
                     >
                        Jobs
                     </Link>
                  </nav>
               </div>
            </div>
         </header>

         <div className='container mx-auto px-4 py-8'>
            {/* Page Header */}
            <div className='mb-8'>
               <h1 className='text-3xl font-bold mb-2'>Apply for Position</h1>
               <div className='flex items-center gap-2 text-muted-foreground'>
                  <span>{job.title}</span>
                  <span>•</span>
                  <span>{job.institution}</span>
                  <span>•</span>
                  <span>Deadline: {job.deadline}</span>
               </div>
            </div>

            <div className='grid lg:grid-cols-3 gap-8'>
               {/* Application Form */}
               <div className='lg:col-span-2 space-y-6'>
                  {/* Profile Preview */}
                  <Card>
                     <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                           <CheckCircle className='w-5 h-5 text-green-500' />
                           Profile Information
                        </CardTitle>
                        <CardDescription>
                           Your Research Hub profile will be automatically
                           included with your application
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className='flex items-start gap-4 mb-6'>
                           <Avatar className='w-16 h-16'>
                              <AvatarImage src='/academic-portrait.png' />
                              <AvatarFallback>AJ</AvatarFallback>
                           </Avatar>
                           <div className='flex-1'>
                              <h3 className='font-semibold text-lg'>
                                 {userProfile.name}
                              </h3>
                              <p className='text-muted-foreground'>
                                 {userProfile.currentPosition}
                              </p>
                              <p className='text-muted-foreground'>
                                 {userProfile.institution}
                              </p>
                              <div className='flex items-center gap-4 mt-2 text-sm text-muted-foreground'>
                                 <span>H-Index: {userProfile.hIndex}</span>
                                 <span>
                                    Publications: {userProfile.publications}
                                 </span>
                              </div>
                           </div>
                           <Button variant='outline' size='sm'>
                              <ExternalLink className='w-4 h-4 mr-2' />
                              View Full Profile
                           </Button>
                        </div>

                        <div className='grid md:grid-cols-2 gap-4 text-sm'>
                           <div className='flex items-center gap-2'>
                              <Mail className='w-4 h-4 text-muted-foreground' />
                              <span>{userProfile.email}</span>
                           </div>
                           <div className='flex items-center gap-2'>
                              <Phone className='w-4 h-4 text-muted-foreground' />
                              <span>{userProfile.phone}</span>
                           </div>
                           <div className='flex items-center gap-2'>
                              <MapPin className='w-4 h-4 text-muted-foreground' />
                              <span>{userProfile.location}</span>
                           </div>
                           <div className='flex items-center gap-2'>
                              <User className='w-4 h-4 text-muted-foreground' />
                              <span>{userProfile.currentPosition}</span>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Cover Letter */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Cover Letter</CardTitle>
                        <CardDescription>
                           Explain why you're interested in this position
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <Textarea
                           placeholder='Dear Hiring Committee,

I am writing to express my strong interest in the Assistant Professor position in Machine Learning at MIT. With my background in deep learning and neural networks, I believe I would be an excellent fit for your department...'
                           className='min-h-[200px]'
                        />
                     </CardContent>
                  </Card>

                  {/* Research Statement */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Research Statement</CardTitle>
                        <CardDescription>
                           Describe your research interests and future plans
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-4'>
                           <div>
                              <label className='text-sm font-medium mb-2 block'>
                                 Upload Research Statement
                              </label>
                              <div className='border-2 border-dashed border-muted rounded-lg p-6 text-center'>
                                 <Upload className='w-8 h-8 text-muted-foreground mx-auto mb-2' />
                                 <p className='text-sm text-muted-foreground mb-2'>
                                    Drag and drop your research statement or
                                    click to browse
                                 </p>
                                 <Button variant='outline' size='sm'>
                                    Choose File
                                 </Button>
                              </div>
                           </div>
                           <div>
                              <label className='text-sm font-medium mb-2 block'>
                                 Or write directly
                              </label>
                              <Textarea
                                 placeholder='My research focuses on developing novel machine learning algorithms...'
                                 className='min-h-[150px]'
                              />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Teaching Statement */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Teaching Statement</CardTitle>
                        <CardDescription>
                           Describe your teaching philosophy and experience
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <Textarea
                           placeholder='My teaching philosophy centers on creating an inclusive and engaging learning environment...'
                           className='min-h-[150px]'
                        />
                     </CardContent>
                  </Card>

                  {/* Additional Documents */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Additional Documents</CardTitle>
                        <CardDescription>
                           Upload any additional required documents
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-4'>
                           <div className='grid md:grid-cols-2 gap-4'>
                              <div>
                                 <label className='text-sm font-medium mb-2 block'>
                                    CV/Resume
                                 </label>
                                 <div className='border border-muted rounded-lg p-4 text-center'>
                                    <FileText className='w-6 h-6 text-muted-foreground mx-auto mb-2' />
                                    <p className='text-sm text-muted-foreground'>
                                       Auto-generated from profile
                                    </p>
                                    <Button
                                       variant='outline'
                                       size='sm'
                                       className='mt-2 bg-transparent'
                                    >
                                       Download CV
                                    </Button>
                                 </div>
                              </div>
                              <div>
                                 <label className='text-sm font-medium mb-2 block'>
                                    Diversity Statement
                                 </label>
                                 <div className='border-2 border-dashed border-muted rounded-lg p-4 text-center'>
                                    <Upload className='w-6 h-6 text-muted-foreground mx-auto mb-2' />
                                    <Button variant='outline' size='sm'>
                                       Upload File
                                    </Button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* References */}
                  <Card>
                     <CardHeader>
                        <CardTitle>References</CardTitle>
                        <CardDescription>
                           Provide contact information for your references
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-4'>
                           {[1, 2, 3].map((ref) => (
                              <div
                                 key={ref}
                                 className='grid md:grid-cols-3 gap-4 p-4 border rounded-lg'
                              >
                                 <div>
                                    <label className='text-sm font-medium mb-1 block'>
                                       Name
                                    </label>
                                    <Input placeholder='Dr. Jane Smith' />
                                 </div>
                                 <div>
                                    <label className='text-sm font-medium mb-1 block'>
                                       Email
                                    </label>
                                    <Input placeholder='jane.smith@university.edu' />
                                 </div>
                                 <div>
                                    <label className='text-sm font-medium mb-1 block'>
                                       Institution
                                    </label>
                                    <Input placeholder='Harvard University' />
                                 </div>
                              </div>
                           ))}
                           <Button variant='outline' size='sm'>
                              Add Another Reference
                           </Button>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Submit Application */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Submit Application</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-4'>
                           <div className='flex items-center space-x-2'>
                              <Checkbox id='terms' />
                              <label htmlFor='terms' className='text-sm'>
                                 I agree to the terms and conditions and confirm
                                 that all information provided is accurate
                              </label>
                           </div>
                           <div className='flex items-center space-x-2'>
                              <Checkbox id='updates' />
                              <label htmlFor='updates' className='text-sm'>
                                 I would like to receive updates about my
                                 application status
                              </label>
                           </div>
                           <Button size='lg' className='w-full'>
                              Submit Application
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               </div>

               {/* Sidebar */}
               <div className='space-y-6'>
                  {/* Application Summary */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Application Summary</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-3 text-sm'>
                           <div className='flex justify-between'>
                              <span>Position:</span>
                              <span className='font-medium'>{job.title}</span>
                           </div>
                           <div className='flex justify-between'>
                              <span>Institution:</span>
                              <span className='font-medium'>
                                 {job.institution}
                              </span>
                           </div>
                           <div className='flex justify-between'>
                              <span>Department:</span>
                              <span className='font-medium'>
                                 {job.department}
                              </span>
                           </div>
                           <div className='flex justify-between'>
                              <span>Deadline:</span>
                              <span className='font-medium text-red-600'>
                                 {job.deadline}
                              </span>
                           </div>
                           <Separator />
                           <div className='flex justify-between'>
                              <span>Application Method:</span>
                              <span className='font-medium'>
                                 Research Hub Profile
                              </span>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Recent Publications */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Recent Publications</CardTitle>
                        <CardDescription>
                           These will be automatically included
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-3'>
                           {userProfile.recentPapers.map((paper, index) => (
                              <div key={index} className='text-sm'>
                                 <p className='font-medium line-clamp-2'>
                                    {paper}
                                 </p>
                                 <p className='text-muted-foreground'>2024</p>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>

                  {/* Application Tips */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Application Tips</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-3 text-sm'>
                           <div className='flex items-start gap-2'>
                              <CheckCircle className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                              <span>
                                 Tailor your cover letter to the specific
                                 position
                              </span>
                           </div>
                           <div className='flex items-start gap-2'>
                              <CheckCircle className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                              <span>
                                 Highlight relevant research experience
                              </span>
                           </div>
                           <div className='flex items-start gap-2'>
                              <CheckCircle className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                              <span>
                                 Include specific examples in your teaching
                                 statement
                              </span>
                           </div>
                           <div className='flex items-start gap-2'>
                              <CheckCircle className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                              <span>
                                 Ensure all documents are properly formatted
                              </span>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </div>
   );
}

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   BookOpen,
   MapPin,
   Mail,
   MessageSquare,
   UserPlus,
   ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

// This would normally come from a database
const getResearcher = (id: string) => {
   const researchers = {
      "sarah-chen": {
         id: "sarah-chen",
         name: "Dr. Sarah Chen",
         title: "Professor of Computer Science",
         institution: "MIT",
         location: "Cambridge, MA",
         email: "schen@mit.edu",
         website: "https://sarahchen.mit.edu",
         hIndex: 42,
         publications: 127,
         citations: 8945,
         field: "Machine Learning",
         bio: "Dr. Sarah Chen is a leading researcher in deep learning and neural networks with a particular focus on computer vision applications. Her work has been instrumental in advancing the field of artificial intelligence, with groundbreaking contributions to convolutional neural networks and transfer learning methodologies.",
         students: 8,
         projects: 12,
         recentPublications: [
            {
               title: "Advanced Neural Architectures for Computer Vision",
               journal: "Nature Machine Intelligence",
               year: 2024,
               citations: 156,
            },
            {
               title: "Transfer Learning in Deep Neural Networks: A Comprehensive Study",
               journal: "Journal of Machine Learning Research",
               year: 2023,
               citations: 243,
            },
            {
               title: "Efficient Training Methods for Large-Scale Vision Models",
               journal: "ICML 2023",
               year: 2023,
               citations: 89,
            },
         ],
         currentStudents: [
            { name: "Alex Thompson", level: "PhD", year: "3rd Year" },
            { name: "Maria Garcia", level: "PhD", year: "2nd Year" },
            { name: "James Liu", level: "Masters", year: "1st Year" },
         ],
      },
   };
   return researchers[id as keyof typeof researchers];
};

export default async function ProfilePage({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   const researcher = getResearcher(id);

   if (!researcher) {
      return <div>Researcher not found</div>;
   }

   return (
      <div className='min-h-screen bg-background'>
         <Navbar page='profiles' />
         {/* <header className='border-b border-border bg-card'>
            <div className='container mx-auto px-4 py-6'>
               <div className='flex items-center justify-between'>
                  <Link href='/' className='flex items-center gap-3'>
                     <div className='w-8 h-8 bg-primary rounded flex items-center justify-center'>
                        <BookOpen className='w-4 h-4 text-primary-foreground' />
                     </div>
                     <h1 className='text-lg font-semibold text-foreground'>
                        Research Hub
                     </h1>
                  </Link>
                  <nav className='hidden md:flex items-center gap-8'>
                     <Link
                        href='/profiles'
                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                     >
                        Researchers
                     </Link>
                     <Link
                        href='/groups'
                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                     >
                        Research Groups
                     </Link>
                     <Link
                        href='/repository'
                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                     >
                        Repository
                     </Link>
                  </nav>
               </div>
            </div>
         </header> */}

         <div className='container mx-auto px-4 py-12'>
            <div className='mb-10'>
               <div className='flex flex-col md:flex-row gap-8 items-start'>
                  <Avatar className='w-32 h-32'>
                     <AvatarImage
                        src={`/placeholder.svg?height=128&width=128&query=professional academic portrait`}
                     />
                     <AvatarFallback>
                        {researcher.name
                           .split(" ")
                           .map((n) => n[0])
                           .join("")}
                     </AvatarFallback>
                  </Avatar>

                  <div className='flex-1'>
                     <h1 className='text-4xl font-semibold mb-2'>
                        {researcher.name}
                     </h1>
                     <p className='text-lg text-muted-foreground mb-1'>
                        {researcher.title}
                     </p>
                     <p className='text-base text-muted-foreground mb-4'>
                        {researcher.institution}
                     </p>

                     <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6'>
                        <div className='flex items-center gap-1'>
                           <MapPin className='w-4 h-4' />
                           {researcher.location}
                        </div>
                        <div className='flex items-center gap-1'>
                           <Mail className='w-4 h-4' />
                           {researcher.email}
                        </div>
                     </div>

                     <div className='flex gap-3'>
                        <Button size='sm'>
                           <UserPlus className='w-4 h-4 mr-2' />
                           Connect
                        </Button>
                        <Button size='sm' variant='outline'>
                           <MessageSquare className='w-4 h-4 mr-2' />
                           Message
                        </Button>
                     </div>
                  </div>
               </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-10'>
               <div className='border border-border rounded-lg p-4 text-center'>
                  <div className='text-3xl font-semibold text-primary mb-1'>
                     {researcher.hIndex}
                  </div>
                  <div className='text-xs text-muted-foreground'>H-Index</div>
               </div>
               <div className='border border-border rounded-lg p-4 text-center'>
                  <div className='text-3xl font-semibold text-primary mb-1'>
                     {researcher.publications}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                     Publications
                  </div>
               </div>
               <div className='border border-border rounded-lg p-4 text-center'>
                  <div className='text-3xl font-semibold text-primary mb-1'>
                     {researcher.citations}
                  </div>
                  <div className='text-xs text-muted-foreground'>Citations</div>
               </div>
               <div className='border border-border rounded-lg p-4 text-center'>
                  <div className='text-3xl font-semibold text-primary mb-1'>
                     {researcher.students}
                  </div>
                  <div className='text-xs text-muted-foreground'>Students</div>
               </div>
            </div>

            <Tabs defaultValue='about' className='space-y-6'>
               <TabsList className='grid w-full grid-cols-4'>
                  <TabsTrigger value='about' className='text-sm'>
                     About
                  </TabsTrigger>
                  <TabsTrigger value='publications' className='text-sm'>
                     Publications
                  </TabsTrigger>
                  <TabsTrigger value='students' className='text-sm'>
                     Students
                  </TabsTrigger>
                  <TabsTrigger value='projects' className='text-sm'>
                     Projects
                  </TabsTrigger>
               </TabsList>

               <TabsContent value='about' className='space-y-6'>
                  <div className='border border-border rounded-lg p-6'>
                     <h3 className='font-semibold text-foreground mb-3'>
                        Biography
                     </h3>
                     <p className='text-muted-foreground leading-relaxed text-sm'>
                        {researcher.bio}
                     </p>
                  </div>

                  <div className='border border-border rounded-lg p-6'>
                     <h3 className='font-semibold text-foreground mb-4'>
                        Research Interests
                     </h3>
                     <div className='flex flex-wrap gap-2'>
                        {[
                           "Deep Learning",
                           "Computer Vision",
                           "Neural Networks",
                           "Transfer Learning",
                           "AI Ethics",
                        ].map((interest) => (
                           <Badge
                              key={interest}
                              variant='outline'
                              className='text-xs'
                           >
                              {interest}
                           </Badge>
                        ))}
                     </div>
                  </div>
               </TabsContent>

               <TabsContent value='publications' className='space-y-4'>
                  {researcher.recentPublications.map((pub, index) => (
                     <div
                        key={index}
                        className='border border-border rounded-lg p-6'
                     >
                        <div className='flex justify-between items-start'>
                           <div className='flex-1'>
                              <h4 className='font-semibold text-foreground text-sm mb-2'>
                                 {pub.title}
                              </h4>
                              <p className='text-xs text-muted-foreground'>
                                 {pub.journal} • {pub.year} • {pub.citations}{" "}
                                 citations
                              </p>
                           </div>
                           <Button variant='ghost' size='sm'>
                              <ExternalLink className='w-4 h-4' />
                           </Button>
                        </div>
                     </div>
                  ))}
               </TabsContent>

               <TabsContent value='students' className='space-y-4'>
                  <div className='border border-border rounded-lg p-6'>
                     <h3 className='font-semibold text-foreground mb-4'>
                        Current Students
                     </h3>
                     <div className='space-y-4'>
                        {researcher.currentStudents.map((student, index) => (
                           <div
                              key={index}
                              className='flex items-center justify-between pb-4 border-b border-border last:pb-0 last:border-0'
                           >
                              <div className='flex items-center gap-3'>
                                 <Avatar className='w-10 h-10'>
                                    <AvatarFallback className='text-xs'>
                                       {student.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                    </AvatarFallback>
                                 </Avatar>
                                 <div>
                                    <p className='font-medium text-sm'>
                                       {student.name}
                                    </p>
                                    <p className='text-xs text-muted-foreground'>
                                       {student.level} • {student.year}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </TabsContent>

               <TabsContent value='projects'>
                  <div className='border border-border rounded-lg p-6'>
                     <h3 className='font-semibold text-foreground mb-2'>
                        Active Research Projects
                     </h3>
                     <p className='text-sm text-muted-foreground'>
                        Projects will be displayed here
                     </p>
                  </div>
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
}

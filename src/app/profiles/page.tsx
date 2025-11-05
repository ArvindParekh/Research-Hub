import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Search, BookOpen } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default function ProfilesPage() {
   const researchers = [
      {
         id: "sarah-chen",
         name: "Dr. Sarah Chen",
         title: "Professor of Computer Science",
         institution: "MIT",
         location: "Cambridge, MA",
         hIndex: 42,
         publications: 127,
         field: "Machine Learning",
         bio: "Leading researcher in deep learning and neural networks with focus on computer vision applications.",
         students: 8,
         projects: 12,
      },
      {
         id: "michael-rodriguez",
         name: "Prof. Michael Rodriguez",
         title: "Research Director",
         institution: "Stanford University",
         location: "Stanford, CA",
         hIndex: 38,
         publications: 89,
         field: "Quantum Physics",
         bio: "Pioneering work in quantum computing and quantum information theory.",
         students: 6,
         projects: 8,
      },
      {
         id: "emily-johnson",
         name: "Dr. Emily Johnson",
         title: "Associate Professor",
         institution: "Harvard Medical School",
         location: "Boston, MA",
         hIndex: 35,
         publications: 156,
         field: "Neuroscience",
         bio: "Investigating neural mechanisms of memory and learning using advanced imaging techniques.",
         students: 10,
         projects: 15,
      },
      {
         id: "david-kim",
         name: "Dr. David Kim",
         title: "Senior Research Scientist",
         institution: "Google DeepMind",
         location: "London, UK",
         hIndex: 29,
         publications: 73,
         field: "Artificial Intelligence",
         bio: "Developing next-generation AI systems with focus on reasoning and planning.",
         students: 4,
         projects: 6,
      },
   ];

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
                        className='text-sm font-medium text-primary'
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
                     <Link
                        href='/jobs'
                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                     >
                        Jobs
                     </Link>
                     <Link
                        href='/events'
                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                     >
                        Events
                     </Link>
                  </nav>
                  <Button asChild size='sm' variant='outline'>
                     <Link href='/profile/create'>Create Profile</Link>
                  </Button>
               </div>
            </div>
         </header> */}

         <div className='container mx-auto px-4 py-12'>
            <div className='mb-10'>
               <h1 className='text-4xl font-semibold mb-3'>Researchers</h1>
               <p className='text-muted-foreground'>
                  Discover and connect with leading researchers worldwide
               </p>
            </div>

            <div className='flex flex-col md:flex-row gap-4 mb-8'>
               <div className='relative flex-1'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                  <Input
                     placeholder='Search researchers...'
                     className='pl-10 text-sm'
                  />
               </div>
               <Select>
                  <SelectTrigger className='w-full md:w-48 text-sm'>
                     <SelectValue placeholder='Field of Study' />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value='all'>All Fields</SelectItem>
                     <SelectItem value='computer-science'>
                        Computer Science
                     </SelectItem>
                     <SelectItem value='physics'>Physics</SelectItem>
                     <SelectItem value='biology'>Biology</SelectItem>
                  </SelectContent>
               </Select>
            </div>

            <div className='grid gap-5'>
               {researchers.map((researcher) => (
                  <div
                     key={researcher.id}
                     className='border border-border rounded-lg p-6 hover:border-primary/20 transition-colors'
                  >
                     <div className='flex items-start gap-4'>
                        <Avatar className='w-16 h-16'>
                           <AvatarImage
                              src={`/placeholder.svg?height=64&width=64&query=professional academic portrait`}
                           />
                           <AvatarFallback>
                              {researcher.name
                                 .split(" ")
                                 .map((n) => n[0])
                                 .join("")}
                           </AvatarFallback>
                        </Avatar>
                        <div className='flex-1'>
                           <div className='flex items-start justify-between mb-2'>
                              <div>
                                 <h3 className='font-semibold text-foreground'>
                                    <Link
                                       href={`/profile/${researcher.id}`}
                                       className='hover:text-primary transition-colors'
                                    >
                                       {researcher.name}
                                    </Link>
                                 </h3>
                                 <p className='text-sm text-muted-foreground'>
                                    {researcher.title}
                                 </p>
                                 <p className='text-sm text-muted-foreground'>
                                    {researcher.institution}
                                 </p>
                              </div>
                              <Badge variant='outline' className='text-xs'>
                                 {researcher.field}
                              </Badge>
                           </div>
                           <p className='text-sm text-muted-foreground mb-3'>
                              {researcher.bio}
                           </p>
                           <div className='flex items-center gap-6 text-sm text-muted-foreground mb-4'>
                              <span>
                                 H-Index:{" "}
                                 <span className='font-medium text-foreground'>
                                    {researcher.hIndex}
                                 </span>
                              </span>
                              <span>
                                 {researcher.publications} Publications
                              </span>
                              <span>{researcher.students} Students</span>
                           </div>
                           <div className='flex gap-2'>
                              <Button size='sm' variant='outline'>
                                 Connect
                              </Button>
                              <Button size='sm' variant='outline'>
                                 Message
                              </Button>
                              <Button size='sm' variant='ghost' asChild>
                                 <Link href={`/profile/${researcher.id}`}>
                                    View Profile
                                 </Link>
                              </Button>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            <div className='text-center mt-10'>
               <Button variant='outline'>Load More</Button>
            </div>
         </div>
      </div>
   );
}

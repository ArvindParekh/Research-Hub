import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   BookOpen,
   Users,
   MessageSquare,
   Calendar,
   Briefcase,
   TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/dark-mode-toggle";
import Navbar from "@/components/navbar";

export default function HomePage() {
   return (
      <div className='min-h-screen bg-background'>
         {/* Header */}
         <Navbar />

         {/* Hero Section */}
         <section className='py-24 px-4'>
            <div className='container mx-auto text-center max-w-3xl'>
               <h2 className='text-5xl md:text-6xl font-semibold text-foreground mb-6 leading-tight'>
                  The Hub for
                  <span className='block text-primary mt-2'>
                     Academic Research
                  </span>
               </h2>
               <p className='text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto'>
                  Connect with researchers, collaborate on projects, and advance
                  science. A modern platform built for the academic community.
               </p>
               <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <Button size='lg' asChild className='text-base'>
                     <Link href='/register'>Get Started</Link>
                  </Button>
                  <Button
                     size='lg'
                     variant='outline'
                     asChild
                     className='text-base bg-transparent'
                  >
                     <Link href='/explore'>Explore</Link>
                  </Button>
               </div>
            </div>
         </section>

         {/* Features Grid */}
         <section className='py-20 px-4'>
            <div className='container mx-auto'>
               <h3 className='text-3xl font-semibold text-center mb-16 text-foreground'>
                  Powerful Features
               </h3>
               <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  <div className='p-6 border border-border rounded-lg hover:border-primary/20 transition-colors'>
                     <div className='w-10 h-10 bg-primary/10 rounded flex items-center justify-center mb-4'>
                        <Users className='w-5 h-5 text-primary' />
                     </div>
                     <h4 className='font-semibold text-foreground mb-2'>
                        Researcher Profiles
                     </h4>
                     <p className='text-sm text-muted-foreground'>
                        Customizable profiles with publication tracking and
                        impact metrics
                     </p>
                  </div>

                  <div className='p-6 border border-border rounded-lg hover:border-primary/20 transition-colors'>
                     <div className='w-10 h-10 bg-primary/10 rounded flex items-center justify-center mb-4'>
                        <MessageSquare className='w-5 h-5 text-primary' />
                     </div>
                     <h4 className='font-semibold text-foreground mb-2'>
                        Collaboration Tools
                     </h4>
                     <p className='text-sm text-muted-foreground'>
                        Real-time messaging, video calls, and integrated
                        whiteboard
                     </p>
                  </div>

                  <div className='p-6 border border-border rounded-lg hover:border-primary/20 transition-colors'>
                     <div className='w-10 h-10 bg-primary/10 rounded flex items-center justify-center mb-4'>
                        <BookOpen className='w-5 h-5 text-primary' />
                     </div>
                     <h4 className='font-semibold text-foreground mb-2'>
                        Research Repository
                     </h4>
                     <p className='text-sm text-muted-foreground'>
                        Integrated preprint repository with version control
                     </p>
                  </div>

                  <div className='p-6 border border-border rounded-lg hover:border-primary/20 transition-colors'>
                     <div className='w-10 h-10 bg-primary/10 rounded flex items-center justify-center mb-4'>
                        <Briefcase className='w-5 h-5 text-primary' />
                     </div>
                     <h4 className='font-semibold text-foreground mb-2'>
                        Job Board
                     </h4>
                     <p className='text-sm text-muted-foreground'>
                        Dynamic job listings with one-click profile application
                     </p>
                  </div>

                  <div className='p-6 border border-border rounded-lg hover:border-primary/20 transition-colors'>
                     <div className='w-10 h-10 bg-primary/10 rounded flex items-center justify-center mb-4'>
                        <Calendar className='w-5 h-5 text-primary' />
                     </div>
                     <h4 className='font-semibold text-foreground mb-2'>
                        Events Platform
                     </h4>
                     <p className='text-sm text-muted-foreground'>
                        Virtual conferences and networking opportunities
                     </p>
                  </div>

                  <div className='p-6 border border-border rounded-lg hover:border-primary/20 transition-colors'>
                     <div className='w-10 h-10 bg-primary/10 rounded flex items-center justify-center mb-4'>
                        <TrendingUp className='w-5 h-5 text-primary' />
                     </div>
                     <h4 className='font-semibold text-foreground mb-2'>
                        Personalized Feed
                     </h4>
                     <p className='text-sm text-muted-foreground'>
                        AI-powered recommendations based on your research
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Featured Researchers */}
         <section className='py-20 px-4'>
            <div className='container mx-auto'>
               <h3 className='text-3xl font-semibold text-center mb-16 text-foreground'>
                  Featured Researchers
               </h3>
               <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {[
                     {
                        name: "Dr. Sarah Chen",
                        title: "Professor of Computer Science",
                        institution: "MIT",
                        hIndex: 42,
                        publications: 127,
                        field: "Machine Learning",
                     },
                     {
                        name: "Prof. Michael Rodriguez",
                        title: "Research Director",
                        institution: "Stanford University",
                        hIndex: 38,
                        publications: 89,
                        field: "Quantum Physics",
                     },
                     {
                        name: "Dr. Emily Johnson",
                        title: "Associate Professor",
                        institution: "Harvard Medical School",
                        hIndex: 35,
                        publications: 156,
                        field: "Neuroscience",
                     },
                  ].map((researcher, index) => (
                     <div
                        key={index}
                        className='border border-border rounded-lg p-6 hover:border-primary/20 transition-colors'
                     >
                        <div className='flex items-center gap-4 mb-4'>
                           <Avatar className='w-14 h-14'>
                              <AvatarImage
                                 src={`/placeholder.svg?height=56&width=56&query=professional academic portrait`}
                              />
                              <AvatarFallback>
                                 {researcher.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                              </AvatarFallback>
                           </Avatar>
                           <div className='flex-1'>
                              <h4 className='font-semibold text-foreground'>
                                 {researcher.name}
                              </h4>
                              <p className='text-sm text-muted-foreground'>
                                 {researcher.title}
                              </p>
                           </div>
                        </div>
                        <p className='text-sm text-muted-foreground mb-4'>
                           {researcher.institution}
                        </p>
                        <div className='flex items-center justify-between text-sm mb-3'>
                           <span className='text-muted-foreground'>
                              H-Index: {researcher.hIndex}
                           </span>
                           <Badge variant='secondary' className='text-xs'>
                              {researcher.field}
                           </Badge>
                        </div>
                        <p className='text-sm text-muted-foreground'>
                           {researcher.publications} publications
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Footer */}
         <footer className='border-t border-border bg-card py-12 px-4'>
            <div className='container mx-auto'>
               <div className='grid md:grid-cols-4 gap-8 mb-8'>
                  <div>
                     <div className='flex items-center gap-2 mb-4'>
                        <div className='w-6 h-6 bg-primary rounded flex items-center justify-center'>
                           <BookOpen className='w-3 h-3 text-primary-foreground' />
                        </div>
                        <span className='font-semibold text-foreground'>
                           Research Hub
                        </span>
                     </div>
                     <p className='text-sm text-muted-foreground'>
                        The hub for academic research and collaboration
                     </p>
                  </div>
                  <div>
                     <h5 className='font-semibold text-foreground mb-3 text-sm'>
                        Platform
                     </h5>
                     <ul className='space-y-2 text-sm'>
                        <li>
                           <Link
                              href='/profiles'
                              className='text-muted-foreground hover:text-foreground transition-colors'
                           >
                              Researchers
                           </Link>
                        </li>
                        <li>
                           <Link
                              href='/groups'
                              className='text-muted-foreground hover:text-foreground transition-colors'
                           >
                              Research Groups
                           </Link>
                        </li>
                        <li>
                           <Link
                              href='/repository'
                              className='text-muted-foreground hover:text-foreground transition-colors'
                           >
                              Repository
                           </Link>
                        </li>
                     </ul>
                  </div>
                  <div>
                     <h5 className='font-semibold text-foreground mb-3 text-sm'>
                        Community
                     </h5>
                     <ul className='space-y-2 text-sm'>
                        <li>
                           <Link
                              href='/jobs'
                              className='text-muted-foreground hover:text-foreground transition-colors'
                           >
                              Jobs
                           </Link>
                        </li>
                        <li>
                           <Link
                              href='/events'
                              className='text-muted-foreground hover:text-foreground transition-colors'
                           >
                              Events
                           </Link>
                        </li>
                        <li>
                           <Link
                              href='/help'
                              className='text-muted-foreground hover:text-foreground transition-colors'
                           >
                              Help
                           </Link>
                        </li>
                     </ul>
                  </div>
                  <div>
                     <h5 className='font-semibold text-foreground mb-3 text-sm'>
                        Company
                     </h5>
                     <ul className='space-y-2 text-sm'>
                        <li>
                           <Link
                              href='/about'
                              className='text-muted-foreground hover:text-foreground transition-colors'
                           >
                              About
                           </Link>
                        </li>
                        <li>
                           <Link
                              href='/privacy'
                              className='text-muted-foreground hover:text-foreground transition-colors'
                           >
                              Privacy
                           </Link>
                        </li>
                        <li>
                           <Link
                              href='/terms'
                              className='text-muted-foreground hover:text-foreground transition-colors'
                           >
                              Terms
                           </Link>
                        </li>
                     </ul>
                  </div>
               </div>
               <div className='border-t border-border pt-8 text-center text-sm text-muted-foreground'>
                  <p>&copy; 2025 Research Hub. All rights reserved.</p>
               </div>
            </div>
         </footer>
      </div>
   );
}

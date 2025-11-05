"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   BookOpen,
   Settings,
   LogOut,
   Mail,
   MapPin,
   Briefcase,
   ExternalLink,
} from "lucide-react";
import Link from "next/link";

// Mock current user data - in a real app, this would come from authentication context
const currentUser = {
   id: "user-001",
   name: "Dr. Alex Johnson",
   title: "Associate Professor",
   institution: "Stanford University",
   location: "Stanford, CA",
   email: "ajohnson@stanford.edu",
   website: "https://alexjohnson.stanford.edu",
   bio: "Associate Professor specializing in quantum computing and computational theory. Passionate about mentoring the next generation of computer scientists.",
   field: "Quantum Computing",
   hIndex: 28,
   publications: 67,
   citations: 3421,
   students: 5,
   avatar: "/academic-portrait.png",
   joinDate: "January 2022",
   lastActive: "2 hours ago",
};

export default function UserProfilePage() {
   return (
      <div className='min-h-screen bg-background'>
         {/* Header */}
         <header className='border-b border-border bg-card sticky top-0 z-50'>
            <div className='container mx-auto px-4 py-4'>
               <div className='flex items-center justify-between'>
                  <Link href='/' className='flex items-center gap-3'>
                     <div className='w-8 h-8 bg-primary rounded flex items-center justify-center'>
                        <BookOpen className='w-4 h-4 text-primary-foreground' />
                     </div>
                     <h1 className='text-lg font-semibold text-foreground'>
                        Academic Nexus
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
                  <div className='flex items-center gap-2'>
                     <Link href='/user/settings'>
                        <Button size='sm' variant='ghost'>
                           <Settings className='w-4 h-4' />
                        </Button>
                     </Link>
                     <Button size='sm' variant='ghost'>
                        <LogOut className='w-4 h-4' />
                     </Button>
                  </div>
               </div>
            </div>
         </header>

         {/* Profile Content */}
         <div className='container mx-auto px-4 py-12'>
            {/* Profile Header */}
            <div className='mb-12'>
               <div className='flex flex-col md:flex-row gap-8 items-start'>
                  <Avatar className='w-32 h-32'>
                     <AvatarImage
                        src={currentUser.avatar || "/placeholder.svg"}
                     />
                     <AvatarFallback>
                        {currentUser.name
                           .split(" ")
                           .map((n) => n[0])
                           .join("")}
                     </AvatarFallback>
                  </Avatar>

                  <div className='flex-1'>
                     <h1 className='text-4xl font-semibold mb-2'>
                        {currentUser.name}
                     </h1>
                     <p className='text-lg text-muted-foreground mb-1'>
                        {currentUser.title}
                     </p>
                     <p className='text-base text-muted-foreground mb-4'>
                        {currentUser.institution}
                     </p>

                     <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6'>
                        <div className='flex items-center gap-1'>
                           <MapPin className='w-4 h-4' />
                           {currentUser.location}
                        </div>
                        <div className='flex items-center gap-1'>
                           <Mail className='w-4 h-4' />
                           {currentUser.email}
                        </div>
                        <div className='flex items-center gap-1'>
                           <Briefcase className='w-4 h-4' />
                           Member since {currentUser.joinDate}
                        </div>
                     </div>

                     <div className='flex gap-3'>
                        <Link href='/user/settings'>
                           <Button size='sm'>
                              <Settings className='w-4 h-4 mr-2' />
                              Edit Profile
                           </Button>
                        </Link>
                        <Button size='sm' variant='outline'>
                           <ExternalLink className='w-4 h-4 mr-2' />
                           View Public Profile
                        </Button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-12'>
               <div className='border border-border rounded-lg p-4 text-center'>
                  <div className='text-3xl font-semibold text-primary mb-1'>
                     {currentUser.hIndex}
                  </div>
                  <div className='text-xs text-muted-foreground'>H-Index</div>
               </div>
               <div className='border border-border rounded-lg p-4 text-center'>
                  <div className='text-3xl font-semibold text-primary mb-1'>
                     {currentUser.publications}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                     Publications
                  </div>
               </div>
               <div className='border border-border rounded-lg p-4 text-center'>
                  <div className='text-3xl font-semibold text-primary mb-1'>
                     {currentUser.citations}
                  </div>
                  <div className='text-xs text-muted-foreground'>Citations</div>
               </div>
               <div className='border border-border rounded-lg p-4 text-center'>
                  <div className='text-3xl font-semibold text-primary mb-1'>
                     {currentUser.students}
                  </div>
                  <div className='text-xs text-muted-foreground'>Advisees</div>
               </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue='about' className='space-y-6'>
               <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='about' className='text-sm'>
                     About
                  </TabsTrigger>
                  <TabsTrigger value='publications' className='text-sm'>
                     Publications
                  </TabsTrigger>
                  <TabsTrigger value='activity' className='text-sm'>
                     Activity
                  </TabsTrigger>
               </TabsList>

               <TabsContent value='about' className='space-y-6'>
                  <div className='border border-border rounded-lg p-6'>
                     <h3 className='font-semibold text-foreground mb-3'>
                        Biography
                     </h3>
                     <p className='text-muted-foreground leading-relaxed text-sm'>
                        {currentUser.bio}
                     </p>
                  </div>

                  <div className='border border-border rounded-lg p-6'>
                     <h3 className='font-semibold text-foreground mb-3'>
                        Research Focus
                     </h3>
                     <p className='text-muted-foreground text-sm'>
                        {currentUser.field}
                     </p>
                  </div>
               </TabsContent>

               <TabsContent value='publications' className='space-y-4'>
                  <div className='border border-border rounded-lg p-6'>
                     <h3 className='font-semibold text-foreground mb-4'>
                        Recent Publications
                     </h3>
                     <div className='space-y-4'>
                        {[1, 2, 3].map((i) => (
                           <div
                              key={i}
                              className='pb-4 border-b border-border last:pb-0 last:border-0'
                           >
                              <h4 className='font-medium text-foreground text-sm mb-1'>
                                 Quantum Computing Applications in Machine
                                 Learning
                              </h4>
                              <p className='text-xs text-muted-foreground'>
                                 Journal of Quantum Computing • 2024 • 45
                                 citations
                              </p>
                           </div>
                        ))}
                     </div>
                  </div>
               </TabsContent>

               <TabsContent value='activity' className='space-y-4'>
                  <div className='border border-border rounded-lg p-6'>
                     <h3 className='font-semibold text-foreground mb-4'>
                        Recent Activity
                     </h3>
                     <div className='space-y-4'>
                        <div className='pb-4 border-b border-border last:pb-0 last:border-0'>
                           <p className='text-sm text-foreground'>
                              Connected with 3 new researchers
                           </p>
                           <p className='text-xs text-muted-foreground'>
                              2 days ago
                           </p>
                        </div>
                        <div className='pb-4 border-b border-border last:pb-0 last:border-0'>
                           <p className='text-sm text-foreground'>
                              Published a new paper
                           </p>
                           <p className='text-xs text-muted-foreground'>
                              5 days ago
                           </p>
                        </div>
                        <div className='pb-4 border-b border-border last:pb-0 last:border-0'>
                           <p className='text-sm text-foreground'>
                              Joined a research group
                           </p>
                           <p className='text-xs text-muted-foreground'>
                              1 week ago
                           </p>
                        </div>
                     </div>
                  </div>
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
}

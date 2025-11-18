import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Mail, MapPin, Briefcase, ExternalLink } from "lucide-react";
import Link from "next/link";
import NavbarClient from "@/components/navbar-client";
import { stackServerApp } from "@/stack/server";
import { getUserProfile } from "@/actions/user/get-user-profile";
import { format, formatDistanceToNow } from "date-fns";

// // Mock current user data - in a real app, this would come from authentication context
// const currentUser = {
//    id: "user-001",
//    name: "Dr. Alex Johnson",
//    title: "Associate Professor",
//    institution: "Stanford University",
//    location: "Stanford, CA",
//    email: "ajohnson@stanford.edu",
//    website: "https://alexjohnson.stanford.edu",
//    bio: "Associate Professor specializing in quantum computing and computational theory. Passionate about mentoring the next generation of computer scientists.",
//    field: "Quantum Computing",
//    hIndex: 28,
//    publications: 67,
//    citations: 3421,
//    students: 5,
//    avatar: "/academic-portrait.png",
//    joinDate: "January 2022",
//    lastActive: "2 hours ago",
// };

export default async function UserProfilePage() {
   const currentUser = await stackServerApp.getUser();

   const userProfile = await getUserProfile(currentUser?.id!);

   if (!userProfile.success || !userProfile.data) {
      return <div>Error fetching user profile</div>;
   }

   const user = userProfile.data;

   return (
      <div className='min-h-screen bg-background'>
         {/* Header */}
         <NavbarClient page='user' />

         {/* Profile Content */}
         <div className='container mx-auto px-4 py-12'>
            {/* Profile Header */}
            <div className='mb-12'>
               <div className='flex flex-col md:flex-row gap-8 items-start'>
                  <Avatar className='w-32 h-32'>
                     <AvatarImage
                        src={currentUser?.profileImageUrl || "/placeholder.svg"}
                     />
                     <AvatarFallback>
                        {currentUser?.displayName &&
                           currentUser.displayName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                     </AvatarFallback>
                  </Avatar>

                  <div className='flex-1'>
                     <h1 className='text-4xl font-semibold mb-2'>
                        {currentUser?.displayName && currentUser.displayName}
                     </h1>
                     <p className='text-lg text-muted-foreground mb-1'>
                        {user.title}
                     </p>
                     <p className='text-base text-muted-foreground mb-4'>
                        {user.institution}
                     </p>

                     <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6'>
                        <div className='flex items-center gap-1'>
                           <MapPin className='w-4 h-4' />
                           {user.location}
                        </div>
                        <div className='flex items-center gap-1'>
                           <Mail className='w-4 h-4' />
                           {currentUser?.primaryEmail &&
                              currentUser.primaryEmail}
                        </div>
                        <div className='flex items-center gap-1'>
                           <Briefcase className='w-4 h-4' />
                           Member since {format(user.createdAt, "MMMM yyyy")}
                        </div>
                     </div>

                     <div className='flex gap-3'>
                        <Link href='/user/settings'>
                           <Button size='sm'>
                              <Settings className='w-4 h-4 mr-2' />
                              Edit Profile
                           </Button>
                        </Link>
                        <Link href={`/profile/${currentUser?.id}`}>
                           <Button size='sm' variant='outline'>
                              <ExternalLink className='w-4 h-4 mr-2' />
                              View Public Profile
                           </Button>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-12'>
               <div className='border border-border rounded-lg p-4 text-center'>
                  <div className='text-3xl font-semibold text-primary mb-1'>
                     {user.hIndex}
                  </div>
                  <div className='text-xs text-muted-foreground'>H-Index</div>
               </div>
               <div className='border border-border rounded-lg p-4 text-center'>
                  <div className='text-3xl font-semibold text-primary mb-1'>
                     {user._count.publications}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                     Publications
                  </div>
               </div>
               <div className='border border-border rounded-lg p-4 text-center'>
                  <div className='text-3xl font-semibold text-primary mb-1'>
                     {user.publications.reduce(
                        (acc, publication) =>
                           acc + publication._count.citations_received,
                        0
                     )}
                  </div>
                  <div className='text-xs text-muted-foreground'>Citations</div>
               </div>
               <div className='border border-border rounded-lg p-4 text-center'>
                  <div className='text-3xl font-semibold text-primary mb-1'>
                     {user.advisees.length}
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
                        {user.bio}
                     </p>
                  </div>

                  <div className='border border-border rounded-lg p-6'>
                     <h3 className='font-semibold text-foreground mb-3'>
                        Research Focus
                     </h3>
                     <p className='text-muted-foreground text-sm'>
                        {user.researchInterests
                           .map((interest) => interest.interest)
                           .join(", ")}
                     </p>
                  </div>
               </TabsContent>

               <TabsContent value='publications' className='space-y-4'>
                  <div className='border border-border rounded-lg p-6'>
                     <h3 className='font-semibold text-foreground mb-4'>
                        Recent Publications
                     </h3>
                     <div className='space-y-4'>
                        {user.publications.map((publication) => (
                           <div
                              key={publication.id}
                              className='pb-4 border-b border-border last:pb-0 last:border-0'
                           >
                              <h4 className='font-medium text-foreground text-sm mb-1'>
                                 {publication.title}
                              </h4>
                              <p className='text-xs text-muted-foreground'>
                                 {publication.journal} •{" "}
                                 {publication.publicationDate
                                    ? format(
                                         publication.publicationDate,
                                         "MMMM yyyy"
                                      )
                                    : "N/A"}{" "}
                                 •{" "}
                                 {publication._count.citations_received +
                                    publication._count
                                       .paperCitationsReceived}{" "}
                                 citations
                              </p>
                              {publication.abstract && (
                                 <p className='text-xs text-muted-foreground'>
                                    {publication.abstract}
                                 </p>
                              )}
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
                        {user.posts.map((post) => (
                           <div className='pb-4 border-b border-border last:pb-0 last:border-0'>
                              <p className='text-sm text-foreground'>
                                 {post.content && post.content.length > 0
                                    ? post.content
                                    : "No content"}
                              </p>
                              <p className='text-xs text-muted-foreground'>
                                 {formatDistanceToNow(post.createdAt)}
                              </p>
                              <p className='text-xs text-muted-foreground'>
                                 {post._count.reactions} reactions
                              </p>
                              <p className='text-xs text-muted-foreground'>
                                 {post._count.comments} comments
                              </p>
                           </div>
                        ))}
                     </div>
                  </div>
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
}

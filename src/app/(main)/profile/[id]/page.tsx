import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   MapPin,
   Mail,
   MessageSquare,
   UserPlus,
   ExternalLink,
   Globe,
   UserCheck,
   Clock,
   Users,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { getUserProfile } from "@/actions/user/get-user-profile";
import { getConnectionStatus } from "@/actions/user/get-connection-status";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { ConnectButton } from "@/components/profile/connect-button";
import { format } from "date-fns";

export default async function ProfilePage({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   const currentUser = await stackServerApp.getUser();

   const profileResponse = await getUserProfile(id);

   if (!profileResponse.success || !profileResponse.data) {
      return (
         <div className='min-h-screen bg-background'>
            <Navbar page='profiles' />
            <div className='container mx-auto px-4 py-12'>
               <div className='text-center'>
                  <h1 className='text-2xl font-semibold mb-2'>
                     Researcher not found
                  </h1>
                  <p className='text-muted-foreground mb-6'>
                     The profile you're looking for doesn't exist.
                  </p>
                  <Button asChild>
                     <Link href='/feed'>Go to Feed</Link>
                  </Button>
               </div>
            </div>
         </div>
      );
   }

   const profile = profileResponse.data;
   const isOwnProfile = currentUser?.id === id;

   // get connection status if not own profile
   const connectionStatusResponse = !isOwnProfile
      ? await getConnectionStatus(id)
      : null;
   const connectionStatus = connectionStatusResponse?.data;

   const fullName =
      profile.firstName && profile.lastName
         ? `${profile.firstName} ${profile.lastName}`
         : profile.firstName || "Unknown User";

   const initials =
      profile.firstName && profile.lastName
         ? `${profile.firstName[0]}${profile.lastName[0]}`
         : profile.firstName?.[0] || "U";

   return (
      <div className='min-h-screen bg-background'>
         <Navbar page='profiles' />

         <div className='container mx-auto px-4 py-12'>
            <div className='mb-10'>
               <div className='flex flex-col md:flex-row gap-8 items-start'>
                  <Avatar className='w-32 h-32'>
                     <AvatarImage src={undefined} />
                     <AvatarFallback className='text-2xl'>
                        {initials}
                     </AvatarFallback>
                  </Avatar>

                  <div className='flex-1'>
                     <h1 className='text-4xl font-semibold mb-2'>{fullName}</h1>
                     {profile.title && (
                        <p className='text-lg text-muted-foreground mb-1'>
                           {profile.title}
                        </p>
                     )}
                     {profile.institution && (
                        <p className='text-base text-muted-foreground mb-4'>
                           {profile.institution}
                        </p>
                     )}

                     <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6'>
                        {profile.location && (
                           <div className='flex items-center gap-1'>
                              <MapPin className='w-4 h-4' />
                              {profile.location}
                           </div>
                        )}
                        {profile.website && (
                           <a
                              href={profile.website}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex items-center gap-1 hover:text-primary transition-colors'
                           >
                              <Globe className='w-4 h-4' />
                              Website
                           </a>
                        )}
                        <div className='flex items-center gap-1'>
                           <Clock className='w-4 h-4' />
                           Joined{" "}
                           {format(new Date(profile.createdAt), "MMM yyyy")}
                        </div>
                     </div>

                     <div className='flex gap-3'>
                        {isOwnProfile ? (
                           <Button asChild size='sm'>
                              <Link href='/user/settings'>Edit Profile</Link>
                           </Button>
                        ) : (
                           <>
                              <ConnectButton
                                 targetUserId={id}
                                 connectionStatus={connectionStatus}
                              />
                              <Button size='sm' variant='outline' asChild>
                                 <Link href={`/messages?userId=${id}`}>
                                    <MessageSquare className='w-4 h-4 mr-2' />
                                    Message
                                 </Link>
                              </Button>
                           </>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-10'>
               <div className='border border-border rounded-lg p-4 text-center'>
                  <div className='text-3xl font-semibold text-primary mb-1'>
                     {profile._count.followers}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                     Connections
                  </div>
               </div>
               <div className='border border-border rounded-lg p-4 text-center'>
                  <div className='text-3xl font-semibold text-primary mb-1'>
                     {profile._count.publications}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                     Publications
                  </div>
               </div>
               <div className='border border-border rounded-lg p-4 text-center'>
                  <div className='text-3xl font-semibold text-primary mb-1'>
                     {profile._count.posts}
                  </div>
                  <div className='text-xs text-muted-foreground'>Posts</div>
               </div>
               <div className='border border-border rounded-lg p-4 text-center'>
                  <div className='text-3xl font-semibold text-primary mb-1'>
                     {profile._count.repositoryPapers}
                  </div>
                  <div className='text-xs text-muted-foreground'>Papers</div>
               </div>
            </div>

            <Tabs defaultValue='about' className='space-y-6'>
               <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='about' className='text-sm'>
                     About
                  </TabsTrigger>
                  <TabsTrigger value='publications' className='text-sm'>
                     Publications
                  </TabsTrigger>
                  <TabsTrigger value='posts' className='text-sm'>
                     Posts
                  </TabsTrigger>
               </TabsList>

               <TabsContent value='about' className='space-y-6'>
                  {profile.bio && (
                     <div className='border border-border rounded-lg p-6'>
                        <h3 className='font-semibold text-foreground mb-3'>
                           Biography
                        </h3>
                        <p className='text-muted-foreground leading-relaxed text-sm whitespace-pre-wrap'>
                           {profile.bio}
                        </p>
                     </div>
                  )}

                  {profile.researchInterests.length > 0 && (
                     <div className='border border-border rounded-lg p-6'>
                        <h3 className='font-semibold text-foreground mb-4'>
                           Research Interests
                        </h3>
                        <div className='flex flex-wrap gap-2'>
                           {profile.researchInterests.map((interest) => (
                              <Badge
                                 key={interest.id}
                                 variant='outline'
                                 className='text-xs'
                              >
                                 {interest.interest}
                              </Badge>
                           ))}
                        </div>
                     </div>
                  )}

                  {!profile.bio && profile.researchInterests.length === 0 && (
                     <div className='border border-border rounded-lg p-6'>
                        <p className='text-sm text-muted-foreground text-center'>
                           No information available yet
                        </p>
                     </div>
                  )}
               </TabsContent>

               <TabsContent value='publications' className='space-y-4'>
                  {profile.publications.length > 0 ? (
                     profile.publications.map((pub) => (
                        <div
                           key={pub.id}
                           className='border border-border rounded-lg p-6'
                        >
                           <div className='flex justify-between items-start'>
                              <div className='flex-1'>
                                 <h4 className='font-semibold text-foreground text-sm mb-2'>
                                    {pub.title}
                                 </h4>
                                 <div className='flex flex-wrap gap-2 text-xs text-muted-foreground mb-2'>
                                    {pub.journal && <span>{pub.journal}</span>}
                                    {pub.publicationDate && (
                                       <span>
                                          {format(
                                             new Date(pub.publicationDate),
                                             "yyyy"
                                          )}
                                       </span>
                                    )}
                                    <span>
                                       {pub._count.citations_received} citations
                                    </span>
                                 </div>
                                 {pub.abstract && (
                                    <p className='text-xs text-muted-foreground line-clamp-2'>
                                       {pub.abstract}
                                    </p>
                                 )}
                              </div>
                              {pub.doi && (
                                 <Button variant='ghost' size='sm' asChild>
                                    <a
                                       href={`https://doi.org/${pub.doi}`}
                                       target='_blank'
                                       rel='noopener noreferrer'
                                    >
                                       <ExternalLink className='w-4 h-4' />
                                    </a>
                                 </Button>
                              )}
                           </div>
                        </div>
                     ))
                  ) : (
                     <div className='border border-border rounded-lg p-6'>
                        <p className='text-sm text-muted-foreground text-center'>
                           No publications yet
                        </p>
                     </div>
                  )}
               </TabsContent>

               <TabsContent value='posts'>
                  <div className='border border-border rounded-lg p-6'>
                     <p className='text-sm text-muted-foreground text-center'>
                        User posts will be displayed here
                     </p>
                  </div>
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
}

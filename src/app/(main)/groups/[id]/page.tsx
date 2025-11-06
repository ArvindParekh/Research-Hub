import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   MapPin,
   Users,
   ArrowLeft,
   Settings,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

const getGroup = (id: string) => {
   const groups: Record<string, any> = {
      "ml-research-lab": {
         id: "ml-research-lab",
         name: "Machine Learning Research Lab",
         description:
            "Collaborative research group focused on deep learning and neural architectures",
         longDescription:
            "The Machine Learning Research Lab is a premier collaborative group dedicated to advancing the frontiers of deep learning and neural network architectures. Our team conducts cutting-edge research on novel training methodologies, efficient model architectures, and practical applications of machine learning across various domains. We welcome researchers at all levels who are passionate about pushing the boundaries of what's possible with modern machine learning techniques.",
         members: 24,
         maxMembers: 50,
         field: "Machine Learning",
         institution: "MIT CSAIL",
         leader: "Dr. Sarah Chen",
         founded: "2021",
         isJoined: false,
         topics: ["Deep Learning", "Neural Networks", "Computer Vision"],
         membersList: [
            { name: "Dr. Sarah Chen", role: "Founder & Lead", avatar: "SC" },
            {
               name: "Prof. John Smith",
               role: "Senior Researcher",
               avatar: "JS",
            },
            { name: "Alex Thompson", role: "PhD Student", avatar: "AT" },
            { name: "Maria Garcia", role: "Research Assistant", avatar: "MG" },
         ],
         recentProjects: [
            {
               name: "Neural Architecture Search Optimization",
               status: "Active",
               participants: 5,
            },
            {
               name: "Efficient Vision Transformers",
               status: "Active",
               participants: 3,
            },
            {
               name: "Transfer Learning Framework",
               status: "Planning",
               participants: 4,
            },
         ],
         announcements: [
            {
               date: "2024-01-15",
               title: "Group Meeting - Next Friday",
               content:
                  "Monthly group meeting scheduled for next Friday at 2 PM EST",
            },
            {
               date: "2024-01-10",
               title: "New Member Welcome",
               content: "Welcoming 3 new researchers to the lab!",
            },
         ],
      },
   };
   return groups[id];
};

export default async function GroupDetailPage({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   const group = getGroup(id);

   if (!group) {
      return (
         <div className='min-h-screen bg-background flex items-center justify-center'>
            Group not found
         </div>
      );
   }

   return (
      <div className='min-h-screen bg-background'>
         {/* Header */}
         <Navbar page='groups' />

         <div className='container mx-auto px-4 py-8'>
            {/* Back Button */}
            <Link
               href='/groups'
               className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6'
            >
               <ArrowLeft className='w-4 h-4' />
               Back to Groups
            </Link>

            {/* Group Header */}
            <div className='mb-8'>
               <div className='flex items-start justify-between mb-6'>
                  <div className='flex-1'>
                     <h1 className='text-4xl font-semibold mb-2'>
                        {group.name}
                     </h1>
                     <p className='text-lg text-muted-foreground mb-4'>
                        {group.description}
                     </p>

                     <div className='flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-4'>
                        <div className='flex items-center gap-2'>
                           <MapPin className='w-4 h-4' />
                           {group.institution}
                        </div>
                        <div className='flex items-center gap-2'>
                           <Users className='w-4 h-4' />
                           {group.members}/{group.maxMembers} members
                        </div>
                        <div className='text-sm'>Founded {group.founded}</div>
                     </div>

                     <div className='flex flex-wrap gap-2 mb-4'>
                        {group.topics.map((topic: string) => (
                           <Badge
                              key={topic}
                              variant='outline'
                              className='text-xs'
                           >
                              {topic}
                           </Badge>
                        ))}
                     </div>
                  </div>

                  <div className='flex flex-col gap-2'>
                     <Button size='sm'>
                        {group.isJoined ? "Leave Group" : "Join Group"}
                     </Button>
                     <Button variant='outline' size='sm'>
                        <Settings className='w-4 h-4 mr-1' />
                        Settings
                     </Button>
                  </div>
               </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue='about' className='space-y-6'>
               <TabsList className='grid w-full grid-cols-4'>
                  <TabsTrigger value='about' className='text-sm'>
                     About
                  </TabsTrigger>
                  <TabsTrigger value='members' className='text-sm'>
                     Members
                  </TabsTrigger>
                  <TabsTrigger value='projects' className='text-sm'>
                     Projects
                  </TabsTrigger>
                  <TabsTrigger value='announcements' className='text-sm'>
                     Announcements
                  </TabsTrigger>
               </TabsList>

               {/* About Tab */}
               <TabsContent value='about' className='space-y-6'>
                  <div className='border border-border rounded-lg p-6'>
                     <h3 className='font-semibold text-foreground mb-3'>
                        About
                     </h3>
                     <p className='text-muted-foreground leading-relaxed text-sm'>
                        {group.longDescription}
                     </p>
                  </div>

                  <div className='border border-border rounded-lg p-6'>
                     <h3 className='font-semibold text-foreground mb-4'>
                        Group Leader
                     </h3>
                     <div className='flex items-center gap-4'>
                        <Avatar className='w-12 h-12'>
                           <AvatarFallback>
                              {group.leader
                                 .split(" ")
                                 .map((n: string) => n[0])
                                 .join("")}
                           </AvatarFallback>
                        </Avatar>
                        <div>
                           <p className='font-medium text-foreground'>
                              {group.leader}
                           </p>
                           <p className='text-sm text-muted-foreground'>
                              {group.institution}
                           </p>
                        </div>
                     </div>
                  </div>
               </TabsContent>

               {/* Members Tab */}
               <TabsContent value='members' className='space-y-4'>
                  <div className='border border-border rounded-lg p-6'>
                     <h3 className='font-semibold text-foreground mb-4'>
                        Group Members ({group.members})
                     </h3>
                     <div className='space-y-4'>
                        {group.membersList.map((member: any, index: number) => (
                           <div
                              key={index}
                              className='flex items-center justify-between pb-4 border-b border-border last:pb-0 last:border-0'
                           >
                              <div className='flex items-center gap-3'>
                                 <Avatar className='w-10 h-10'>
                                    <AvatarFallback className='text-xs'>
                                       {member.avatar}
                                    </AvatarFallback>
                                 </Avatar>
                                 <div>
                                    <p className='font-medium text-sm text-foreground'>
                                       {member.name}
                                    </p>
                                    <p className='text-xs text-muted-foreground'>
                                       {member.role}
                                    </p>
                                 </div>
                              </div>
                              <Button variant='ghost' size='sm'>
                                 View Profile
                              </Button>
                           </div>
                        ))}
                     </div>
                  </div>
               </TabsContent>

               {/* Projects Tab */}
               <TabsContent value='projects' className='space-y-4'>
                  {group.recentProjects.map((project: any, index: number) => (
                     <div
                        key={index}
                        className='border border-border rounded-lg p-6'
                     >
                        <div className='flex items-start justify-between mb-3'>
                           <h4 className='font-semibold text-foreground text-sm'>
                              {project.name}
                           </h4>
                           <Badge variant='outline' className='text-xs'>
                              {project.status}
                           </Badge>
                        </div>
                        <p className='text-xs text-muted-foreground'>
                           {project.participants} participants
                        </p>
                     </div>
                  ))}
               </TabsContent>

               {/* Announcements Tab */}
               <TabsContent value='announcements' className='space-y-4'>
                  {group.announcements.map(
                     (announcement: any, index: number) => (
                        <div
                           key={index}
                           className='border border-border rounded-lg p-6'
                        >
                           <div className='flex items-start justify-between mb-2'>
                              <h4 className='font-semibold text-foreground text-sm'>
                                 {announcement.title}
                              </h4>
                              <span className='text-xs text-muted-foreground'>
                                 {announcement.date}
                              </span>
                           </div>
                           <p className='text-sm text-muted-foreground'>
                              {announcement.content}
                           </p>
                        </div>
                     )
                  )}
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
}

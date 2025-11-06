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
import {
   BookOpen,
   Calendar,
   Users,
   Video,
   Globe,
   Star,
   Play,
   Share,
   Bookmark,
   MessageSquare,
   Download,
   UserPlus,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

// This would normally come from a database
const getEvent = (id: string) => {
   const events = {
      "neurips-2024": {
         id: "neurips-2024",
         title: "Neural Information Processing Systems 2024",
         subtitle: "NeurIPS 2024",
         description:
            "The premier conference on neural information processing systems, featuring cutting-edge research in machine learning, AI, and computational neuroscience.",
         fullDescription: `
        NeurIPS is one of the top machine learning conferences in the world. This year's conference will feature groundbreaking research presentations, workshops, and networking opportunities for researchers, practitioners, and students in the field of machine learning and artificial intelligence.

        The conference will include keynote presentations from leading researchers, technical paper presentations, poster sessions, workshops, and tutorials. All sessions will be available both live and on-demand for registered participants.
      `,
         type: "Conference",
         format: "Virtual",
         startDate: "2024-12-10",
         endDate: "2024-12-16",
         timezone: "PST",
         attendees: 8500,
         maxAttendees: 10000,
         price: "Free",
         organizer: "NeurIPS Foundation",
         organizerLogo: "/neurips-logo.png",
         tags: ["Machine Learning", "AI", "Neural Networks", "Research"],
         sessions: 156,
         speakersNum: 89,
         posters: 234,
         isLive: false,
         isFeatured: true,
         rating: 4.9,
         reviews: 234,
         image: "/neural-networks-conference-banner.png",
         website: "https://neurips.cc",
         socialLinks: {
            twitter: "@NeurIPS",
            linkedin: "neurips",
         },
         schedule: [
            {
               day: "Day 1 - Dec 10",
               sessions: [
                  {
                     time: "09:00 - 10:00",
                     title: "Opening Keynote: The Future of AI",
                     speaker: "Dr. Yoshua Bengio",
                     type: "Keynote",
                     room: "Main Hall",
                  },
                  {
                     time: "10:30 - 12:00",
                     title: "Deep Learning Advances",
                     speaker: "Multiple Speakers",
                     type: "Session",
                     room: "Track A",
                  },
                  {
                     time: "14:00 - 15:30",
                     title: "Poster Session 1",
                     speaker: "Various Authors",
                     type: "Poster",
                     room: "Virtual Gallery",
                  },
               ],
            },
            {
               day: "Day 2 - Dec 11",
               sessions: [
                  {
                     time: "09:00 - 10:30",
                     title: "Reinforcement Learning Workshop",
                     speaker: "Dr. Richard Sutton",
                     type: "Workshop",
                     room: "Workshop Room 1",
                  },
                  {
                     time: "11:00 - 12:30",
                     title: "Computer Vision and ML",
                     speaker: "Multiple Speakers",
                     type: "Session",
                     room: "Track B",
                  },
               ],
            },
         ],
         speakers: [
            {
               name: "Dr. Yoshua Bengio",
               title: "Professor, University of Montreal",
               bio: "Turing Award winner and pioneer in deep learning",
               image: "/academic-speaker-portrait.png",
            },
            {
               name: "Dr. Fei-Fei Li",
               title: "Professor, Stanford University",
               bio: "Leading researcher in computer vision and AI",
               image: "/academic-speaker-portrait.png",
            },
            {
               name: "Dr. Andrew Ng",
               title: "Founder, Coursera",
               bio: "AI researcher and educator",
               image: "/academic-speaker-portrait.png",
            },
         ],
      },
   };
   return events[id as keyof typeof events];
};

export default async function EventDetailsPage({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   const event = getEvent(id);

   if (!event) {
      return <div>Event not found</div>;
   }

   return (
      <div className='min-h-screen bg-background'>
         {/* Header */}
         <Navbar page='events' />

         {/* Hero Section */}
         <div className='relative'>
            <img
               src={event.image || "/placeholder.svg"}
               alt={event.title}
               className='w-full h-64 md:h-80 object-cover'
            />
            <div className='absolute inset-0 bg-black/50'></div>
            <div className='absolute bottom-0 left-0 right-0 p-8 text-white'>
               <div className='container mx-auto'>
                  <div className='flex items-end justify-between'>
                     <div>
                        <h1 className='text-3xl md:text-4xl font-bold mb-2'>
                           {event.title}
                        </h1>
                        <p className='text-xl mb-4'>{event.subtitle}</p>
                        <div className='flex flex-wrap items-center gap-4'>
                           <Badge className='bg-white/20 text-white border-white/30'>
                              <div className='flex items-center gap-1'>
                                 <Video className='w-4 h-4' />
                                 {event.format}
                              </div>
                           </Badge>
                           <div className='flex items-center gap-1'>
                              <Calendar className='w-4 h-4' />
                              <span>
                                 {event.startDate} - {event.endDate}
                              </span>
                           </div>
                           <div className='flex items-center gap-1'>
                              <Users className='w-4 h-4' />
                              <span>
                                 {event.attendees.toLocaleString()} attendees
                              </span>
                           </div>
                        </div>
                     </div>
                     <div className='flex flex-col gap-2'>
                        <Button
                           size='lg'
                           className='bg-white text-black hover:bg-white/90'
                        >
                           <UserPlus className='w-4 h-4 mr-2' />
                           Register Now
                        </Button>
                        <div className='flex gap-2'>
                           <Button
                              variant='outline'
                              size='sm'
                              className='bg-white/10 border-white/30 text-white'
                           >
                              <Share className='w-4 h-4 mr-2' />
                              Share
                           </Button>
                           <Button
                              variant='outline'
                              size='sm'
                              className='bg-white/10 border-white/30 text-white'
                           >
                              <Bookmark className='w-4 h-4 mr-2' />
                              Save
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className='container mx-auto px-4 py-8'>
            {/* Quick Stats */}
            <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mb-8'>
               <Card>
                  <CardContent className='p-4 text-center'>
                     <div className='text-2xl font-bold text-primary'>
                        {event.sessions}
                     </div>
                     <div className='text-sm text-muted-foreground'>
                        Sessions
                     </div>
                  </CardContent>
               </Card>
               <Card>
                  <CardContent className='p-4 text-center'>
                     <div className='text-2xl font-bold text-primary'>
                        {event.speakersNum}
                     </div>
                     <div className='text-sm text-muted-foreground'>
                        Speakers
                     </div>
                  </CardContent>
               </Card>
               <Card>
                  <CardContent className='p-4 text-center'>
                     <div className='text-2xl font-bold text-primary'>
                        {event.posters}
                     </div>
                     <div className='text-sm text-muted-foreground'>
                        Posters
                     </div>
                  </CardContent>
               </Card>
               <Card>
                  <CardContent className='p-4 text-center'>
                     <div className='text-2xl font-bold text-primary flex items-center justify-center gap-1'>
                        <Star className='w-5 h-5 fill-yellow-400 text-yellow-400' />
                        {event.rating}
                     </div>
                     <div className='text-sm text-muted-foreground'>Rating</div>
                  </CardContent>
               </Card>
               <Card>
                  <CardContent className='p-4 text-center'>
                     <div className='text-2xl font-bold text-primary'>
                        {event.price}
                     </div>
                     <div className='text-sm text-muted-foreground'>
                        Registration
                     </div>
                  </CardContent>
               </Card>
            </div>

            <div className='grid lg:grid-cols-3 gap-8'>
               {/* Main Content */}
               <div className='lg:col-span-2 space-y-6'>
                  <Tabs defaultValue='overview' className='space-y-6'>
                     <TabsList className='grid w-full grid-cols-5'>
                        <TabsTrigger value='overview'>Overview</TabsTrigger>
                        <TabsTrigger value='schedule'>Schedule</TabsTrigger>
                        <TabsTrigger value='speakers'>Speakers</TabsTrigger>
                        <TabsTrigger value='posters'>Posters</TabsTrigger>
                        <TabsTrigger value='networking'>Networking</TabsTrigger>
                     </TabsList>

                     <TabsContent value='overview' className='space-y-6'>
                        <Card>
                           <CardHeader>
                              <CardTitle>About This Event</CardTitle>
                           </CardHeader>
                           <CardContent>
                              <p className='text-muted-foreground leading-relaxed mb-4'>
                                 {event.description}
                              </p>
                              <div className='prose prose-sm max-w-none'>
                                 <div className='whitespace-pre-line text-muted-foreground'>
                                    {event.fullDescription}
                                 </div>
                              </div>
                           </CardContent>
                        </Card>

                        <Card>
                           <CardHeader>
                              <CardTitle>Event Features</CardTitle>
                           </CardHeader>
                           <CardContent>
                              <div className='grid md:grid-cols-2 gap-4'>
                                 <div className='flex items-center gap-3'>
                                    <Video className='w-5 h-5 text-primary' />
                                    <span>Live streaming sessions</span>
                                 </div>
                                 <div className='flex items-center gap-3'>
                                    <MessageSquare className='w-5 h-5 text-primary' />
                                    <span>Interactive Q&A</span>
                                 </div>
                                 <div className='flex items-center gap-3'>
                                    <Users className='w-5 h-5 text-primary' />
                                    <span>Breakout rooms</span>
                                 </div>
                                 <div className='flex items-center gap-3'>
                                    <Globe className='w-5 h-5 text-primary' />
                                    <span>Virtual poster gallery</span>
                                 </div>
                                 <div className='flex items-center gap-3'>
                                    <UserPlus className='w-5 h-5 text-primary' />
                                    <span>Networking lobby</span>
                                 </div>
                                 <div className='flex items-center gap-3'>
                                    <Download className='w-5 h-5 text-primary' />
                                    <span>Session recordings</span>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>

                        <Card>
                           <CardHeader>
                              <CardTitle>Topics & Tags</CardTitle>
                           </CardHeader>
                           <CardContent>
                              <div className='flex flex-wrap gap-2'>
                                 {event.tags.map((tag) => (
                                    <Badge key={tag} variant='outline'>
                                       {tag}
                                    </Badge>
                                 ))}
                              </div>
                           </CardContent>
                        </Card>
                     </TabsContent>

                     <TabsContent value='schedule' className='space-y-4'>
                        {event.schedule.map((day, dayIndex) => (
                           <Card key={dayIndex}>
                              <CardHeader>
                                 <CardTitle>{day.day}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                 <div className='space-y-4'>
                                    {day.sessions.map(
                                       (session, sessionIndex) => (
                                          <div
                                             key={sessionIndex}
                                             className='flex items-start gap-4 p-4 border rounded-lg'
                                          >
                                             <div className='text-sm font-medium text-muted-foreground min-w-[100px]'>
                                                {session.time}
                                             </div>
                                             <div className='flex-1'>
                                                <h4 className='font-medium mb-1'>
                                                   {session.title}
                                                </h4>
                                                <p className='text-sm text-muted-foreground mb-2'>
                                                   {session.speaker}
                                                </p>
                                                <div className='flex items-center gap-2'>
                                                   <Badge
                                                      variant='outline'
                                                      className='text-xs'
                                                   >
                                                      {session.type}
                                                   </Badge>
                                                   <span className='text-xs text-muted-foreground'>
                                                      {session.room}
                                                   </span>
                                                </div>
                                             </div>
                                             <Button
                                                variant='outline'
                                                size='sm'
                                             >
                                                <Play className='w-4 h-4 mr-2' />
                                                Join
                                             </Button>
                                          </div>
                                       )
                                    )}
                                 </div>
                              </CardContent>
                           </Card>
                        ))}
                     </TabsContent>

                     <TabsContent value='speakers' className='space-y-4'>
                        <div className='grid md:grid-cols-2 gap-6'>
                           {event.speakers.map((speaker, index) => (
                              <Card key={index}>
                                 <CardContent className='p-6'>
                                    <div className='flex items-start gap-4'>
                                       <Avatar className='w-16 h-16'>
                                          <AvatarImage
                                             src={
                                                speaker.image ||
                                                "/placeholder.svg"
                                             }
                                          />
                                          <AvatarFallback>
                                             {speaker.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                          </AvatarFallback>
                                       </Avatar>
                                       <div className='flex-1'>
                                          <h3 className='font-semibold text-lg mb-1'>
                                             {speaker.name}
                                          </h3>
                                          <p className='text-muted-foreground mb-2'>
                                             {speaker.title}
                                          </p>
                                          <p className='text-sm text-muted-foreground'>
                                             {speaker.bio}
                                          </p>
                                       </div>
                                    </div>
                                 </CardContent>
                              </Card>
                           ))}
                        </div>
                     </TabsContent>

                     <TabsContent value='posters' className='space-y-4'>
                        <Card>
                           <CardHeader>
                              <CardTitle>Virtual Poster Gallery</CardTitle>
                              <CardDescription>
                                 Interactive poster presentations from
                                 researchers worldwide
                              </CardDescription>
                           </CardHeader>
                           <CardContent>
                              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                 {[...Array(6)].map((_, index) => (
                                    <div
                                       key={index}
                                       className='border rounded-lg p-4 hover:shadow-md transition-shadow'
                                    >
                                       <div className='aspect-3/4 bg-muted rounded mb-3 flex items-center justify-center'>
                                          <span className='text-muted-foreground'>
                                             Poster {index + 1}
                                          </span>
                                       </div>
                                       <h4 className='font-medium text-sm mb-1'>
                                          Deep Learning for Medical Image
                                          Analysis
                                       </h4>
                                       <p className='text-xs text-muted-foreground mb-2'>
                                          Dr. Jane Smith, Harvard Medical School
                                       </p>
                                       <Button
                                          variant='outline'
                                          size='sm'
                                          className='w-full bg-transparent'
                                       >
                                          View Poster
                                       </Button>
                                    </div>
                                 ))}
                              </div>
                           </CardContent>
                        </Card>
                     </TabsContent>

                     <TabsContent value='networking' className='space-y-4'>
                        <Card>
                           <CardHeader>
                              <CardTitle>Networking Opportunities</CardTitle>
                              <CardDescription>
                                 Connect with fellow researchers and industry
                                 professionals
                              </CardDescription>
                           </CardHeader>
                           <CardContent>
                              <div className='space-y-4'>
                                 <div className='p-4 border rounded-lg'>
                                    <h4 className='font-medium mb-2'>
                                       Virtual Networking Lobby
                                    </h4>
                                    <p className='text-sm text-muted-foreground mb-3'>
                                       Join spontaneous video chats with other
                                       attendees in our virtual lobby
                                    </p>
                                    <Button>
                                       <Video className='w-4 h-4 mr-2' />
                                       Enter Lobby
                                    </Button>
                                 </div>
                                 <div className='p-4 border rounded-lg'>
                                    <h4 className='font-medium mb-2'>
                                       Breakout Rooms
                                    </h4>
                                    <p className='text-sm text-muted-foreground mb-3'>
                                       Join topic-specific discussions with
                                       small groups of participants
                                    </p>
                                    <Button variant='outline'>
                                       <Users className='w-4 h-4 mr-2' />
                                       Browse Rooms
                                    </Button>
                                 </div>
                                 <div className='p-4 border rounded-lg'>
                                    <h4 className='font-medium mb-2'>
                                       1-on-1 Meetings
                                    </h4>
                                    <p className='text-sm text-muted-foreground mb-3'>
                                       Schedule private meetings with other
                                       attendees
                                    </p>
                                    <Button variant='outline'>
                                       <Calendar className='w-4 h-4 mr-2' />
                                       Schedule Meeting
                                    </Button>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     </TabsContent>
                  </Tabs>
               </div>

               {/* Sidebar */}
               <div className='space-y-6'>
                  {/* Registration Card */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Event Registration</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-4'>
                           <div className='text-center'>
                              <div className='text-3xl font-bold text-primary mb-2'>
                                 {event.price}
                              </div>
                              <p className='text-sm text-muted-foreground'>
                                 Full conference access
                              </p>
                           </div>
                           <Button className='w-full' size='lg'>
                              <UserPlus className='w-4 h-4 mr-2' />
                              Register Now
                           </Button>
                           <div className='text-xs text-muted-foreground space-y-1'>
                              <p>✓ Access to all sessions</p>
                              <p>✓ Virtual networking</p>
                              <p>✓ Poster gallery access</p>
                              <p>✓ Session recordings</p>
                              <p>✓ Q&A participation</p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Event Details */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Event Details</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-3 text-sm'>
                           <div className='flex items-center gap-2'>
                              <Calendar className='w-4 h-4 text-muted-foreground' />
                              <div>
                                 <p className='font-medium'>
                                    {event.startDate} - {event.endDate}
                                 </p>
                                 <p className='text-muted-foreground'>
                                    Timezone: {event.timezone}
                                 </p>
                              </div>
                           </div>
                           <div className='flex items-center gap-2'>
                              <Video className='w-4 h-4 text-muted-foreground' />
                              <span>{event.format} Event</span>
                           </div>
                           <div className='flex items-center gap-2'>
                              <Users className='w-4 h-4 text-muted-foreground' />
                              <span>
                                 {event.attendees.toLocaleString()} /{" "}
                                 {event.maxAttendees.toLocaleString()}{" "}
                                 registered
                              </span>
                           </div>
                           <div className='flex items-center gap-2'>
                              <Globe className='w-4 h-4 text-muted-foreground' />
                              <Link
                                 href={event.website}
                                 className='text-primary hover:underline'
                              >
                                 Official Website
                              </Link>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Organizer */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Organizer</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='flex items-center gap-3'>
                           <img
                              src={event.organizerLogo || "/placeholder.svg"}
                              alt={event.organizer}
                              className='w-12 h-12 rounded'
                           />
                           <div>
                              <h4 className='font-medium'>{event.organizer}</h4>
                              <p className='text-sm text-muted-foreground'>
                                 Conference Organizer
                              </p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Reviews */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Attendee Reviews</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-4'>
                           <div className='flex items-center gap-2'>
                              <Star className='w-5 h-5 fill-yellow-400 text-yellow-400' />
                              <span className='font-medium'>
                                 {event.rating}
                              </span>
                              <span className='text-sm text-muted-foreground'>
                                 ({event.reviews} reviews)
                              </span>
                           </div>
                           <div className='space-y-3'>
                              {[
                                 {
                                    name: "Dr. Alice Johnson",
                                    rating: 5,
                                    comment:
                                       "Excellent conference with top-quality speakers",
                                 },
                                 {
                                    name: "Prof. Bob Smith",
                                    rating: 5,
                                    comment:
                                       "Great networking opportunities and content",
                                 },
                              ].map((review, index) => (
                                 <div key={index} className='text-sm'>
                                    <div className='flex items-center gap-2 mb-1'>
                                       <span className='font-medium'>
                                          {review.name}
                                       </span>
                                       <div className='flex'>
                                          {[...Array(review.rating)].map(
                                             (_, i) => (
                                                <Star
                                                   key={i}
                                                   className='w-3 h-3 fill-yellow-400 text-yellow-400'
                                                />
                                             )
                                          )}
                                       </div>
                                    </div>
                                    <p className='text-muted-foreground'>
                                       {review.comment}
                                    </p>
                                 </div>
                              ))}
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

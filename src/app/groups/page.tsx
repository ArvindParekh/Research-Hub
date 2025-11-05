import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Users, Search, Plus, BookOpen, MapPin } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
export default function GroupsPage() {
   const groups = [
      {
         id: "ml-research-lab",
         name: "Machine Learning Research Lab",
         description:
            "Collaborative research group focused on deep learning and neural architectures",
         members: 24,
         maxMembers: 50,
         field: "Machine Learning",
         institution: "MIT CSAIL",
         leader: "Dr. Sarah Chen",
         topics: ["Deep Learning", "Neural Networks", "Computer Vision"],
         isJoined: false,
      },
      {
         id: "quantum-computing-collective",
         name: "Quantum Computing Collective",
         description:
            "International group exploring quantum algorithms and quantum information theory",
         members: 18,
         maxMembers: 30,
         field: "Quantum Computing",
         institution: "Multiple",
         leader: "Prof. Michael Rodriguez",
         topics: [
            "Quantum Algorithms",
            "Quantum Hardware",
            "Quantum Information",
         ],
         isJoined: true,
      },
      {
         id: "neuroscience-consortium",
         name: "Neuroscience Research Consortium",
         description:
            "Advancing brain imaging analysis and computational neuroscience",
         members: 32,
         maxMembers: 60,
         field: "Neuroscience",
         institution: "Harvard Medical School",
         leader: "Dr. Emily Johnson",
         topics: [
            "Brain Imaging",
            "Computational Neuroscience",
            "Neural Modeling",
         ],
         isJoined: false,
      },
   ];

   return (
      <div className='min-h-screen bg-background'>
         {/* Header */}
         <Navbar />
         {/* <header className='border-b border-border bg-card'>
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
                  <nav className='hidden md:flex items-center gap-6 text-sm'>
                     <Link
                        href='/profiles'
                        className='text-muted-foreground hover:text-foreground transition-colors'
                     >
                        Researchers
                     </Link>
                     <Link href='/groups' className='text-primary font-medium'>
                        Groups
                     </Link>
                     <Link
                        href='/repository'
                        className='text-muted-foreground hover:text-foreground transition-colors'
                     >
                        Repository
                     </Link>
                     <Link
                        href='/jobs'
                        className='text-muted-foreground hover:text-foreground transition-colors'
                     >
                        Jobs
                     </Link>
                     <Link
                        href='/events'
                        className='text-muted-foreground hover:text-foreground transition-colors'
                     >
                        Events
                     </Link>
                  </nav>
                  <Button asChild>
                     <Link href='/groups/create'>
                        <Plus className='w-4 h-4 mr-2' />
                        Create Group
                     </Link>
                  </Button>
               </div>
            </div>
         </header> */}

         <div className='container mx-auto px-4 py-8'>
            {/* Page Header */}
            <div className='mb-8'>
               <h1 className='text-3xl font-bold mb-2'>Research Groups</h1>
               <p className='text-muted-foreground'>
                  Join collaborative research groups and connect with peers in
                  your field
               </p>
            </div>

            {/* Search and Filters */}
            <div className='grid md:grid-cols-3 gap-4 mb-8'>
               <div className='relative md:col-span-2'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                  <Input
                     placeholder='Search groups by name or field...'
                     className='pl-10'
                  />
               </div>
               <Select>
                  <SelectTrigger>
                     <SelectValue placeholder='Research Field' />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value='all'>All Fields</SelectItem>
                     <SelectItem value='ml'>Machine Learning</SelectItem>
                     <SelectItem value='quantum'>Quantum Computing</SelectItem>
                     <SelectItem value='neuro'>Neuroscience</SelectItem>
                  </SelectContent>
               </Select>
            </div>

            {/* Groups Grid */}
            <div className='grid gap-6'>
               {groups.map((group) => (
                  <Card
                     key={group.id}
                     className='hover:border-primary/20 transition-colors'
                  >
                     <CardHeader>
                        <div className='flex items-start justify-between'>
                           <div className='flex-1'>
                              <div className='flex items-center gap-3 mb-2'>
                                 <CardTitle className='text-lg'>
                                    <Link
                                       href={`/groups/${group.id}`}
                                       className='hover:text-primary transition-colors'
                                    >
                                       {group.name}
                                    </Link>
                                 </CardTitle>
                                 {group.isJoined && (
                                    <Badge variant='outline'>Joined</Badge>
                                 )}
                              </div>
                              <CardDescription className='mb-4 line-clamp-2'>
                                 {group.description}
                              </CardDescription>

                              <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4'>
                                 <div className='flex items-center gap-2'>
                                    <MapPin className='w-4 h-4' />
                                    {group.institution}
                                 </div>
                                 <div className='flex items-center gap-2'>
                                    <Users className='w-4 h-4' />
                                    {group.members}/{group.maxMembers} members
                                 </div>
                                 <Badge variant='secondary' className='text-xs'>
                                    {group.field}
                                 </Badge>
                              </div>

                              <div className='flex flex-wrap gap-2 mb-4'>
                                 {group.topics.map((topic) => (
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
                        </div>
                     </CardHeader>
                     <CardContent>
                        <div className='flex items-center justify-between'>
                           <p className='text-sm text-muted-foreground'>
                              Led by {group.leader}
                           </p>
                           <Button
                              asChild
                              variant={group.isJoined ? "outline" : "default"}
                           >
                              <Link href={`/groups/${group.id}`}>
                                 {group.isJoined ? "View Group" : "Join Group"}
                              </Link>
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      </div>
   );
}

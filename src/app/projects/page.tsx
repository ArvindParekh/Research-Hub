import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   BookOpen,
   Plus,
   Calendar,
   Users,
   CheckCircle,
   Clock,
   AlertCircle,
   Search,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
export default function ProjectsPage() {
   const projects = [
      {
         id: "neural-arch",
         title: "Neural Architecture Search Optimization",
         description:
            "Developing automated methods for discovering optimal neural network architectures",
         status: "active",
         progress: 75,
         dueDate: "2024-03-15",
         team: [
            { name: "Dr. Sarah Chen", role: "Lead" },
            { name: "Alex Thompson", role: "PhD Student" },
            { name: "Maria Garcia", role: "Research Assistant" },
         ],
         tasks: {
            total: 24,
            completed: 18,
            inProgress: 4,
            todo: 2,
         },
         tags: ["Machine Learning", "Neural Networks", "Optimization"],
      },
      {
         id: "quantum-sim",
         title: "Quantum Circuit Simulation",
         description:
            "Building efficient simulators for quantum computing algorithms",
         status: "active",
         progress: 45,
         dueDate: "2024-04-20",
         team: [
            { name: "Prof. Michael Rodriguez", role: "Lead" },
            { name: "James Liu", role: "Masters Student" },
         ],
         tasks: {
            total: 18,
            completed: 8,
            inProgress: 6,
            todo: 4,
         },
         tags: ["Quantum Computing", "Simulation", "Algorithms"],
      },
      {
         id: "brain-imaging",
         title: "Advanced Brain Imaging Analysis",
         description:
            "Developing AI methods for analyzing complex brain imaging data",
         status: "planning",
         progress: 15,
         dueDate: "2024-06-30",
         team: [
            { name: "Dr. Emily Johnson", role: "Lead" },
            { name: "Lisa Wang", role: "Postdoc" },
            { name: "Robert Kim", role: "PhD Student" },
         ],
         tasks: {
            total: 32,
            completed: 5,
            inProgress: 2,
            todo: 25,
         },
         tags: ["Neuroscience", "Medical Imaging", "AI"],
      },
   ];

   const recentTasks = [
      {
         id: 1,
         title: "Complete literature review on NAS methods",
         project: "Neural Architecture Search",
         assignee: "Alex Thompson",
         status: "completed",
         dueDate: "2024-01-15",
      },
      {
         id: 2,
         title: "Implement quantum gate optimization",
         project: "Quantum Circuit Simulation",
         assignee: "James Liu",
         status: "in-progress",
         dueDate: "2024-01-20",
      },
      {
         id: 3,
         title: "Prepare dataset for brain imaging analysis",
         project: "Advanced Brain Imaging",
         assignee: "Lisa Wang",
         status: "todo",
         dueDate: "2024-01-25",
      },
      {
         id: 4,
         title: "Write paper draft for NAS optimization",
         project: "Neural Architecture Search",
         assignee: "Dr. Sarah Chen",
         status: "in-progress",
         dueDate: "2024-01-30",
      },
   ];

   const getStatusColor = (status: string) => {
      switch (status) {
         case "active":
            return "bg-green-500";
         case "planning":
            return "bg-yellow-500";
         case "completed":
            return "bg-blue-500";
         case "on-hold":
            return "bg-gray-500";
         default:
            return "bg-gray-500";
      }
   };

   const getTaskStatusIcon = (status: string) => {
      switch (status) {
         case "completed":
            return <CheckCircle className='w-4 h-4 text-green-500' />;
         case "in-progress":
            return <Clock className='w-4 h-4 text-yellow-500' />;
         case "todo":
            return <AlertCircle className='w-4 h-4 text-gray-500' />;
         default:
            return <Clock className='w-4 h-4 text-gray-500' />;
      }
   };

   return (
      <div className='min-h-screen bg-background'>
         <Navbar page='projects' />
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
                        href='/messages'
                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                     >
                        Messages
                     </Link>
                     <Link
                        href='/projects'
                        className='text-sm font-medium text-primary'
                     >
                        Projects
                     </Link>
                  </nav>
                  <Button asChild size='sm'>
                     <Link href='/projects/new'>
                        <Plus className='w-4 h-4 mr-2' />
                        New Project
                     </Link>
                  </Button>
               </div>
            </div>
         </header> */}

         <div className='container mx-auto px-4 py-12'>
            <div className='mb-10'>
               <h1 className='text-4xl font-semibold mb-3'>Projects</h1>
               <p className='text-muted-foreground'>
                  Manage and track your research projects
               </p>
            </div>

            <Tabs defaultValue='projects' className='space-y-6'>
               <TabsList>
                  <TabsTrigger value='projects' className='text-sm'>
                     All Projects
                  </TabsTrigger>
                  <TabsTrigger value='tasks' className='text-sm'>
                     Tasks
                  </TabsTrigger>
                  <TabsTrigger value='calendar' className='text-sm'>
                     Calendar
                  </TabsTrigger>
               </TabsList>

               <TabsContent value='projects' className='space-y-6'>
                  <div className='flex items-center gap-4'>
                     <div className='relative flex-1 max-w-md'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                        <input
                           placeholder='Search projects...'
                           className='w-full pl-10 pr-4 py-2 text-sm border border-border rounded-lg bg-background'
                        />
                     </div>
                  </div>

                  <div className='grid gap-5'>
                     {projects.map((project) => (
                        <div
                           key={project.id}
                           className='border border-border rounded-lg p-6 hover:border-primary/20 transition-colors'
                        >
                           <div className='flex items-start justify-between mb-4'>
                              <div className='flex-1'>
                                 <div className='flex items-center gap-3 mb-2'>
                                    <h3 className='font-semibold text-foreground'>
                                       <Link
                                          href={`/projects/${project.id}`}
                                          className='hover:text-primary transition-colors'
                                       >
                                          {project.title}
                                       </Link>
                                    </h3>
                                    <Badge
                                       variant='outline'
                                       className='text-xs capitalize'
                                    >
                                       {project.status}
                                    </Badge>
                                 </div>
                                 <p className='text-sm text-muted-foreground mb-3'>
                                    {project.description}
                                 </p>

                                 {/* Progress Bar */}
                                 <div className='mb-3'>
                                    <div className='flex items-center justify-between mb-1'>
                                       <span className='text-xs font-medium text-muted-foreground'>
                                          Progress
                                       </span>
                                       <span className='text-xs text-muted-foreground'>
                                          {project.progress}%
                                       </span>
                                    </div>
                                    <div className='w-full bg-muted rounded-full h-1.5'>
                                       <div
                                          className='bg-primary h-1.5 rounded-full'
                                          style={{
                                             width: `${project.progress}%`,
                                          }}
                                       ></div>
                                    </div>
                                 </div>

                                 {/* Tags */}
                                 <div className='flex flex-wrap gap-2 mb-4'>
                                    {project.tags.map((tag) => (
                                       <Badge
                                          key={tag}
                                          variant='outline'
                                          className='text-xs'
                                       >
                                          {tag}
                                       </Badge>
                                    ))}
                                 </div>
                              </div>
                           </div>

                           {/* Footer */}
                           <div className='flex items-center justify-between pt-4 border-t border-border'>
                              <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                                 <div className='flex items-center gap-1'>
                                    <Users className='w-4 h-4' />
                                    <span>{project.team.length} members</span>
                                 </div>
                                 <div className='flex items-center gap-1'>
                                    <Calendar className='w-4 h-4' />
                                    <span>Due {project.dueDate}</span>
                                 </div>
                              </div>
                              <Button variant='ghost' size='sm' asChild>
                                 <Link href={`/projects/${project.id}`}>
                                    View
                                 </Link>
                              </Button>
                           </div>
                        </div>
                     ))}
                  </div>
               </TabsContent>

               <TabsContent value='tasks' className='space-y-4'>
                  <div className='space-y-3'>
                     {recentTasks.map((task) => (
                        <div
                           key={task.id}
                           className='border border-border rounded-lg p-4 hover:border-primary/20 transition-colors'
                        >
                           <div className='flex items-center justify-between'>
                              <div className='flex items-center gap-3'>
                                 {getTaskStatusIcon(task.status)}
                                 <div>
                                    <h4 className='font-medium text-foreground text-sm'>
                                       {task.title}
                                    </h4>
                                    <p className='text-xs text-muted-foreground'>
                                       {task.project} • {task.assignee}
                                    </p>
                                 </div>
                              </div>
                              <span className='text-xs text-muted-foreground'>
                                 {task.dueDate}
                              </span>
                           </div>
                        </div>
                     ))}
                  </div>
               </TabsContent>

               <TabsContent value='calendar'>
                  <div className='border border-border rounded-lg p-6'>
                     <h3 className='font-semibold text-foreground mb-2'>
                        Project Calendar
                     </h3>
                     <p className='text-sm text-muted-foreground'>
                        Calendar view for project timelines and deadlines
                     </p>
                  </div>
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
}

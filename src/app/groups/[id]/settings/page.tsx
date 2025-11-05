import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GroupSettingsPage({
   params,
}: {
   params: { id: string };
}) {
   return (
      <div className='min-h-screen bg-background'>
         {/* Header */}
         <header className='border-b border-border bg-card'>
            <div className='container mx-auto px-4 py-4'>
               <div className='flex items-center justify-between'>
                  <Link href='/' className='flex items-center gap-2'>
                     <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                        <BookOpen className='w-5 h-5 text-primary-foreground' />
                     </div>
                     <h1 className='text-xl font-bold text-foreground'>
                        Academic Nexus
                     </h1>
                  </Link>
               </div>
            </div>
         </header>

         <div className='container mx-auto px-4 py-8'>
            {/* Back Button */}
            <Link
               href={`/groups/${params.id}`}
               className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6'
            >
               <ArrowLeft className='w-4 h-4' />
               Back to Group
            </Link>

            {/* Page Header */}
            <div className='mb-8'>
               <h1 className='text-3xl font-semibold mb-2'>Group Settings</h1>
               <p className='text-muted-foreground'>
                  Manage group information and preferences
               </p>
            </div>

            {/* Settings Layout */}
            <div className='grid md:grid-cols-3 gap-8'>
               {/* Sidebar Navigation */}
               <div className='md:col-span-1'>
                  <nav className='space-y-1 border border-border rounded-lg p-3'>
                     <button className='w-full text-left px-3 py-2 text-sm font-medium text-primary bg-muted rounded transition-colors'>
                        General
                     </button>
                     <button className='w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors'>
                        Members
                     </button>
                     <button className='w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors'>
                        Privacy
                     </button>
                     <button className='w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors'>
                        Notifications
                     </button>
                     <button className='w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors'>
                        Delete Group
                     </button>
                  </nav>
               </div>

               {/* Main Content */}
               <div className='md:col-span-2 space-y-6'>
                  {/* General Settings */}
                  <div className='border border-border rounded-lg p-6'>
                     <h3 className='font-semibold text-foreground mb-6'>
                        General Information
                     </h3>

                     <div className='space-y-6'>
                        {/* Group Name */}
                        <div>
                           <label className='block text-sm font-medium text-foreground mb-2'>
                              Group Name
                           </label>
                           <Input
                              placeholder='Enter group name'
                              defaultValue='Machine Learning Research Lab'
                           />
                        </div>

                        {/* Description */}
                        <div>
                           <label className='block text-sm font-medium text-foreground mb-2'>
                              Description
                           </label>
                           <Textarea
                              placeholder='Enter group description'
                              className='min-h-24'
                              defaultValue='Collaborative research group focused on deep learning and neural architectures'
                           />
                        </div>

                        {/* Institution */}
                        <div>
                           <label className='block text-sm font-medium text-foreground mb-2'>
                              Institution
                           </label>
                           <Input
                              placeholder='Enter institution'
                              defaultValue='MIT CSAIL'
                           />
                        </div>

                        {/* Research Field */}
                        <div>
                           <label className='block text-sm font-medium text-foreground mb-2'>
                              Research Field
                           </label>
                           <Input
                              placeholder='Enter research field'
                              defaultValue='Machine Learning'
                           />
                        </div>

                        {/* Max Members */}
                        <div>
                           <label className='block text-sm font-medium text-foreground mb-2'>
                              Maximum Members
                           </label>
                           <Input
                              type='number'
                              placeholder='Enter max members'
                              defaultValue='50'
                           />
                        </div>

                        {/* Topics/Tags */}
                        <div>
                           <label className='block text-sm font-medium text-foreground mb-2'>
                              Research Topics
                           </label>
                           <div className='flex flex-wrap gap-2 mb-3'>
                              {[
                                 "Deep Learning",
                                 "Neural Networks",
                                 "Computer Vision",
                              ].map((topic) => (
                                 <Badge
                                    key={topic}
                                    variant='outline'
                                    className='text-xs'
                                 >
                                    {topic}
                                 </Badge>
                              ))}
                           </div>
                           <Input placeholder='Add new topic...' />
                        </div>

                        {/* Save Button */}
                        <div className='flex justify-end pt-6'>
                           <Button>Save Changes</Button>
                        </div>
                     </div>
                  </div>

                  {/* Danger Zone */}
                  <div className='border border-red-200 rounded-lg p-6 bg-red-50/30'>
                     <h3 className='font-semibold text-red-700 mb-3'>
                        Danger Zone
                     </h3>
                     <p className='text-sm text-muted-foreground mb-4'>
                        Deleting this group will permanently remove all
                        associated data. This action cannot be undone.
                     </p>
                     <Button variant='destructive' size='sm'>
                        Delete Group
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

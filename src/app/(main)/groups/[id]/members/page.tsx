import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

const getMemberData = () => ({
   members: [
      {
         id: 1,
         name: "Dr. Sarah Chen",
         role: "Founder & Lead",
         institution: "MIT CSAIL",
         joined: "2021",
      },
      {
         id: 2,
         name: "Prof. John Smith",
         role: "Senior Researcher",
         institution: "MIT CSAIL",
         joined: "2021",
      },
      {
         id: 3,
         name: "Alex Thompson",
         role: "PhD Student",
         institution: "MIT",
         joined: "2023",
      },
      {
         id: 4,
         name: "Maria Garcia",
         role: "Research Assistant",
         institution: "MIT",
         joined: "2023",
      },
      {
         id: 5,
         name: "James Liu",
         role: "Masters Student",
         institution: "MIT",
         joined: "2024",
      },
      {
         id: 6,
         name: "Lisa Wang",
         role: "Postdoc",
         institution: "MIT CSAIL",
         joined: "2023",
      },
   ],
});

export default async function GroupMembersPage({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   const data = getMemberData();

   return (
      <div className='min-h-screen bg-background'>
         {/* Header */}
         <Navbar page='groups' />

         <div className='container mx-auto px-4 py-8'>
            {/* Back Button */}
            <Link
               href={`/groups/${id}`}
               className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6'
            >
               <ArrowLeft className='w-4 h-4' />
               Back to Group
            </Link>

            {/* Page Header */}
            <div className='mb-8'>
               <h1 className='text-3xl font-semibold mb-2'>Group Members</h1>
               <p className='text-muted-foreground'>
                  View and manage all group members
               </p>
            </div>

            {/* Search and Filter */}
            <div className='grid md:grid-cols-3 gap-4 mb-8'>
               <div className='relative md:col-span-2'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                  <Input placeholder='Search members...' className='pl-10' />
               </div>
               <Select>
                  <SelectTrigger>
                     <SelectValue placeholder='Filter by role' />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value='all'>All Roles</SelectItem>
                     <SelectItem value='lead'>Lead</SelectItem>
                     <SelectItem value='researcher'>Researcher</SelectItem>
                     <SelectItem value='student'>Student</SelectItem>
                  </SelectContent>
               </Select>
            </div>

            {/* Members List */}
            <div className='space-y-3'>
               {data.members.map((member) => (
                  <div
                     key={member.id}
                     className='border border-border rounded-lg p-4 hover:border-primary/20 transition-colors'
                  >
                     <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                           <Avatar className='w-10 h-10'>
                              <AvatarFallback className='text-xs'>
                                 {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                              </AvatarFallback>
                           </Avatar>
                           <div className='flex-1'>
                              <p className='font-medium text-foreground text-sm'>
                                 {member.name}
                              </p>
                              <p className='text-xs text-muted-foreground'>
                                 {member.role} • {member.institution} • Joined{" "}
                                 {member.joined}
                              </p>
                           </div>
                        </div>
                        <Button variant='ghost' size='sm'>
                           View Profile
                        </Button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

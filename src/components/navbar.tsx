import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { stackServerApp } from "@/stack/server";

export default async function Navbar() {
   const user = await stackServerApp.getUser();
   let loggedIn = !!user;

   return (
      <header className='border-b border-border bg-card'>
         <div className='container mx-auto px-4 py-6'>
            <div className='flex items-center justify-between'>
               <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-primary rounded flex items-center justify-center'>
                     <BookOpen className='w-4 h-4 text-primary-foreground' />
                  </div>
                  <h1 className='text-lg font-semibold text-foreground'>
                     Research Hub
                  </h1>
               </div>
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
                  <Link
                     href='/jobs'
                     className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                     Jobs
                  </Link>
                  <Link
                     href='/events'
                     className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                     Events
                  </Link>
                  <Link
                     href='/messages'
                     className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                     Message Center
                  </Link>
               </nav>
               <div className='flex items-center gap-3'>
                  {loggedIn ? (
                     <Button asChild className='text-sm'>
                        <Link href='/logout'>Logout</Link>
                     </Button>
                  ) : (
                     <>
                        <Button
                           variant='outline'
                           asChild
                           className='text-sm bg-transparent'
                        >
                           <Link href='/login'>Sign In</Link>
                        </Button>
                        <Button asChild className='text-sm'>
                           <Link href='/register'>Join Now</Link>
                        </Button>
                     </>
                  )}
                  <ModeToggle />
               </div>
            </div>
         </div>
      </header>
   );
}

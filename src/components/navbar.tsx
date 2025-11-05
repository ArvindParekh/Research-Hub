import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { stackServerApp } from "@/stack/server";
import { NavbarPage } from "@/lib/types";
import { navbarConfig, getActiveLinkClassName } from "@/lib/navbar-config";

export default async function Navbar({ page = "home" }: { page?: NavbarPage }) {
   const user = await stackServerApp.getUser();
   const loggedIn = !!user;
   const config = navbarConfig[page];

   return (
      <header className='border-b border-border bg-card'>
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
                  {config.links.map((link) => (
                     <Link
                        key={link.href}
                        href={link.href}
                        className={getActiveLinkClassName(link.href, page)}
                     >
                        {link.label}
                     </Link>
                  ))}
               </nav>
               <div className='flex items-center gap-3'>
                  {config.buttons.map((button) => {
                     const Icon = button.icon;
                     return (
                        <Button
                           key={button.href}
                           variant={button.variant || "default"}
                           size={button.size || "default"}
                           asChild={button.href !== "#"}
                           className='text-sm'
                        >
                           {button.href === "#" ? (
                              <span className='flex items-center'>
                                 {Icon && <Icon className='w-4 h-4 mr-2' />}
                                 {button.label}
                              </span>
                           ) : (
                              <Link
                                 href={button.href}
                                 className='flex items-center'
                              >
                                 {Icon && <Icon className='w-4 h-4 mr-2' />}
                                 {button.label}
                              </Link>
                           )}
                        </Button>
                     );
                  })}
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

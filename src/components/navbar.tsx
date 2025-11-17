import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { BookOpen, User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { stackServerApp } from "@/stack/server";
import { NavbarPage } from "@/lib/types";
import { navbarConfig, getActiveLinkClassName } from "@/lib/navbar-config";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
                  {loggedIn &&
                     config.links.map((link) => (
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
                     const isIconOnly = !button.label && Icon;
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
                                 {Icon && (
                                    <Icon
                                       className={`w-4 h-4 ${
                                          isIconOnly ? "" : "mr-2"
                                       }`}
                                    />
                                 )}
                                 {button.label}
                              </span>
                           ) : (
                              <Link
                                 href={button.href}
                                 className='flex items-center'
                              >
                                 {Icon && (
                                    <Icon
                                       className={`w-4 h-4 ${
                                          isIconOnly ? "" : "mr-2"
                                       }`}
                                    />
                                 )}
                                 {button.label}
                              </Link>
                           )}
                        </Button>
                     );
                  })}
                  <ModeToggle />
                  {loggedIn ? (
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button
                              variant='ghost'
                              className='relative h-8 w-8 rounded-full'
                           >
                              <Avatar className='w-8 h-8 rounded-full'>
                                 <AvatarImage
                                    src='https://github.com/shadcn.png'
                                    alt='@shadcn'
                                 />
                                 <AvatarFallback className='text-xs'>
                                    CN
                                 </AvatarFallback>
                              </Avatar>
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                           className='w-56'
                           align='end'
                           forceMount
                        >
                           <DropdownMenuLabel className='font-normal'>
                              <div className='flex flex-col space-y-1'>
                                 <p className='text-sm font-medium leading-none'>
                                    {user.displayName}
                                 </p>
                                 <p className='text-xs leading-none text-muted-foreground'>
                                    {user.primaryEmail}
                                 </p>
                              </div>
                           </DropdownMenuLabel>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem asChild>
                              <Link
                                 href='/user'
                                 className='cursor-pointer flex items-center'
                              >
                                 <User className='mr-2 h-4 w-4' />
                                 <span>Profile</span>
                              </Link>
                           </DropdownMenuItem>
                           <DropdownMenuItem asChild>
                              <Link
                                 href='/user/settings'
                                 className='cursor-pointer flex items-center'
                              >
                                 <Settings className='mr-2 h-4 w-4' />
                                 <span>Settings</span>
                              </Link>
                           </DropdownMenuItem>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem asChild>
                              <Link
                                 href='/handler/sign-out'
                                 className='cursor-pointer flex items-center'
                              >
                                 <LogOut className='mr-2 h-4 w-4' />
                                 <span>Logout</span>
                              </Link>
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  ) : (
                     <>
                        <Button
                           variant='outline'
                           asChild
                           className='text-sm bg-transparent'
                        >
                           <Link href='/handler/sign-in'>Sign In</Link>
                        </Button>
                        <Button asChild className='text-sm'>
                           <Link href='/handler/sign-up'>Join Now</Link>
                        </Button>
                     </>
                  )}
               </div>
            </div>
         </div>
      </header>
   );
}

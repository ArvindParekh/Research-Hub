import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default function AboutPage() {
   return (
      <div className='min-h-screen bg-background'>
         {/* Header */}
         <Navbar page='home' />

         <div className='container mx-auto px-4 py-12'>
            <div className='max-w-3xl mx-auto'>
               <h1 className='text-4xl font-bold mb-6 text-foreground'>
                  About Research Hub
               </h1>

               <div className='space-y-8 text-muted-foreground leading-relaxed'>
                  <p className='text-lg text-foreground'>
                     Research Hub is a modern platform designed to connect
                     researchers, facilitate collaboration, and advance
                     scientific discovery.
                  </p>

                  <section>
                     <h2 className='text-2xl font-semibold mb-3 text-foreground'>
                        Our Mission
                     </h2>
                     <p>
                        We believe that groundbreaking research thrives when
                        researchers can easily connect, collaborate, and share
                        their work. Research Hub is built to break down silos
                        between disciplines and institutions, enabling
                        researchers worldwide to find collaborators, share
                        research, and advance their careers.
                     </p>
                  </section>

                  <section>
                     <h2 className='text-2xl font-semibold mb-3 text-foreground'>
                        What We Offer
                     </h2>
                     <ul className='list-disc list-inside space-y-2 ml-4'>
                        <li>Researcher profiles and discovery platform</li>
                        <li>Preprint repository with version control</li>
                        <li>Research group collaboration tools</li>
                        <li>Academic job board and career opportunities</li>
                        <li>Events and conferences platform</li>
                        <li>Real-time collaboration features</li>
                     </ul>
                  </section>

                  <section>
                     <h2 className='text-2xl font-semibold mb-3 text-foreground'>
                        Our Values
                     </h2>
                     <p>
                        We're committed to openness, inclusivity, and
                        accessibility in academic research. We believe in the
                        power of collaboration and are dedicated to building a
                        platform that serves researchers of all disciplines and
                        career stages.
                     </p>
                  </section>

                  <div className='pt-6'>
                     <Button asChild>
                        <Link href='/handler/sign-up'>Join the Community</Link>
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

import { BookOpen } from "lucide-react";
import Link from "next/link";
// import Navbar from "@/components/navbar";

export default function TermsPage() {
   return (
      <div className='min-h-screen bg-background'>
         {/* Header */}
         {/* <Navbar /> */}
         <header className='border-b border-border bg-card'>
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
               </div>
            </div>
         </header>

         <div className='container mx-auto px-4 py-12'>
            <div className='max-w-3xl mx-auto'>
               <h1 className='text-4xl font-bold mb-6 text-foreground'>
                  Terms of Service
               </h1>
               <div className='prose prose-sm text-muted-foreground space-y-6'>
                  <section>
                     <h2 className='text-2xl font-semibold mb-3 text-foreground'>
                        Agreement
                     </h2>
                     <p>
                        By accessing and using Research Hub, you accept and
                        agree to be bound by the terms and provision of this
                        agreement.
                     </p>
                  </section>

                  <section>
                     <h2 className='text-2xl font-semibold mb-3 text-foreground'>
                        Use License
                     </h2>
                     <p>
                        Permission is granted to temporarily download one copy
                        of the materials (information or software) on Research
                        Hub for personal, non-commercial transitory viewing
                        only. This is the grant of a license, not a transfer of
                        title, and under this license you may not:
                     </p>
                     <ul className='list-disc list-inside space-y-2 ml-4 mt-3'>
                        <li>Modifying or copying the materials</li>
                        <li>
                           Using the materials for any commercial purpose or for
                           any public display
                        </li>
                        <li>
                           Attempting to decompile or reverse engineer any
                           software contained on the platform
                        </li>
                        <li>
                           Transferring the materials to another person or
                           "mirroring" the materials on any other server
                        </li>
                     </ul>
                  </section>

                  <section>
                     <h2 className='text-2xl font-semibold mb-3 text-foreground'>
                        Disclaimer
                     </h2>
                     <p>
                        The materials on Research Hub are provided on an 'as is'
                        basis. Research Hub makes no warranties, expressed or
                        implied, and hereby disclaims and negates all other
                        warranties including, without limitation, implied
                        warranties or conditions of merchantability, fitness for
                        a particular purpose, or non-infringement of
                        intellectual property or other violation of rights.
                     </p>
                  </section>

                  <section>
                     <h2 className='text-2xl font-semibold mb-3 text-foreground'>
                        Limitations
                     </h2>
                     <p>
                        In no event shall Research Hub or its suppliers be
                        liable for any damages (including, without limitation,
                        damages for loss of data or profit, or due to business
                        interruption) arising out of the use or inability to use
                        the materials on Research Hub.
                     </p>
                  </section>

                  <section>
                     <h2 className='text-2xl font-semibold mb-3 text-foreground'>
                        Revisions
                     </h2>
                     <p>
                        The materials appearing on Research Hub could include
                        technical, typographical, or photographic errors.
                        Research Hub does not warrant that any of the materials
                        on its website are accurate, complete, or current.
                        Research Hub may make changes to the materials contained
                        on its website at any time without notice.
                     </p>
                  </section>

                  <section>
                     <h2 className='text-2xl font-semibold mb-3 text-foreground'>
                        Contact Information
                     </h2>
                     <p>
                        If you have any questions about these Terms of Service,
                        please contact us at terms@academicnexus.com.
                     </p>
                  </section>
               </div>
            </div>
         </div>
      </div>
   );
}

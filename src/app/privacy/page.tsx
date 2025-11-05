import { BookOpen } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default function PrivacyPage() {
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
               </div>
            </div>
         </header> */}

         <div className='container mx-auto px-4 py-12'>
            <div className='max-w-3xl mx-auto'>
               <h1 className='text-4xl font-bold mb-6 text-foreground'>
                  Privacy Policy
               </h1>
               <div className='prose prose-sm text-muted-foreground space-y-6'>
                  <section>
                     <h2 className='text-2xl font-semibold mb-3 text-foreground'>
                        Introduction
                     </h2>
                     <p>
                        Research Hub ("we," "us," "our," or "Company") is
                        committed to protecting your privacy. This Privacy
                        Policy explains how we collect, use, disclose, and
                        safeguard your information.
                     </p>
                  </section>

                  <section>
                     <h2 className='text-2xl font-semibold mb-3 text-foreground'>
                        Information We Collect
                     </h2>
                     <p>
                        We collect information you provide directly to us, such
                        as when you create an account, complete your profile,
                        upload research papers, or contact us for support.
                     </p>
                     <ul className='list-disc list-inside space-y-2 ml-4 mt-3'>
                        <li>
                           Personal identification information (name, email,
                           institution)
                        </li>
                        <li>
                           Professional information (research field,
                           publications, affiliations)
                        </li>
                        <li>
                           Communication data (messages, comments, feedback)
                        </li>
                     </ul>
                  </section>

                  <section>
                     <h2 className='text-2xl font-semibold mb-3 text-foreground'>
                        How We Use Your Information
                     </h2>
                     <p>
                        We use the information we collect to operate and improve
                        our platform, provide personalized recommendations,
                        facilitate collaboration, and communicate with you.
                     </p>
                  </section>

                  <section>
                     <h2 className='text-2xl font-semibold mb-3 text-foreground'>
                        Data Security
                     </h2>
                     <p>
                        We implement appropriate technical and organizational
                        measures to protect your personal information against
                        unauthorized access, alteration, disclosure, or
                        destruction.
                     </p>
                  </section>

                  <section>
                     <h2 className='text-2xl font-semibold mb-3 text-foreground'>
                        Your Rights
                     </h2>
                     <p>
                        You have the right to access, update, or delete your
                        personal information at any time by logging into your
                        account or contacting us directly.
                     </p>
                  </section>

                  <section>
                     <h2 className='text-2xl font-semibold mb-3 text-foreground'>
                        Contact Us
                     </h2>
                     <p>
                        If you have any questions about this Privacy Policy,
                        please contact us at privacy@academicnexus.com.
                     </p>
                  </section>
               </div>
            </div>
         </div>
      </div>
   );
}

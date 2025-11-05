import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Search } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
export default function HelpPage() {
   const faqItems = [
      {
         question: "How do I create a research profile?",
         answer:
            "Sign up with your email, add your basic information, research field, and publications. You can customize your profile with your research interests and collaborators.",
      },
      {
         question: "How can I submit a research paper?",
         answer:
            "Navigate to the Repository section and click 'Submit Paper'. Upload your PDF, add metadata like title, abstract, and authors, then publish.",
      },
      {
         question: "How do I join a research group?",
         answer:
            "Browse research groups in the Groups section. Click on a group that interests you and request to join. Group leaders will review your request.",
      },
      {
         question: "Can I collaborate with other researchers in real-time?",
         answer:
            "Yes! Use our whiteboard feature, real-time messaging, and project collaboration tools to work with other researchers.",
      },
      {
         question: "How do I apply for academic jobs?",
         answer:
            "Browse the Jobs section, find positions that match your profile, and click 'Apply with Profile' to submit your application instantly.",
      },
      {
         question: "Is there a way to get research recommendations?",
         answer:
            "Yes, our AI-powered recommendations learn from your interests and activity to suggest relevant papers, researchers, and opportunities.",
      },
   ];

   return (
      <div className='min-h-screen bg-background'>
         {/* Header */}
         <Navbar page='help' />
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
                     <Link
                        href='/groups'
                        className='text-muted-foreground hover:text-foreground transition-colors'
                     >
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
               </div>
            </div>
         </header> */}

         <div className='container mx-auto px-4 py-12'>
            <div className='max-w-3xl mx-auto'>
               <h1 className='text-4xl font-bold mb-3 text-foreground'>
                  Help Center
               </h1>
               <p className='text-muted-foreground mb-8'>
                  Find answers to common questions about Research Hub
               </p>

               {/* Search */}
               <div className='relative mb-12'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                  <Input
                     placeholder='Search help articles...'
                     className='pl-10'
                  />
               </div>

               {/* FAQ */}
               <div className='space-y-4'>
                  {faqItems.map((item, index) => (
                     <Card key={index}>
                        <CardHeader>
                           <CardTitle className='text-lg'>
                              {item.question}
                           </CardTitle>
                        </CardHeader>
                        <CardContent className='text-muted-foreground'>
                           {item.answer}
                        </CardContent>
                     </Card>
                  ))}
               </div>

               {/* Contact CTA */}
               <div className='mt-12 p-6 bg-card border border-border rounded-lg text-center'>
                  <h2 className='text-xl font-semibold mb-2 text-foreground'>
                     Still need help?
                  </h2>
                  <p className='text-muted-foreground mb-4'>
                     Contact our support team for assistance
                  </p>
                  <Button variant='outline'>Contact Support</Button>
               </div>
            </div>
         </div>
      </div>
   );
}

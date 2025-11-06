"use client";

import { useState } from "react";
import { CreatePostCard } from "@/components/feed/create-post-card";
import { PostCard } from "@/components/feed/post-card";
import { TrendingSidebar } from "@/components/feed/trending-sidebar";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function FeedPage() {
   const [posts, setPosts] = useState([
      {
         id: 1,
         author: "Dr. Sarah Chen",
         role: "Professor of Computer Science at MIT",
         avatar: "/academic-portrait.png",
         timestamp: "2 hours ago",
         content:
            "Excited to announce that our latest paper on quantum machine learning has been accepted at NeurIPS! Grateful to my amazing research team for their dedication and hard work on this project.",
         image: "/quantum-machine-learning-research-visualization.jpg",
         likes: 156,
         comments: 23,
         shares: 12,
         tags: ["Machine Learning", "Quantum Computing", "NeurIPS"],
      },
      {
         id: 2,
         author: "Prof. Michael Rodriguez",
         role: "Research Director, Stanford AI Lab",
         avatar: "/academic-portrait.png",
         timestamp: "5 hours ago",
         content:
            "We are recruiting talented graduate students for our quantum physics lab. Interested candidates with strong physics background and research experience are encouraged to reach out. Join us in pushing the boundaries of quantum research!",
         image: "/quantum-physics-laboratory-research-team.jpg",
         likes: 89,
         comments: 34,
         shares: 45,
         tags: ["Hiring", "Physics", "Graduate Students"],
      },
      {
         id: 3,
         author: "Dr. Emily Johnson",
         role: "Associate Professor of Neuroscience",
         avatar: "/academic-portrait.png",
         timestamp: "1 day ago",
         content:
            "Collaborative research project with colleagues at Oxford on neuroscience applications. Looking forward to presenting our findings next month at the International Conference on Brain Research.",
         image: "/neuroscience-brain-research-collaboration.jpg",
         likes: 234,
         comments: 56,
         shares: 78,
         tags: ["Neuroscience", "Collaboration", "Research"],
      },
   ]);

   const trendingTopics = [
      { tag: "Artificial Intelligence", posts: 1234 },
      { tag: "Quantum Computing", posts: 892 },
      { tag: "Climate Science", posts: 756 },
      { tag: "Biomedical Research", posts: 645 },
      { tag: "Space Exploration", posts: 523 },
   ];

   const handlePostSubmit = (content: string, image?: string) => {
      const newPost = {
         id: posts.length + 1,
         author: "You",
         role: "Researcher",
         avatar: "/academic-portrait.png",
         timestamp: "Just now",
         content,
         image: image || "",
         likes: 0,
         comments: 0,
         shares: 0,
         tags: [],
      };
      setPosts([newPost, ...posts]);
   };

   return (
      <div className='min-h-screen bg-background'>
         {/* Sticky Header */}
         <header className='sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'>
               <Link href='/' className='flex items-center gap-2.5'>
                  <div className='w-8 h-8 bg-primary rounded-md flex items-center justify-center'>
                     <BookOpen className='w-4 h-4 text-primary-foreground' />
                  </div>
                  <span className='font-semibold text-foreground'>
                     Academic Nexus
                  </span>
               </Link>
               <nav className='hidden md:flex items-center gap-8'>
                  {[
                     { label: "Feed", href: "/feed", active: true },
                     { label: "Researchers", href: "/profiles" },
                     { label: "Groups", href: "/groups" },
                     { label: "Repository", href: "/repository" },
                     { label: "Jobs", href: "/jobs" },
                     { label: "Events", href: "/events" },
                  ].map((item) => (
                     <Link
                        key={item.href}
                        href={item.href}
                        className={`text-sm font-medium transition-colors ${
                           item.active
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                        }`}
                     >
                        {item.label}
                     </Link>
                  ))}
               </nav>
            </div>
         </header>

         {/* Main Content */}
         <main className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6'>
               {/* Left Column - Main Feed */}
               <div className='lg:col-span-2 border-r border-border/50'>
                  {/* Create Post */}
                  <CreatePostCard onPostSubmit={handlePostSubmit} />

                  {/* Posts Feed */}
                  <div>
                     {posts.map((post) => (
                        <PostCard key={post.id} {...post} />
                     ))}
                  </div>

                  {/* Load More */}
                  <div className='border-b border-border flex justify-center py-6 hover:bg-card/30 transition-colors cursor-pointer'>
                     <span className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                        Load more posts
                     </span>
                  </div>
               </div>

               {/* Right Column - Sidebar */}
               <div className='hidden lg:block sticky top-20 h-fit px-4'>
                  <TrendingSidebar items={trendingTopics} />
               </div>
            </div>
         </main>
      </div>
   );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PostCardProps {
   id: number;
   author: string;
   role: string;
   avatar: string;
   timestamp: string;
   content: string;
   image?: string;
   likes: number;
   comments: number;
   shares: number;
   tags?: string[];
}

export function PostCard({
   id,
   author,
   role,
   avatar,
   timestamp,
   content,
   image,
   likes,
   comments,
   shares,
   tags = [],
}: PostCardProps) {
   const [liked, setLiked] = useState(false);
   const [likeCount, setLikeCount] = useState(likes);

   const handleLike = () => {
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
   };

   return (
      <article className='border-b border-border bg-background transition-colors duration-150 hover:bg-card/30'>
         <div className='px-6 py-5 space-y-4'>
            {/* Post Header */}
            <div className='flex gap-4'>
               <Link href={`/profile/${id}`} className='shrink-0'>
                  <Avatar className='w-12 h-12 border border-border/30 hover:ring-2 ring-primary/30 transition-all'>
                     <AvatarImage
                        src={avatar || "/placeholder.svg"}
                        alt={author}
                     />
                     <AvatarFallback>{author.charAt(0)}</AvatarFallback>
                  </Avatar>
               </Link>

               <div className='flex-1 min-w-0'>
                  <div className='flex items-start justify-between gap-2'>
                     <Link href={`/profile/${id}`} className='flex-1 min-w-0'>
                        <div className='flex items-baseline gap-2 flex-wrap'>
                           <h3 className='font-600 text-foreground text-sm leading-tight hover:text-primary transition-colors'>
                              {author}
                           </h3>
                           <p className='text-xs text-muted-foreground font-normal truncate'>
                              {role}
                           </p>
                        </div>
                        <p className='text-xs text-muted-foreground mt-1'>
                           {timestamp}
                        </p>
                     </Link>
                     <Button
                        variant='ghost'
                        size='sm'
                        className='h-8 w-8 p-0 text-muted-foreground hover:text-primary'
                     >
                        <MoreHorizontal className='w-4 h-4' />
                     </Button>
                  </div>
               </div>
            </div>

            {/* Post Content */}
            <div className='space-y-4'>
               <p className='text-sm leading-relaxed text-foreground text-pretty whitespace-pre-wrap'>
                  {content}
               </p>

               {/* Image - Full width, beautiful display */}
               {image && (
                  <div className='relative w-full overflow-hidden rounded-lg bg-muted/50 border border-border/50'>
                     <Image
                        src={image || "/placeholder.svg"}
                        alt='Post content'
                        width={560}
                        height={320}
                        className='w-full object-cover max-h-96'
                     />
                  </div>
               )}

               {/* Tags - Only if present */}
               {tags.length > 0 && (
                  <div className='flex flex-wrap gap-2 pt-2'>
                     {tags.map((tag) => (
                        <Link
                           key={tag}
                           href={`/feed?tag=${encodeURIComponent(tag)}`}
                           className='inline-block text-xs text-primary hover:text-primary/80 transition-colors'
                        >
                           #{tag.toLowerCase().replace(/\s+/g, "")}
                        </Link>
                     ))}
                  </div>
               )}
            </div>

            {/* Engagement Stats - Minimal display */}
            <div className='flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/30'>
               <div className='flex gap-6'>
                  <span className='hover:text-foreground cursor-pointer transition-colors'>
                     {likeCount} likes
                  </span>
                  <span className='hover:text-foreground cursor-pointer transition-colors'>
                     {comments} comments
                  </span>
                  <span className='hover:text-foreground cursor-pointer transition-colors'>
                     {shares} shares
                  </span>
               </div>
            </div>

            {/* Actions */}
            <div className='flex items-center justify-between pt-2 -mx-2'>
               <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleLike}
                  className='flex-1 h-9 text-xs font-normal text-muted-foreground hover:text-red-500 hover:bg-red-500/10 justify-center transition-colors group'
               >
                  <Heart
                     className={`w-4 h-4 transition-all group-hover:scale-110 ${
                        liked ? "fill-red-500 text-red-500" : ""
                     }`}
                  />
               </Button>
               <Button
                  variant='ghost'
                  size='sm'
                  className='flex-1 h-9 text-xs font-normal text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 justify-center transition-colors group'
               >
                  <MessageCircle className='w-4 h-4 group-hover:scale-110 transition-all' />
               </Button>
               <Button
                  variant='ghost'
                  size='sm'
                  className='flex-1 h-9 text-xs font-normal text-muted-foreground hover:text-green-500 hover:bg-green-500/10 justify-center transition-colors group'
               >
                  <Share2 className='w-4 h-4 group-hover:scale-110 transition-all' />
               </Button>
            </div>
         </div>
      </article>
   );
}

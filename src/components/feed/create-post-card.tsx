"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";

interface CreatePostCardProps {
   onPostSubmit: (content: string, image?: string) => void;
}

export function CreatePostCard({ onPostSubmit }: CreatePostCardProps) {
   const [content, setContent] = useState("");
   const [isFocused, setIsFocused] = useState(false);
   const [selectedImage, setSelectedImage] = useState<string | null>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const handleSubmit = () => {
      if (content.trim()) {
         onPostSubmit(content, selectedImage || undefined);
         setContent("");
         setSelectedImage(null);
         setIsFocused(false);
      }
   };

   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = (event) => {
            setSelectedImage(event.target?.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   return (
      <div className='border-b border-border bg-background'>
         <div className='px-6 py-5 space-y-4'>
            {/* Header with Avatar */}
            <div className='flex items-start gap-4'>
               <Avatar className='w-12 h-12 shrink-0 border border-border/30'>
                  <AvatarImage src='/academic-portrait.png' />
                  <AvatarFallback>You</AvatarFallback>
               </Avatar>
               <div className='flex-1'>
                  <Textarea
                     placeholder='Share your research, ask questions, or announce opportunities...'
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                     onFocus={() => setIsFocused(true)}
                     onBlur={() =>
                        !content && !selectedImage && setIsFocused(false)
                     }
                     className='min-h-20 border-0 bg-background focus:ring-0 resize-none text-base placeholder:text-muted-foreground/60 p-0 focus:outline-none'
                  />
               </div>
            </div>

            {/* Selected Image Preview */}
            {selectedImage && (
               <div className='relative w-full rounded-lg overflow-hidden bg-muted/50 border border-border/50 max-h-72'>
                  <Image
                     src={selectedImage || "/placeholder.svg"}
                     alt='Preview'
                     width={560}
                     height={320}
                     className='w-full object-cover'
                  />
                  <Button
                     variant='ghost'
                     size='sm'
                     onClick={() => setSelectedImage(null)}
                     className='absolute top-2 right-2 bg-background/80 hover:bg-background text-foreground rounded-full h-8 w-8 p-0'
                  >
                     <X className='w-4 h-4' />
                  </Button>
               </div>
            )}

            {/* Action Buttons - Show when focused or image selected */}
            {(isFocused || selectedImage || content) && (
               <div className='flex items-center justify-between gap-3 pt-4 border-t border-border/30 animate-in fade-in slide-in-from-top-2 duration-200'>
                  <div className='flex gap-2'>
                     <input
                        ref={fileInputRef}
                        type='file'
                        accept='image/*'
                        onChange={handleImageSelect}
                        className='hidden'
                     />
                     <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => fileInputRef.current?.click()}
                        className='text-xs text-muted-foreground hover:text-primary hover:bg-primary/10'
                     >
                        <ImageIcon className='w-4 h-4 mr-1.5' />
                        Photo
                     </Button>
                  </div>
                  <div className='flex gap-2'>
                     <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => {
                           setContent("");
                           setSelectedImage(null);
                           setIsFocused(false);
                        }}
                        className='text-xs text-muted-foreground hover:bg-muted'
                     >
                        Cancel
                     </Button>
                     <Button
                        size='sm'
                        onClick={handleSubmit}
                        disabled={!content.trim()}
                        className='text-xs font-medium'
                     >
                        Post
                     </Button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

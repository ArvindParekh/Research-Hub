"use client";

import type React from "react";
import { useState, useRef, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { createPost } from "@/actions/feed/create-post";
import { PostType, PostVisibility, AttachmentType } from "@/lib/enums/feed";
import { useToast } from "@/hooks/use-toast";
import type { PostWithDetails } from "@/lib/types/feed";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

interface CreatePostCardProps {
   onPostCreated?: (post: PostWithDetails) => void;
   currentUser?: {
      id: string;
      firstName: string | null;
      lastName: string | null;
   };
}

export function CreatePostCard({
   onPostCreated,
   currentUser,
}: CreatePostCardProps) {
   const { toast } = useToast();
   const [content, setContent] = useState("");
   const [isFocused, setIsFocused] = useState(false);
   const [selectedImage, setSelectedImage] = useState<string | null>(null);
   const [visibility, setVisibility] = useState<PostVisibility>(
      PostVisibility.Public
   );
   const [isPending, startTransition] = useTransition();
   const fileInputRef = useRef<HTMLInputElement>(null);

   const handleSubmit = () => {
      if (!content.trim() && !selectedImage) {
         toast({
            variant: "destructive",
            title: "Error",
            description: "Please add some content or an image",
         });
         return;
      }

      startTransition(async () => {
         try {
            const postType = selectedImage ? PostType.Image : PostType.Text;
            const attachments = selectedImage
               ? [
                    {
                       type: AttachmentType.Image,
                       url: selectedImage,
                       fileName: "image.jpg",
                    },
                 ]
               : undefined;

            const response = await createPost({
               content: content.trim() || undefined,
               type: postType,
               visibility,
               attachments,
            });

            if (response.success && response.data) {
               // create optimistic post data
               const newPost: PostWithDetails = {
                  ...response.data,
                  author: {
                     id: currentUser?.id || "",
                     firstName: currentUser?.firstName || null,
                     lastName: currentUser?.lastName || null,
                  },
                  reactions: [],
                  comments: [],
                  _count: {
                     reactions: 0,
                     comments: 0,
                     bookmarks: 0,
                  },
                  isLikedByUser: false,
                  isBookmarkedByUser: false,
               };

               onPostCreated?.(newPost);

               // reset form
               setContent("");
               setSelectedImage(null);
               setIsFocused(false);
               setVisibility(PostVisibility.Public);

               toast({
                  title: "Success",
                  description: "Post created successfully",
               });
            } else {
               toast({
                  variant: "destructive",
                  title: "Error",
                  description: response.message,
               });
            }
         } catch (error) {
            toast({
               variant: "destructive",
               title: "Error",
               description: "Failed to create post",
            });
         }
      });
   };

   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         // check file size (max 5MB)
         if (file.size > 5 * 1024 * 1024) {
            toast({
               variant: "destructive",
               title: "Error",
               description: "Image size should be less than 5MB",
            });
            return;
         }

         const reader = new FileReader();
         reader.onload = (event) => {
            setSelectedImage(event.target?.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   const handleCancel = () => {
      setContent("");
      setSelectedImage(null);
      setIsFocused(false);
      setVisibility(PostVisibility.Public);
   };

   const userInitials = currentUser?.firstName?.charAt(0).toUpperCase() || "U";

   return (
      <div className='border-b border-border bg-background'>
         <div className='px-6 py-5 space-y-4'>
            {/* header with avatar */}
            <div className='flex items-start gap-4'>
               <Avatar className='w-12 h-12 shrink-0 border border-border/30'>
                  <AvatarImage src={undefined} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
               </Avatar>
               <div className='flex-1'>
                  <Textarea
                     placeholder='Share your research, ask questions, or announce opportunities...'
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                     onFocus={() => setIsFocused(true)}
                     disabled={isPending}
                     className='min-h-20 border-0 bg-background focus:ring-0 resize-none text-base placeholder:text-muted-foreground/60 p-0 focus:outline-none'
                  />
               </div>
            </div>

            {/* selected image preview */}
            {selectedImage && (
               <div className='relative w-full rounded-lg overflow-hidden bg-muted/50 border border-border/50'>
                  <div
                     className='relative w-full'
                     style={{ maxHeight: "400px" }}
                  >
                     <Image
                        src={selectedImage}
                        alt='Preview'
                        width={800}
                        height={400}
                        className='object-contain w-full h-auto max-h-[400px]'
                        unoptimized
                     />
                  </div>
                  <Button
                     variant='ghost'
                     size='sm'
                     onClick={() => setSelectedImage(null)}
                     disabled={isPending}
                     className='absolute top-2 right-2 bg-background/80 hover:bg-background text-foreground rounded-full h-8 w-8 p-0'
                  >
                     <X className='w-4 h-4' />
                  </Button>
               </div>
            )}

            {/* action buttons - show when focused or image selected */}
            {(isFocused || selectedImage || content) && (
               <div className='flex items-center justify-between gap-3 pt-4 border-t border-border/30 animate-in fade-in slide-in-from-top-2 duration-200'>
                  <div className='flex gap-2 items-center'>
                     <input
                        ref={fileInputRef}
                        type='file'
                        accept='image/*'
                        onChange={handleImageSelect}
                        disabled={isPending}
                        className='hidden'
                     />
                     <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isPending}
                        className='text-xs text-muted-foreground hover:text-primary hover:bg-primary/10'
                     >
                        <ImageIcon className='w-4 h-4 mr-1.5' />
                        Photo
                     </Button>

                     <Select
                        value={visibility}
                        onValueChange={(value) =>
                           setVisibility(value as PostVisibility)
                        }
                        disabled={isPending}
                     >
                        <SelectTrigger className='w-32 h-8 text-xs'>
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value={PostVisibility.Public}>
                              Public
                           </SelectItem>
                           <SelectItem value={PostVisibility.Connections}>
                              Connections
                           </SelectItem>
                           <SelectItem value={PostVisibility.Private}>
                              Private
                           </SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div className='flex gap-2'>
                     <Button
                        variant='ghost'
                        size='sm'
                        onClick={handleCancel}
                        disabled={isPending}
                        className='text-xs text-muted-foreground hover:bg-muted'
                     >
                        Cancel
                     </Button>
                     <Button
                        size='sm'
                        onClick={handleSubmit}
                        disabled={
                           (!content.trim() && !selectedImage) || isPending
                        }
                        className='text-xs font-medium'
                     >
                        {isPending && (
                           <Loader2 className='w-3 h-3 mr-1.5 animate-spin' />
                        )}
                        {isPending ? "Posting..." : "Post"}
                     </Button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

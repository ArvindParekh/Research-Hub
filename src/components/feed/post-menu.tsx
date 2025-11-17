"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Flag, Bookmark } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deletePost } from "@/actions/feed/delete";
import { useToast } from "@/hooks/use-toast";

interface PostMenuProps {
   postId: string;
   isOwnPost: boolean;
   onDelete?: () => void;
}

/**
 * PostMenu component - handles post actions menu (delete, report, etc.)
 * Follows Single Responsibility Principle
 */
export function PostMenu({ postId, isOwnPost, onDelete }: PostMenuProps) {
   const { toast } = useToast();
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const [isPending, startTransition] = useTransition();

   const handleDelete = () => {
      startTransition(async () => {
         try {
            const response = await deletePost({ postId });

            if (response.success) {
               toast({
                  title: "Success",
                  description: "Post deleted successfully",
               });
               onDelete?.();
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
               description: "Failed to delete post",
            });
         } finally {
            setShowDeleteDialog(false);
         }
      });
   };

   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 w-8 p-0 text-muted-foreground hover:text-primary'
               >
                  <MoreHorizontal className='w-4 h-4' />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
               {isOwnPost ? (
                  <>
                     <DropdownMenuItem
                        onClick={() => setShowDeleteDialog(true)}
                        className='text-destructive focus:text-destructive'
                     >
                        <Trash2 className='w-4 h-4 mr-2' />
                        Delete post
                     </DropdownMenuItem>
                  </>
               ) : (
                  <>
                     <DropdownMenuItem>
                        <Bookmark className='w-4 h-4 mr-2' />
                        Save post
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem className='text-destructive focus:text-destructive'>
                        <Flag className='w-4 h-4 mr-2' />
                        Report post
                     </DropdownMenuItem>
                  </>
               )}
            </DropdownMenuContent>
         </DropdownMenu>

         <AlertDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
         >
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>Delete post?</AlertDialogTitle>
                  <AlertDialogDescription>
                     This action cannot be undone. This will permanently delete
                     your post and remove it from our servers.
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel disabled={isPending}>
                     Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                     onClick={handleDelete}
                     disabled={isPending}
                     className='bg-destructive hover:bg-destructive/90'
                  >
                     {isPending ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </>
   );
}

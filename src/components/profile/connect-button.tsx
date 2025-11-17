"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck, Clock, UserMinus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ConnectionStatusData } from "@/actions/user/get-connection-status";

interface ConnectButtonProps {
   targetUserId: string;
   connectionStatus: ConnectionStatusData | null | undefined;
}

export function ConnectButton({
   targetUserId,
   connectionStatus: initialStatus,
}: ConnectButtonProps) {
   const { toast } = useToast();
   const [status, setStatus] = useState(initialStatus);
   const [isPending, startTransition] = useTransition();

   const handleConnect = async () => {
      startTransition(async () => {
         try {
            // import the action dynamically to avoid issues
            const { sendConnectionRequest } = await import(
               "@/actions/connection/send-request"
            );
            const response = await sendConnectionRequest({
               targetUserId,
            });

            if (response.success) {
               setStatus({
                  isConnected: false,
                  isPending: true,
                  isFollowing: true,
                  status: "Pending",
                  connectionId: response.data?.connection.id || null,
               });
               toast({
                  title: "Success",
                  description: "Connection request sent",
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
               description: "Failed to send connection request",
            });
         }
      });
   };

   const handleUnfollow = async () => {
      startTransition(async () => {
         try {
            const { unfollow } = await import("@/actions/connection/unfollow");
            const response = await unfollow({ targetUserId });

            if (response.success) {
               setStatus({
                  isConnected: false,
                  isPending: false,
                  isFollowing: false,
                  status: null,
                  connectionId: null,
               });
               toast({
                  title: "Success",
                  description: "Connection removed",
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
               description: "Failed to remove connection",
            });
         }
      });
   };

   if (!status) {
      return (
         <Button size='sm' onClick={handleConnect} disabled={isPending}>
            <UserPlus className='w-4 h-4 mr-2' />
            Connect
         </Button>
      );
   }

   if (status.isConnected) {
      return (
         <Button
            size='sm'
            variant='outline'
            onClick={handleUnfollow}
            disabled={isPending}
         >
            <UserCheck className='w-4 h-4 mr-2' />
            Connected
         </Button>
      );
   }

   if (status.isPending) {
      return (
         <Button
            size='sm'
            variant='outline'
            onClick={handleUnfollow}
            disabled={isPending}
         >
            <Clock className='w-4 h-4 mr-2' />
            Pending
         </Button>
      );
   }

   return (
      <Button size='sm' onClick={handleConnect} disabled={isPending}>
         <UserPlus className='w-4 h-4 mr-2' />
         Connect
      </Button>
   );
}

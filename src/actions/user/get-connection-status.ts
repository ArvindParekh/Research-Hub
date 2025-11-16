"use server";

import { prisma } from "@/lib/prisma";
import { ActionResponse } from "@/lib/types/action-response";
import { stackServerApp } from "@/stack/server";
import { ConnectionStatus } from "@/generated/prisma/client";

export interface ConnectionStatusData {
   isConnected: boolean;
   isPending: boolean;
   isFollowing: boolean;
   status: ConnectionStatus | null;
   connectionId: string | null;
}

export async function getConnectionStatus(
   targetUserId: string
): Promise<ActionResponse<ConnectionStatusData>> {
   const currentUser = await stackServerApp.getUser();

   if (!currentUser) {
      return {
         success: false,
         message: "Unauthorized",
         data: null,
      };
   }

   if (currentUser.id === targetUserId) {
      // user's viewing their own profile
      return {
         success: true,
         message: "Viewing own profile",
         data: {
            isConnected: false,
            isPending: false,
            isFollowing: false,
            status: null,
            connectionId: null,
         },
      };
   }

   try {
      // check if current user is following the target user
      const connection = await prisma.connection.findFirst({
         where: {
            followerId: currentUser.id,
            followingId: targetUserId,
         },
      });

      if (!connection) {
         return {
            success: true,
            message: "No connection",
            data: {
               isConnected: false,
               isPending: false,
               isFollowing: false,
               status: null,
               connectionId: null,
            },
         };
      }

      return {
         success: true,
         message: "Connection status fetched",
         data: {
            isConnected: connection.status === "Accepted",
            isPending: connection.status === "Pending",
            isFollowing: true,
            status: connection.status,
            connectionId: connection.id,
         },
      };
   } catch (error) {
      console.error("Error fetching connection status:", error);
      return {
         success: false,
         message: "Failed to fetch connection status",
         data: null,
      };
   }
}

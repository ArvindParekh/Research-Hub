"use server";

import {
   pendingConnectionRequestsSchema,
   PendingConnectionRequestsSchema,
} from "@/lib/types/request-validation/connection";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Connection } from "@/generated/prisma/client";

export async function getPendingConnectionRequests(
   payload: PendingConnectionRequestsSchema
): Promise<
   ActionResponse<{ items: Connection[]; nextCursor: string | undefined }>
> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return {
         success: false,
         message: "Unauthorized",
         data: null,
      };
   }

   const validatedPayload = pendingConnectionRequestsSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { cursor, limit } = validatedPayload.data;

   try {
      const connections = await prisma.connection.findMany({
         where: { followingId: stackUser.id, status: "Pending" },
         include: {
            follower: { select: { id: true, firstName: true, lastName: true } },
         },
         orderBy: { createdAt: "desc" },
         take: limit + 1,
         ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      });

      const hasMore = connections.length > limit;
      const items = hasMore ? connections.slice(0, -1) : connections;
      const nextCursor = hasMore ? items[items.length - 1].id : undefined;

      return {
         success: true,
         message: "Pending connection requests fetched successfully",
         data: { items, nextCursor },
      };
   } catch (error) {
      console.error("Error getting pending connection requests", error);
      throw new Error("Database error");
   }
}

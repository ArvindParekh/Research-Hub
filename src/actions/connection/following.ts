"use server";

import {
   getFollowersOrFollowingSchema,
   GetFollowersOrFollowingSchema,
} from "@/lib/types/request-validation/connection";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { User } from "@prisma/client";

export async function getFollowing(
   payload: GetFollowersOrFollowingSchema
): Promise<
   ActionResponse<{
      items: Pick<User, "id" | "firstName" | "lastName">[];
      nextCursor: string | undefined;
   }>
> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = getFollowersOrFollowingSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return { success: false, message: "Invalid payload", data: null };
   }

   const { userId, cursor, limit } = validatedPayload.data;
   const targetUserId = userId ?? stackUser.id;

   try {
      const connections = await prisma.connection.findMany({
         where: { followerId: targetUserId, status: "Accepted" },
         include: {
            following: {
               select: { id: true, firstName: true, lastName: true },
            },
         },
         orderBy: { createdAt: "desc" },
         take: limit + 1,
         ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      });

      const hasMore = connections.length > limit;
      const items = hasMore ? connections.slice(0, -1) : connections;
      const nextCursor = hasMore ? items[items.length - 1].id : undefined;

      const users = items.map((item) => item.following);
      return {
         success: true,
         message: "Following fetched successfully",
         data: { items: users, nextCursor },
      };
   } catch (error) {
      console.error("Error getting following", error);
      throw new Error("Database error");
   }
}

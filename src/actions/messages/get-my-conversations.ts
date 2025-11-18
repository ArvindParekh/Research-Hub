"use server";
import {
   getMyConversationsSchema,
   GetMyConversationsSchema,
} from "@/lib/types/request-validation/messages";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Conversation } from "@prisma/client";

export async function getMyConversations(
   payload: GetMyConversationsSchema
): Promise<
   ActionResponse<{
      items: (Conversation & {
         participants: Array<{
            user: {
               id: string;
               firstName: string | null;
               lastName: string | null;
            };
            lastReadAt: Date | null;
         }>;
         messages: Array<{ content: string; createdAt: Date }>; // latest message
      })[];
      nextCursor: string | undefined;
   }>
> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = getMyConversationsSchema.safeParse(payload);
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
      const conversations = await prisma.conversation.findMany({
         where: {
            type: "Direct",
            participants: {
               some: { userId: stackUser.id },
            },
         },
         include: {
            participants: {
               include: {
                  user: {
                     select: { id: true, firstName: true, lastName: true },
                  },
               },
               where: { userId: { not: stackUser.id } }, // get other participant
            },
            messages: {
               orderBy: { createdAt: "desc" },
               take: 1,
               select: { content: true, createdAt: true },
            },
         },
         orderBy: { updatedAt: "desc" },
         take: limit + 1,
         ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      });

      const hasMore = conversations.length > limit;
      const items = hasMore ? conversations.slice(0, -1) : conversations;
      const nextCursor = hasMore ? items[items.length - 1].id : undefined;

      return {
         success: true,
         message: "Conversations fetched successfully",
         data: { items, nextCursor },
      };
   } catch (error) {
      console.error("Error getting conversations", error);
      throw new Error("Database error");
   }
}

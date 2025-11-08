"use server";
import {
   getDirectMessagesSchema,
   GetDirectMessagesSchema,
} from "@/lib/types/request-validation/messages";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Message } from "@/generated/prisma/client";

export async function getDirectMessages(
   payload: GetDirectMessagesSchema
): Promise<
   ActionResponse<{
      items: (Message & {
         user: {
            id: string;
            firstName: string | null;
            lastName: string | null;
         };
      })[];
      nextCursor: string | undefined;
   }>
> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = getDirectMessagesSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { recipientId, cursor, limit } = validatedPayload.data;

   try {
      const conversation = await prisma.conversation.findFirst({
         where: {
            type: "Direct",
            participants: {
               every: {
                  userId: { in: [stackUser.id, recipientId] },
               },
            },
         },
         include: {
            participants: true,
         },
      });

      if (!conversation || conversation.participants.length !== 2) {
         return {
            success: true,
            message: "No messages found",
            data: { items: [], nextCursor: undefined },
         };
      }

      const messages = await prisma.message.findMany({
         where: { conversationId: conversation.id },
         include: {
            user: { select: { id: true, firstName: true, lastName: true } },
         },
         orderBy: { createdAt: "desc" },
         take: limit + 1,
         ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      });

      const hasMore = messages.length > limit;
      const items = hasMore ? messages.slice(0, -1) : messages;
      const nextCursor = hasMore ? items[items.length - 1].id : undefined;

      return {
         success: true,
         message: "Messages fetched successfully",
         data: { items, nextCursor },
      };
   } catch (error) {
      console.error("Error getting direct messages", error);
      throw new Error("Database error");
   }
}

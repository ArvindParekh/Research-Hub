"use server";
import {
   sendChannelMessageSchema,
   SendChannelMessageSchema,
} from "@/lib/types/request-validation/messages";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Message } from "@/generated/prisma/client";

export async function sendChannelMessage(
   payload: SendChannelMessageSchema
): Promise<ActionResponse<{ message: Message }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return { success: false, message: "Unauthorized", data: null };
   }

   const validatedPayload = sendChannelMessageSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { channelId, content } = validatedPayload.data;

   try {
      // make sure user is member of channel
      const membership = await prisma.channelMember.findUnique({
         where: { channelId_userId: { channelId, userId: stackUser.id } },
         select: { channel: { select: { conversationId: true } } },
      });

      if (!membership || !membership.channel.conversationId) {
         return {
            success: false,
            message: "Not a member of this channel",
            data: null,
         };
      }

      const message = await prisma.message.create({
         data: {
            conversationId: membership.channel.conversationId,
            userId: stackUser.id,
            content,
         },
      });

      return {
         success: true,
         message: "Message sent successfully",
         data: { message },
      };
   } catch (error) {
      console.error("Error sending channel message", error);
      throw new Error("Database error");
   }
}

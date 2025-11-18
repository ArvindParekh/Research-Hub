"use server";
import {
  markDirectMessageAsReadSchema,
  MarkDirectMessageAsReadSchema,
} from "@/lib/types/request-validation/messages";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";

export async function markDirectMessageAsRead(
  payload: MarkDirectMessageAsReadSchema,
): Promise<ActionResponse<{ markedAsRead: boolean }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = markDirectMessageAsReadSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { recipientId } = validatedPayload.data;

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
      include: { participants: true },
    });

    if (!conversation || conversation.participants.length !== 2) {
      return {
        success: false,
        message: "Conversation not found",
        data: null,
      };
    }

    // update lastReadAt for current user
    await prisma.conversationParticipant.updateMany({
      where: {
        conversationId: conversation.id,
        userId: stackUser.id,
      },
      data: {
        lastReadAt: new Date(),
      },
    });

    return {
      success: true,
      message: "Messages marked as read",
      data: { markedAsRead: true },
    };
  } catch (error) {
    console.error("Error marking messages as read", error);
    throw new Error("Database error");
  }
}

"use server";
import {
  getChannelMessagesSchema,
  GetChannelMessagesSchema,
} from "@/lib/types/request-validation/messages";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Message } from "@/generated/prisma/client";

export async function getChannelMessages(
  payload: GetChannelMessagesSchema,
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

  const validatedPayload = getChannelMessagesSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { channelId, cursor, limit } = validatedPayload.data;

  try {
    // check membership and get conversationId
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

    const messages = await prisma.message.findMany({
      where: { conversationId: membership.channel.conversationId },
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
    console.error("Error getting channel messages", error);
    throw new Error("Database error");
  }
}

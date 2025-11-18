"use server";
import {
  createChannelSchema,
  CreateChannelSchema,
} from "@/lib/types/request-validation/messages";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Channel } from "@/generated/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createChannel(
  payload: CreateChannelSchema,
): Promise<ActionResponse<{ channel: Channel }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = createChannelSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { groupId, name, description } = validatedPayload.data;

  try {
    // make sure user is admin or leader
    const membership = await prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId: stackUser.id } },
      select: { isAdmin: true, group: { select: { leaderId: true } } },
    });

    if (
      !membership ||
      (!membership.isAdmin && membership.group.leaderId !== stackUser.id)
    ) {
      return {
        success: false,
        message: "Only admins or leader can create channels",
        data: null,
      };
    }

    // create conversation and channel
    const conversation = await prisma.conversation.create({
      data: { type: "Channel" },
    });

    const channel = await prisma.channel.create({
      data: {
        groupId,
        name,
        description,
        conversationId: conversation.id,
      },
    });

    // and then add all active group members to channel
    const activeMembers = await prisma.groupMember.findMany({
      where: { groupId, status: "Active" },
      select: { userId: true },
    });

    await prisma.channelMember.createMany({
      data: activeMembers.map((m) => ({
        channelId: channel.id,
        userId: m.userId,
      })),
    });

    return {
      success: true,
      message: "Channel created successfully",
      data: { channel },
    };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "Channel name already exists in this group",
        data: null,
      };
    }
    console.error("Error creating channel", error);
    throw new Error("Database error");
  }
}

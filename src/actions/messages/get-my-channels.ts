"use server";
import {
  getMyChannelsSchema,
  GetMyChannelsSchema,
} from "@/lib/types/request-validation/messages";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Channel } from "@/generated/prisma/client";

export async function getMyChannels(payload: GetMyChannelsSchema): Promise<
  ActionResponse<{
    items: (Channel & {
      group: { id: string; name: string };
      _count: { members: number };
    })[];
    nextCursor: string | undefined;
  }>
> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = getMyChannelsSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { groupId, cursor, limit } = validatedPayload.data;

  try {
    const channels = await prisma.channel.findMany({
      where: {
        members: { some: { userId: stackUser.id } },
        ...(groupId && { groupId }),
      },
      include: {
        group: { select: { id: true, name: true } },
        _count: { select: { members: true } },
      },
      orderBy: { updatedAt: "desc" },
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    });

    const hasMore = channels.length > limit;
    const items = hasMore ? channels.slice(0, -1) : channels;
    const nextCursor = hasMore ? items[items.length - 1].id : undefined;

    return {
      success: true,
      message: "Channels fetched successfully",
      data: { items, nextCursor },
    };
  } catch (error) {
    console.error("Error getting my channels", error);
    throw new Error("Database error");
  }
}

"use server";

import {
  joinGroupSchema,
  JoinGroupSchema,
} from "@/lib/types/request-validation/groups";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { GroupMember } from "@/generated/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function joinGroup(
  payload: JoinGroupSchema,
): Promise<ActionResponse<{ membership: GroupMember }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  const validatedPayload = joinGroupSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { groupId } = validatedPayload.data;

  try {
    const group = await prisma.group.findUnique({
      // getting group settings
      where: { id: groupId },
      select: {
        joinRequiresApproval: true,
        maxMembers: true,
        _count: { select: { members: { where: { status: "Active" } } } },
      },
    });

    if (!group) {
      return { success: false, message: "Group not found", data: null };
    }

    if (group.maxMembers && group._count.members >= group.maxMembers) {
      return { success: false, message: "Group is full", data: null };
    }

    const membership = await prisma.groupMember.create({
      data: {
        groupId,
        userId: stackUser.id,
        status: group.joinRequiresApproval ? "Pending" : "Active",
      },
    });

    return {
      success: true,
      message: group.joinRequiresApproval
        ? "Join request sent"
        : "Joined group",
      data: { membership },
    };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "Already joined or pending",
        data: null,
      };
    }
    console.error("Error joining group", error);
    throw new Error("Database error");
  }
}

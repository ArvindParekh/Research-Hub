"use server";
import {
  updateGroupSchema,
  UpdateGroupSchema,
} from "@/lib/types/request-validation/groups";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { Group } from "@/generated/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function updateGroup(
  payload: UpdateGroupSchema,
): Promise<ActionResponse<{ group: Group }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = updateGroupSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { groupId, ...updateData } = validatedPayload.data;

  try {
    // make sure requester is admin or leader
    const requesterMembership = await prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId: stackUser.id } },
      select: { isAdmin: true, group: { select: { leaderId: true } } },
    });

    if (
      !requesterMembership ||
      (!requesterMembership.isAdmin &&
        requesterMembership.group.leaderId !== stackUser.id)
    ) {
      return {
        success: false,
        message: "Only admins or leader can update group",
        data: null,
      };
    }

    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: updateData,
    });

    return {
      success: true,
      message: "Group updated successfully",
      data: { group: updatedGroup },
    };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return { success: false, message: "Group not found", data: null };
    }
    console.error("Error updating group", error);
    throw new Error("Database error");
  }
}

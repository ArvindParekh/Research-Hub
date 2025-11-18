"use server";
import {
  approveGroupMemberSchema,
  ApproveGroupMemberSchema,
} from "@/lib/types/request-validation/groups";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function approveGroupMember(
  payload: ApproveGroupMemberSchema,
): Promise<ActionResponse<{ approved: boolean }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { success: false, message: "Unauthorized", data: null };
  }

  const validatedPayload = approveGroupMemberSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { groupId, userId, action } = validatedPayload.data;

  try {
    const requesterMembership = await prisma.groupMember.findUnique({
      // make sure if requester has approval rights
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
        message: "Only admins or leader can approve members",
        data: null,
      };
    }

    if (action === "approve") {
      await prisma.groupMember.update({
        where: { groupId_userId: { groupId, userId }, status: "Pending" },
        data: { status: "Active" },
      });
      return {
        success: true,
        message: "Member approved",
        data: { approved: true },
      };
    } else {
      await prisma.groupMember.delete({
        where: { groupId_userId: { groupId, userId }, status: "Pending" },
      });
      return {
        success: true,
        message: "Member rejected",
        data: { approved: false },
      };
    }
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return {
        success: false,
        message: "Pending member not found",
        data: null,
      };
    }
    console.error("Error approving member", error);
    throw new Error("Database error");
  }
}

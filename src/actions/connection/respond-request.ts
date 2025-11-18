"use server";

import {
  respondConnectionRequestSchema,
  RespondConnectionRequestSchema,
} from "@/lib/types/request-validation/connection";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function respondConnectionRequest(
  payload: RespondConnectionRequestSchema,
): Promise<ActionResponse<{ isRequestResponded: boolean }>> {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  const validatedPayload = respondConnectionRequestSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return {
      success: false,
      message: `Invalid payload: ${JSON.stringify(
        validatedPayload.error.flatten().fieldErrors,
      )}`,
      data: null,
    };
  }

  const { connectionId, action } = validatedPayload.data;

  try {
    await prisma.connection.update({
      where: { id: connectionId, followingId: stackUser.id },
      data: { status: action === "accept" ? "Accepted" : "Rejected" },
    });

    return {
      success: true,
      message: "Connection request responded successfully",
      data: { isRequestResponded: true },
    };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return {
        success: false,
        message: "Connection not found",
        data: null,
      };
    }
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }
    console.error("Error responding to connection request", error);
    throw new Error("Database error");
  }
}

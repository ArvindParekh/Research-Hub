"use server";

import {
   sendConnectionRequestSchema,
   SendConnectionRequestSchema,
} from "@/lib/types/request-validation/connection";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Connection } from "@prisma/client";

export async function sendConnectionRequest(
   payload: SendConnectionRequestSchema
): Promise<ActionResponse<{ connection: Connection }>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return {
         success: false,
         message: "Unauthorized",
         data: null,
      };
   }

   const validatedPayload = sendConnectionRequestSchema.safeParse(payload);
   if (!validatedPayload.success) {
      return {
         success: false,
         message: `Invalid payload: ${JSON.stringify(
            validatedPayload.error.flatten().fieldErrors
         )}`,
         data: null,
      };
   }

   const { targetUserId } = validatedPayload.data;

   try {
      const newConnection = await prisma.connection.create({
         data: {
            followerId: stackUser.id,
            followingId: targetUserId,
         },
      });

      return {
         success: true,
         message: "Connection request sent successfully",
         data: { connection: newConnection },
      };
   } catch (error) {
      if (
         error instanceof PrismaClientKnownRequestError &&
         error.code === "P2002"
      ) {
         return {
            success: false,
            message: "Connection already exists",
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
      console.error("Error sending connection request", error);
      throw new Error("Database error");
   }
}

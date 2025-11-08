"use server";
import { stackServerApp } from "@/stack/server";
import { ActionResponse } from "@/lib/types/action-response";
import { prisma } from "@/lib/prisma";

// CAUTION: potentially dangerous action
export async function deleteUser(): Promise<ActionResponse<null>> {
   const stackUser = await stackServerApp.getUser();
   if (!stackUser) {
      return {
         success: false,
         message: "Unauthorized",
         data: null,
      };
   }

   try {
      await stackUser.delete(); // delete user from stack auth

      // delete user from database - onDelete: cascade will take care of deleting all user's data
      await prisma.user.delete({
         where: { id: stackUser.id },
      });

      return {
         success: true,
         message: "User deleted successfully",
         data: null,
      };
   } catch (error) {
      console.error("Error deleting user", error);
      throw new Error("Database error");
   }
}

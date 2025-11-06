import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

export default async function MainLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   // check if user is logged in
   const user = await stackServerApp.getUser();

   if (!user) {
      redirect("/");
   }

   return <>{children}</>;
}

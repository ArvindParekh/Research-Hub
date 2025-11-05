import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// const geistSans = Geist({
//    variable: "--font-geist-sans",
//    subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//    variable: "--font-geist-mono",
//    subsets: ["latin"],
// });

const inter = Inter({
   subsets: ["latin"],
   variable: "--font-inter",
});

export const metadata: Metadata = {
   title: "Research Hub",
   description: "A platform for research collaboration and knowledge sharing",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang='en' suppressHydrationWarning>
         <body className={`${inter.variable} antialiased`}>
            <ThemeProvider
               attribute='class'
               defaultTheme='system'
               enableSystem
               disableTransitionOnChange
            >
               <StackProvider app={stackClientApp}>
                  <StackTheme>{children}</StackTheme>
               </StackProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}

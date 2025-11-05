import {
   Plus,
   Upload,
   Bell,
   LucideIcon,
   ArrowLeft,
   Settings,
   LogOut,
} from "lucide-react";
import { NavbarPage } from "@/lib/types";

export type NavbarLink = {
   href: string;
   label: string;
};

export type NavbarButton = {
   href: string;
   label: string;
   icon?: LucideIcon;
   variant?: "default" | "outline" | "ghost";
   size?: "default" | "sm";
};

export type NavbarConfig = {
   links: NavbarLink[];
   buttons: NavbarButton[];
};

export const navbarConfig: Record<NavbarPage, NavbarConfig> = {
   // Home page - default navbar with all links
   home: {
      links: [
         { href: "/profiles", label: "Researchers" },
         { href: "/groups", label: "Research Groups" },
         { href: "/repository", label: "Repository" },
         { href: "/jobs", label: "Jobs" },
         { href: "/events", label: "Events" },
         { href: "/messages", label: "Message Center" },
      ],
      buttons: [],
   },
   profiles: {
      links: [
         { href: "/profiles", label: "Researchers" },
         { href: "/groups", label: "Research Groups" },
         { href: "/repository", label: "Repository" },
         { href: "/jobs", label: "Jobs" },
         { href: "/events", label: "Events" },
         { href: "/messages", label: "Message Center" },
      ],
      buttons: [
         {
            href: "/profile/create",
            label: "Create Profile",
            variant: "outline",
            size: "sm",
         },
      ],
   },
   groups: {
      links: [
         { href: "/profiles", label: "Researchers" },
         { href: "/groups", label: "Groups" },
         { href: "/repository", label: "Repository" },
         { href: "/jobs", label: "Jobs" },
         { href: "/events", label: "Events" },
      ],
      buttons: [
         {
            href: "/groups/create",
            label: "Create Group",
            icon: Plus,
         },
      ],
   },
   repository: {
      links: [
         { href: "/profiles", label: "Researchers" },
         { href: "/messages", label: "Messages" },
         { href: "/repository", label: "Repository" },
         { href: "/jobs", label: "Jobs" },
      ],
      buttons: [
         {
            href: "/repository/submit",
            label: "Submit Paper",
            icon: Upload,
         },
      ],
   },
   messages: {
      links: [
         { href: "/profiles", label: "Researchers" },
         { href: "/groups", label: "Research Groups" },
         { href: "/repository", label: "Repository" },
         { href: "/jobs", label: "Jobs" },
         { href: "/events", label: "Events" },
         { href: "/messages", label: "Message Center" },
      ],
      buttons: [],
   },
   projects: {
      links: [
         { href: "/profiles", label: "Researchers" },
         { href: "/messages", label: "Messages" },
         { href: "/projects", label: "Projects" },
      ],
      buttons: [
         {
            href: "/projects/new",
            label: "New Project",
            icon: Plus,
            size: "sm",
         },
      ],
   },
   events: {
      links: [
         // { href: "/profiles", label: "Researchers" },
         // { href: "/repository", label: "Repository" },
         // { href: "/jobs", label: "Jobs" },
         // { href: "/events", label: "Events" },
      ],
      buttons: [
         {
            href: "/events",
            label: "Back to Events",
            icon: ArrowLeft,
            variant: "outline",
            size: "sm",
         },
      ],
   },
   jobs: {
      links: [
         { href: "/profiles", label: "Researchers" },
         { href: "/repository", label: "Repository" },
         { href: "/jobs", label: "Jobs" },
         { href: "/events", label: "Events" },
      ],
      buttons: [
         {
            href: "#",
            label: "Job Alerts",
            icon: Bell,
            variant: "outline",
            size: "sm",
         },
         {
            href: "/jobs/post",
            label: "Post Job",
            icon: Plus,
         },
      ],
   },
   help: {
      links: [
         { href: "/profiles", label: "Researchers" },
         { href: "/groups", label: "Research Groups" },
         { href: "/repository", label: "Repository" },
         { href: "/jobs", label: "Jobs" },
         { href: "/events", label: "Events" },
      ],
      buttons: [],
   },
   privacy: {
      links: [
         { href: "/profiles", label: "Researchers" },
         { href: "/groups", label: "Research Groups" },
         { href: "/repository", label: "Repository" },
         { href: "/jobs", label: "Jobs" },
         { href: "/events", label: "Events" },
      ],
      buttons: [],
   },
   terms: {
      links: [
         { href: "/profiles", label: "Researchers" },
         { href: "/groups", label: "Research Groups" },
         { href: "/repository", label: "Repository" },
         { href: "/jobs", label: "Jobs" },
         { href: "/events", label: "Events" },
      ],
      buttons: [],
   },
   whiteboard: {
      links: [
         { href: "/profiles", label: "Researchers" },
         { href: "/groups", label: "Research Groups" },
         { href: "/repository", label: "Repository" },
         { href: "/jobs", label: "Jobs" },
         { href: "/events", label: "Events" },
      ],
      buttons: [],
   },
   user: {
      links: [
         { href: "/profiles", label: "Researchers" },
         { href: "/groups", label: "Research Groups" },
         { href: "/repository", label: "Repository" },
      ],
      buttons: [
         {
            href: "/user/settings",
            label: "",
            icon: Settings,
            variant: "ghost",
            size: "sm",
         },
         {
            href: "/logout",
            label: "",
            icon: LogOut,
            variant: "ghost",
            size: "sm",
         },
      ],
   },
   userSettings: {
      links: [
         { href: "/profiles", label: "Researchers" },
         { href: "/groups", label: "Research Groups" },
         { href: "/repository", label: "Repository" },
      ],
      buttons: [
         {
            href: "/user",
            label: "Back to Profile",
            variant: "ghost",
            size: "sm",
         },
      ],
   },
};

// Helper function to get active link className
export const getActiveLinkClassName = (
   href: string,
   currentPage: NavbarPage
) => {
   const isActive = href === `/${currentPage}`;

   return `text-sm transition-colors ${
      isActive
         ? "text-foreground font-medium"
         : "text-muted-foreground hover:text-foreground"
   }`;
};

# Sociolect

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.1.0-lightgrey.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)

A unified platform for the global academic and research community.

Sociolect is a comprehensive media platform designed to solve the digital fragmentation faced by researchers worldwide. By providing an integrated ecosystem for professional networking, collaboration, knowledge sharing, and career development, we're creating a centralized hub where academia connects, collaborates, and thrives.

## Vision

The academic landscape is fragmented across countless platforms—professional networks, repositories, job boards, conference tools, and communication apps. Sociolect consolidates these tools into a single, integrated platform that adapts to how researchers actually work, eliminating the need to juggle multiple services and accounts.

## The Unified Experience

What sets Sociolect apart is the seamless integration across all features. When you apply for a job, your profile data flows automatically. When you publish a pre-print, it appears in your profile metrics instantaneously. When you collaborate on a project, all related publications, discussions, and documents are interconnected. This creates a living, breathing ecosystem where your academic identity is not scattered across platforms but unified in one place. The platform learns from your activity—the papers you read, the researchers you follow, the conferences you attend—and continuously refines your personalized feed, ensuring that the most relevant opportunities and content surface exactly when you need them.

## Core Features

### Researcher Profiles

Researcher profiles function as fully customizable personal webpages that serve as your academic identity on the platform. Each profile includes rich-text bios with full formatting control, comprehensive tracking of academic status and institutional affiliations, and a metrics dashboard displaying h-index and total publication counts. Researchers can showcase their work through visual portfolios, maintain personal blogs integrated directly into their profiles, and maintain directories of current and past students. The platform also includes a Dynamic CV Builder that allows researchers to export professional resumes in multiple formats, streamlining the application process for positions and grants.

### Research Group Profiles

Research groups can create dedicated profiles that showcase their labs and collaborative efforts. These profiles display complete member rosters with direct links to individual researcher profiles, maintain shared publication repositories, highlight group achievements and milestones, and track collaboration history. This creates a comprehensive view of the group's work and makes it easy for potential collaborators to understand the group's focus and expertise.

### Communication and Collaboration Suite

The platform offers a comprehensive real-time collaboration suite designed specifically for academic workflows. The integrated messaging system provides instant notifications and persistent conversation threads. Audio and video calls include screen sharing capabilities, making remote collaboration seamless. An interactive whiteboard enables real-time brainstorming and diagramming, perfect for discussing research concepts and methodologies. Research Group Hubs organize communication into multiple channels, similar to Slack or Discord, allowing teams to segment discussions by project or topic. The suite also includes a Project Management Module for tracking tasks, milestones, and deadlines, ensuring research projects stay organized and on schedule.

### Content and Knowledge Hub

The Sociolect Repository serves as an integrated pre-print repository with advanced features beyond traditional repositories. It includes version control for tracking paper evolution, an Open Peer Review System that enables community-driven feedback, citation tracking and impact metrics, and advanced search functionality with filtering by discipline, keywords, and date.

The Personalized Content Feed on the homepage intelligently curates content based on research interests and keywords, researchers and groups you follow, publication patterns and reading history, and recommended jobs and opportunities. This ensures that the most relevant information surfaces automatically, reducing the time spent searching for relevant content.

### Job Register

The Job Register provides a comprehensive academic job marketplace where professors and institutions can post open positions across all academic levels. The platform features a seamless "Apply with Profile" button that allows applicants to submit applications with a single click, using information already in their profile. An intelligent notification system matches job postings to user interests and qualifications, and an application tracking dashboard helps applicants manage their job search. Customizable job alerts ensure researchers never miss relevant opportunities.

### Events and Conference Platform

The Events and Conference Platform enables organizers to host multi-session virtual conferences with enterprise-grade features. The system supports multi-session management with parallel tracks, live streaming with HD quality, interactive Q&A modules for real-time audience engagement, and breakout rooms for focused discussions. The Virtual Poster Gallery allows for interactive presentations, and the Networking Lobby facilitates spontaneous video chats among attendees. All live sessions are automatically archived for later viewing, ensuring that valuable conference content remains accessible long after the event concludes.

## Getting Started

### Prerequisites

Sociolect requires Node.js 18 or higher. We recommend using pnpm as the package manager, though npm or yarn will also work.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/ArvindParekh/Research-Hub
cd research-hub
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

To build for production:

```bash
pnpm build
pnpm start
```

<!--
## Tech Stack

Sociolect is built on Next.js 15 with the App Router, leveraging React 19 for the user interface. Authentication is handled through Stack Auth, and the UI is constructed using shadcn/ui components built on Radix UI primitives. Styling is managed through Tailwind CSS with a custom design system. TypeScript provides type safety throughout the codebase, and forms are handled with React Hook Form and validated using Zod schemas.
-->

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";

interface TrendingItem {
  tag: string;
  posts: number;
}

interface TrendingSidebarProps {
  items: TrendingItem[];
}

export function TrendingSidebar({ items }: TrendingSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Trending Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Trending</h3>
        </div>
        <div className="space-y-0 border border-border rounded-lg overflow-hidden divide-y divide-border">
          {items.map((item, idx) => (
            <Link
              key={item.tag}
              href={`/feed?topic=${encodeURIComponent(item.tag)}`}
              className="group block px-4 py-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-normal">
                    #{idx + 1} Trending
                  </p>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-1">
                    {item.tag}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {item.posts.toLocaleString()} posts
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Discover Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground px-1">Discover</h3>
        <div className="space-y-0 border border-border rounded-lg overflow-hidden divide-y divide-border">
          <Link
            href="/profiles"
            className="group block px-4 py-4 hover:bg-muted/50 transition-colors"
          >
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Find Researchers
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Connect with experts in your field
            </p>
          </Link>
          <Link
            href="/groups"
            className="group block px-4 py-4 hover:bg-muted/50 transition-colors"
          >
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Join Groups
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Collaborate with research communities
            </p>
          </Link>
          <Link
            href="/jobs"
            className="group block px-4 py-4 hover:bg-muted/50 transition-colors"
          >
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Browse Opportunities
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Find positions and collaborations
            </p>
          </Link>
          <Link
            href="/events"
            className="group block px-4 py-4 hover:bg-muted/50 transition-colors"
          >
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Upcoming Events
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Attend conferences and seminars
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

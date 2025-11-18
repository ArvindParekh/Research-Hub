"use client";

import { CreatePostCard } from "@/components/feed/create-post-card";
import { PostCard } from "@/components/feed/post-card";
import { TrendingSidebar } from "@/components/feed/trending-sidebar";
import NavbarClient from "@/components/navbar-client";
import { useFeed } from "@/hooks/use-feed";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useUser } from "@stackframe/stack";
import { Loader2 } from "lucide-react";
import { Post, User } from "@/generated/prisma/client";
import { PostWithDetails } from "@/lib/types/feed";

export default function FeedPage() {
  const user = useUser();
  const { posts, isLoading, hasMore, error, loadMore, addPost, removePost } =
    useFeed(10);

  // ref for infinite scroll
  const loadMoreRef = useInfiniteScroll(loadMore, {
    hasMore,
    isLoading,
    threshold: 300,
  });

  const trendingTopics = [
    { tag: "Artificial Intelligence", posts: 1234 },
    { tag: "Quantum Computing", posts: 892 },
    { tag: "Climate Science", posts: 756 },
    { tag: "Biomedical Research", posts: 645 },
    { tag: "Space Exploration", posts: 523 },
  ];

  const currentUser = user
    ? {
        id: user.id,
        firstName: user.displayName?.split(" ")[0] || null,
        lastName: user.displayName?.split(" ")[1] || null,
      }
    : undefined;

  const handlePostCreated = (newPost: PostWithDetails) => {
    addPost(newPost);
  };

  const handlePostDeleted = (postId: string) => {
    removePost(postId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <NavbarClient page="feed" />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6">
          {/* Left Column - Main Feed */}
          <div className="lg:col-span-2 border-r border-border/50">
            {/* Create Post */}
            <CreatePostCard
              onPostCreated={handlePostCreated}
              currentUser={currentUser}
            />

            {/* Error State */}
            {error && (
              <div className="px-6 py-8 text-center">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Posts Feed */}
            <div>
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUserId={user?.id}
                  onDelete={handlePostDeleted}
                />
              ))}
            </div>

            {/* Loading State */}
            {isLoading && posts.length === 0 && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            )}

            {/* Empty State */}
            {!isLoading && posts.length === 0 && !error && (
              <div className="px-6 py-12 text-center">
                <p className="text-sm text-muted-foreground">
                  No posts yet. Be the first to share something!
                </p>
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            {hasMore && (
              <div
                ref={loadMoreRef}
                className="border-b border-border flex justify-center py-6 hover:bg-card/30 transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Scroll for more
                  </span>
                )}
              </div>
            )}

            {/* End of Feed */}
            {!hasMore && posts.length > 0 && (
              <div className="border-b border-border flex justify-center py-6">
                <span className="text-sm text-muted-foreground">
                  You've reached the end
                </span>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="hidden lg:block sticky top-20 h-fit px-4">
            <TrendingSidebar items={trendingTopics} />
          </div>
        </div>
      </main>
    </div>
  );
}

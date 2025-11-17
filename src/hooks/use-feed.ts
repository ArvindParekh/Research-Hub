import { useState, useCallback, useEffect } from "react";
import { getUserFeed } from "@/actions/feed/user-feed";
import type { PostWithDetails, FeedState } from "@/lib/types/feed";
import { toast } from "sonner";

export function useFeed(initialLimit = 10) {
   const [state, setState] = useState<FeedState>({
      posts: [],
      isLoading: false,
      hasMore: true,
      error: null,
   });
   const [cursor, setCursor] = useState<string | undefined>(undefined);

   const loadInitial = useCallback(async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
         const response = await getUserFeed({ limit: initialLimit });

         if (response.success && response.data) {
            setState({
               posts: response.data.posts as PostWithDetails[],
               isLoading: false,
               hasMore: !!response.data.nextCursor,
               error: null,
            });
            setCursor(response.data.nextCursor);
         } else {
            setState((prev) => ({
               ...prev,
               isLoading: false,
               error: response.message,
            }));
            toast.error("Error", {
               description: response.message,
            });
         }
      } catch (error) {
         const errorMsg = "Failed to load feed";
         setState((prev) => ({
            ...prev,
            isLoading: false,
            error: errorMsg,
         }));
         toast.error("Error", {
            description: errorMsg,
         });
      }
   }, [initialLimit]);

   // load more posts (for infinite scroll)
   const loadMore = useCallback(async () => {
      if (!state.hasMore || state.isLoading || !cursor) return;

      setState((prev) => ({ ...prev, isLoading: true }));

      try {
         const response = await getUserFeed({ cursor, limit: initialLimit });

         if (response.success && response.data) {
            setState((prev) => ({
               ...prev,
               posts: [
                  ...prev.posts,
                  ...response.data!.posts,
               ] as PostWithDetails[],
               isLoading: false,
               hasMore: !!response.data.nextCursor,
            }));
            setCursor(response.data.nextCursor);
         } else {
            setState((prev) => ({
               ...prev,
               isLoading: false,
               error: response.message,
            }));
         }
      } catch (error) {
         setState((prev) => ({
            ...prev,
            isLoading: false,
            error: "Failed to load more posts",
         }));
      }
   }, [cursor, state.hasMore, state.isLoading, initialLimit]);

   const addPost = useCallback((post: PostWithDetails) => {
      setState((prev) => ({
         ...prev,
         posts: [post, ...prev.posts],
      }));
   }, []);

   const removePost = useCallback((postId: string) => {
      setState((prev) => ({
         ...prev,
         posts: prev.posts.filter((p) => p.id !== postId),
      }));
   }, []);

   const updatePost = useCallback(
      (postId: string, updates: Partial<PostWithDetails>) => {
         setState((prev) => ({
            ...prev,
            posts: prev.posts.map((p) =>
               p.id === postId ? { ...p, ...updates } : p
            ),
         }));
      },
      []
   );

   const refresh = useCallback(() => {
      setCursor(undefined);
      loadInitial();
   }, [loadInitial]);

   useEffect(() => {
      loadInitial();
   }, [loadInitial]);

   return {
      ...state,
      loadMore,
      addPost,
      removePost,
      updatePost,
      refresh,
   };
}

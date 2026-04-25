import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export interface LinkItem {
  id: number;
  url: string;
  title: string;
  tags?: string;
  created_at: string;
}

/**
 * FETCH LINKS: Infinite scrolling pagination
 * Fetches data in chunks (pages) of 20.
 */
export const useLinksQuery = () => {
  return useInfiniteQuery<LinkItem[]>({
    queryKey: ["links"], // Cache folder for all link pages
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get(`/links?page=${pageParam}&limit=20`);
      return data;
    },
    initialPageParam: 1,
    // Determines how to fetch the next page
    getNextPageParam: (lastPage, allPages) => {
      // If we got a full page (20), assume there's a next page
      return lastPage.length === 20 ? allPages.length + 1 : undefined;
    },
  });
};

/**
 * DELETE LINK
 */
export const useDeleteLinkMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/links/${id}`);
    },
    onSuccess: () => {
      // Invalidate the cache to refresh the UI
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
};

/**
 * REMOVE TAG FROM LINK
 */
export const useRemoveLinkTagMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ linkId, tagName }: { linkId: number; tagName: string }) => {
      await api.delete(`/links/${linkId}/tags/${tagName}`);
    },
    onSuccess: () => {
      // Invalidate the cache to show updated tags
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
};

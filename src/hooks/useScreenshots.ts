import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export interface Screenshot {
  id: number;
  filename: string;
  title: string;
  tags?: string;
  created_at: string;
}

/**
 * FETCH SCREENSHOTS: Infinite scrolling pagination
 */
export const useScreenshotsQuery = () => {
  return useInfiniteQuery<Screenshot[]>({
    queryKey: ["screenshots"], // Cache folder for all screenshot pages
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get(`/screenshots?page=${pageParam}&limit=20`);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // If we got a full page (20), assume there's a next page
      return lastPage.length === 20 ? allPages.length + 1 : undefined;
    },
  });
};

/**
 * DELETE SCREENSHOT
 */
export const useDeleteScreenshotMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/screenshots/${id}`);
    },
    onSuccess: () => {
      // Refresh the library UI
      queryClient.invalidateQueries({ queryKey: ["screenshots"] });
    },
  });
};

/**
 * REMOVE TAG FROM SCREENSHOT
 */
export const useRemoveScreenshotTagMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      screenshotId,
      tagName,
    }: {
      screenshotId: number;
      tagName: string;
    }) => {
      await api.delete(`/screenshots/${screenshotId}/tags/${tagName}`);
    },
    onSuccess: () => {
      // Refresh to show updated tags
      queryClient.invalidateQueries({ queryKey: ["screenshots"] });
    },
  });
};

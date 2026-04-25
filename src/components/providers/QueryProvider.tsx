"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      // to interact with cache
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minutes
            retry: 1,
          },
        },
      }),
  );

  return (
    // all components can access shared cache
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

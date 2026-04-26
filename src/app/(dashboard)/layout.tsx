"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Menu, Loader2 } from "lucide-react";
import QueryProvider from "@/components/providers/QueryProvider";
import { useUserQuery } from "@/hooks/useUser";
import { useRouter, usePathname } from "next/navigation";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: user, isLoading } = useUserQuery();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && user && !user.is_pro && pathname !== "/settings") {
      router.push("/upgrade");
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
      </div>
    );
  }

  const handleSuccess = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out lg:block shrink-0 h-full`}
      >
        <Sidebar
          onSuccess={handleSuccess}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      <main className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="lg:hidden h-16 border-b border-zinc-200 flex items-center justify-between px-4 bg-zinc-50 shrink-0">
          <h1 className="text-xl font-semibold tracking-tight text-black flex items-center gap-2">
            Snapterra
          </h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-zinc-600 hover:text-black"
          >
            <Menu size={24} />
          </button>
        </header>

        <section className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </section>
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <DashboardContent>{children}</DashboardContent>
    </QueryProvider>
  );
}

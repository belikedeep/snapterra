"use client";

import { useUserQuery } from "@/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import {
  Database,
  ShieldCheck,
  XCircle,
  Settings2,
  ArrowUpRight,
  User,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: user } = useUserQuery();
  const queryClient = useQueryClient();



  const handleCancelSubscription = async () => {
    if (
      !confirm(
        "Are you sure you want to cancel your subscription? You will lose Pro features at the end of your billing cycle.",
      )
    ) {
      return;
    }

    try {
      await api.post("/billing/cancel");
      toast.success(
        "Subscription cancellation requested. It may take a few moments to update.",
      );
      queryClient.invalidateQueries({ queryKey: ["user"] });
    } catch (err) {
      toast.error(
        "Failed to cancel subscription. Please try again or contact support.",
      );
    }
  };

  const storageLimit = user?.is_pro
    ? 10 * 1024 * 1024 * 1024
    : 100 * 1024 * 1024; // 10GB Pro, 100MB Free
  const storageUsed = parseInt(user?.storage_used || "0");
  const storagePercent = Math.min(
    Math.round((storageUsed / storageLimit) * 100),
    100,
  );

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Account Settings
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your subscription, storage, and profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <User size={18} className="text-zinc-400" />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Profile
              </h2>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">
                    {user?.email?.split("@")[0]}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Mail size={12} />
                    {user?.email}
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Account Type</span>
                  <span
                    className={`font-bold ${user?.is_pro ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-900 dark:text-white"}`}
                  >
                    {user?.is_pro ? "Pro Member" : "Free User"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Management */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Settings2 size={18} className="text-zinc-400" />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Subscription
              </h2>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between min-h-[160px]">
              <div>
                <p className="text-sm text-zinc-500 mb-2">Current Plan</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white">
                    {user?.is_pro ? "$6.9/mo" : "Free"}
                  </h3>
                  {user?.is_pro && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Active
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                {user?.is_pro ? (
                  <>
                    <button
                      onClick={handleCancelSubscription}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm font-bold"
                    >
                      <XCircle size={18} />
                      Cancel Subscription
                    </button>
                  </>
                ) : (
                  <Link
                    href="/upgrade"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-md"
                  >
                    <ArrowUpRight size={16} />
                    Upgrade to Pro
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Storage Overview */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Database size={18} className="text-zinc-400" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              Storage Usage
            </h2>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-3xl font-black text-zinc-900 dark:text-white">
                  {storagePercent}% used
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  {formatSize(storageUsed)} of {formatSize(storageLimit)}{" "}
                  utilized
                </p>
              </div>
              {!user?.is_pro && storagePercent > 80 && (
                <Link
                  href="/upgrade"
                  className="text-xs font-black text-indigo-600 hover:underline"
                >
                  Increase Limit
                </Link>
              )}
            </div>

            <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  storagePercent > 90
                    ? "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                    : "bg-black dark:bg-white"
                }`}
                style={{ width: `${storagePercent}%` }}
              />
            </div>

            <div className="flex items-start gap-4 p-5 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <ShieldCheck
                size={20}
                className="text-blue-500 mt-0.5 shrink-0"
              />
              <div className="space-y-1">
                <p className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-widest">
                  Storage Policy
                </p>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {user?.is_pro
                    ? "As a Pro member, you have a generous 10GB limit. Screenshots are optimized for fast delivery across your devices."
                    : "You are currently on the Free plan with a 100MB limit. If you cancel your subscription, we store your data for a 30-day grace period before cleanup begins."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { Workspace } from "./useWorkspace";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/services/auth.services";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: "USER" | "SUPER_ADMIN";
  plan: "FREE" | "PRO";
  lastLogDate: string;
  expiresAt: string;
  currentStreak: number;
  longestStreak: number;
  isDeleted: boolean;
  deletedAt: string | null;
  isBlocked: boolean;
  blockedReason: string | null;
  blockedAt: string | null;
  createdAt: string;
  updatedAt: string;
  workspaces: Workspace[];
}

export const useAuth = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await getUserInfo();
      return res.data;
    },
  });
};

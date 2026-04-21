
import { getUserInfo } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";
import { Workspace } from "./useWorkspace";

interface UserResponse {
  success: boolean;
  message: string;
  data: User | null;
}
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: string;
  plan: string;
  lastLogDate: string;
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
  return useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn:  getUserInfo,
    staleTime: Infinity,
    gcTime :Infinity,
    retryOnMount : false,
    refetchOnWindowFocus : false,
    retry: false,
    throwOnError : false
  });
};

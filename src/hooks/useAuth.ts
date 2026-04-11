import { getUserInfo } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";


export interface Workspace {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  members: Member[];
}

export interface Member {
  id: string;
  userId: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  joinedAt: string;
  deletedAt: string | null;
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
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await getUserInfo();
        return res.data;
      } catch (error) {
        console.log(error);
        throw null;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

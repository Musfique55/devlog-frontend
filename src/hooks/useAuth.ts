import { getUserInfo } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";

// {
//     "id": "MwnbaYs5AUWWLwouBHyhpo5TyW1HPDk9",
//     "name": "Musfique Shuvo",
//     "email": "mdmusfiquepatwary@gmail.com",
//     "emailVerified": true,
//     "image": null,
//     "role": "USER",
//     "plan": "FREE",
//     "lastLogDate": "2026-04-07T18:00:00.000Z",
//     "currentStreak": 2,
//     "longestStreak": 2,
//     "isDeleted": false,
//     "deletedAt": null,
//     "isBlocked": false,
//     "blockedReason": null,
//     "blockedAt": null,
//     "createdAt": "2026-04-07T11:53:23.837Z",
//     "updatedAt": "2026-04-08T08:42:23.673Z",
//     "workspaces": []
// }


interface User {
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
  workspaces: [];
}

export const useAuth = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await getUserInfo();
        return res.data;
      } catch (error) {
        console.log(error)
        throw null;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

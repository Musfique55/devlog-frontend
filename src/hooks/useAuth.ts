import { getUserInfo } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  return useQuery({
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

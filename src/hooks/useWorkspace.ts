import { getWorkspace } from "@/services/workspace.services";
import { useQuery } from "@tanstack/react-query";


export interface Member {
    id : string;
    workspaceId : string;
    userId : string;
    role : string;
    createdAt : string;
    updatedAt : string;
    joinedAt : string;
    deletedAt : string | null;
}

interface Workspace <T>{
    id : string;
    name : string;
    createdAt : string;
    updatedAt : string;
    deletedAt : string | null;
    isDeleted : boolean;
    isActive : boolean;
    members : T[]
}

const useWorkspace = <T>(id : string) => {
    return useQuery<Workspace<T>>({
    queryKey : ['workspace'],
    queryFn : async () => {
      const res = await getWorkspace(id);
      return res.data;
    },
    staleTime : 1000 * 60 * 5,// 5min
    retry : true
  })
};

export default useWorkspace;
"use client"

import { getWorkspace } from "@/services/workspace.services";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { WorkspaceResponse } from "./ui/sidebar";

const WorkspaceRedirectWrapper = ({id} : {id : string}) => {
    
    const {data : workspace,isLoading} = useQuery<WorkspaceResponse>({
        queryKey : ['workspace', id],
        queryFn : () => getWorkspace(id)
    })

    console.log(workspace);

    if(isLoading){
        return "loading....";
    }


    if(workspace?.data?.userRole === "ADMIN"){
        redirect(`/workspace/${id}/admin-dashboard`);
    }

    redirect(`/workspace/${id}/activity`);
};

export default WorkspaceRedirectWrapper;
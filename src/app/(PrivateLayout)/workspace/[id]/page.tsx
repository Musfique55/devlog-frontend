import { Workspace } from "@/hooks/useWorkspace";
import { getWorkspace } from "@/services/workspace.services";
import { redirect } from "next/navigation";

interface WorkspaceResponse  {
    data : Workspace | null;
    message : string;
    success : boolean;
}



const WorkspacePage = async ({params} : {params : Promise<{id : string}>}) => {
    const {id} = await params;
    const workspace : WorkspaceResponse = await getWorkspace(id);

    if(workspace.data?.userRole === "ADMIN"){
        redirect(`/workspace/${id}/admin-dashboard`);
    }

    redirect(`/workspace/${id}/activity`);

};

export default WorkspacePage;
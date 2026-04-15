import ActivityWrapper from "@/components/modules/(workspace)/activity-feed/activity-wrapper";
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
    
    return <main>
        <ActivityWrapper id={id}/>
    </main>

};

export default WorkspacePage;
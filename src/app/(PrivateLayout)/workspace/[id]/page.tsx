import { User, Workspace } from "@/hooks/useAuth";
import { getUserInfo } from "@/services/auth.services";
import { getWorkspace } from "@/services/workspace.services";
import { redirect } from "next/navigation";

interface WorkspacePromise {
    success : boolean;
    data? : Workspace;
    message : string;
}

interface UserPromise {
    success : boolean;
    data? : User;
    message : string;
}

const WorkspacePage = async ({params} : {params : Promise<{id : string}>}) => {
    const {id} = await params;
    
    const user : UserPromise = await getUserInfo();
    const workspace : WorkspacePromise = await getWorkspace(id);
    const member = workspace.data?.members.find((member) => member.userId === user.data?.id);
     
    if(member?.role === "ADMIN"){
        redirect(`/workspace/${id}/admin`);
    }else{
        redirect(`workspace/${id}/member`);
    }

};

export default WorkspacePage;
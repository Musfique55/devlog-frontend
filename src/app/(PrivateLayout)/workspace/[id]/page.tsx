
import WorkspaceRedirectWrapper from "@/components/modules/(workspace)/workspace-redirect-wrapper";


const WorkspacePage = async ({params} : {params : Promise<{id : string}>}) => {
    const {id} = await params;
    
    return <WorkspaceRedirectWrapper id={id}/>
};

export default WorkspacePage;
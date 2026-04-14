import ActivityWrapper from "@/components/modules/(workspace)/activity-feed/activity-wrapper";


const WorkspacePage = async ({params} : {params : Promise<{id : string}>}) => {
    const {id} = await params;
    
    return <main>
        <ActivityWrapper id={id}/>
    </main>

};

export default WorkspacePage;
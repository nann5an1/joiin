//this page will record the events the user has created
import Sidebar from '../components/sideBar';
export default async function managedCreateEvents(){
    try {
        //tweak the request to (where user_id = ?)
        //so retrieve the id from the user tables
        const response = await fetch(`http://localhost:3000/api/v0.1/user/created_events`, {method: 'GET'});
        if(response.ok)
            console.log("organizer created events", response);
    } catch (error) {
        console.error("Error fetching created events", error);
    }
    return(
        <div>
            <Sidebar />
            <main className="ml-64 p-6">
                Main content
                 {/*add the created events */}
            </main>
        </div>
    );
}
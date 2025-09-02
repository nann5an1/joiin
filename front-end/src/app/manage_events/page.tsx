//manage events home page for the user as the organizer
import Sidebar from '../components/sideBar';

export default function ManageEventsPage(){
    return (
        /*Side bar */
        <div>
            <Sidebar />
            <main className="ml-64 p-6">
                Main content
            </main>
        </div>
    )
}
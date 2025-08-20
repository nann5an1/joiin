import Sidebar from '../components/sideBar';

export default async function HistoryEventsPage(){
    return (
        <div>
            <Sidebar />
            <main className="ml-64 p-6">
                Main content
            </main>
        </div>
    );
}
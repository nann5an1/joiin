//this page will record the events the user has created
import React from 'react';
import Sidebar from '../components/sideBar';
export default async function managedCreateEvents(){
    try {
        // const token = sessionStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/v0.1/user/created_events`, {
            method: 'GET',
            credentials: 'include',
        });
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
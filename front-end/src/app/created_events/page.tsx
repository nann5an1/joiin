//this page will record the events the user has created
'use client';

import React, { use } from 'react';
import { useEffect } from 'react';
import Sidebar from '../components/sideBar';
export default function managedCreateEvents(){
    useEffect(() => {
        fetchUserCreatedEvents();
    })
    async function fetchUserCreatedEvents() {
        try {
            const response = await fetch("http://localhost:3000/api/v0.1/user/created_events", {
            method: "GET",
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            }
        });
        if(response.ok)
            console.log("organizer created events", response);
        } catch (error) {
            console.error("Error fetching created events", error);
        }
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
//this page will record the events the user has created
'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import Sidebar from '../components/sideBar';
import EventCard from '../components/eventCard';
import {X} from 'lucide-react';

interface Event {
    id: string | number;
    title: string;
    img?: string;
    start_date: string;
    end_date?: string;
    location: string;
    category: string;
    descrip?: string;
    pax?: string | number;
    fares: string | number;
}

export default function managedCreateEvents(){
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activities, setActivities] = useState<Event[]>([]);

    useEffect(() => {
        fetchUserCreatedEvents();
    }, [])
    async function fetchUserCreatedEvents() {
        try {
            const response = await fetch("http://localhost:3000/api/v0.1/user/created_events", {
            method: "GET",
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            }
        });
        if(response.ok){
            console.log("organizer created events", response);
            const data = await response.json();
            console.log("data in created events", data);
            setActivities(data);
        }
            
        } catch (error) {
            console.error("Error fetching created events", error);
            setError("Error fetching created events");
        } finally {
            setLoading(false); // Always set loading to false when done
        }
    }

    async function deleteCreatedEvent(event_id:string | number){
        try {
            const data = await fetch(`http://localhost:3000/api/v0.1/user/del_created_event?event_id=${event_id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            if(data.ok){
                console.log("event deleted", data);
                fetchUserCreatedEvents();
            }
        } catch (error) {
            console.error("something went wrong in deleting created event", error); 
        }
    }
    
    return(
        <div>
            <Sidebar />
             <EventCard
                activities={activities}
                loading={loading}
                error={error}
                onActionClick={(eventId: number) => deleteCreatedEvent(eventId)}
                actionIcon={<X color="#737373" size={24} strokeWidth={1.2} />}
                actionTooltip="Remove from favourites"
                />
        </div>
    );
}
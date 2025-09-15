//this page retrievs the interested events for that user has marked "interested"

'use client'

import Sidebar from '../components/sideBar';
import { X } from 'lucide-react';
import {useState, useEffect} from 'react';
import EventCard from '../components/eventCard';

interface Event{
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

export default function InterestedEventsPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activities, setActivities] = useState<Event[]>([]);


    useEffect(() => {
        getUserInterestedEvents();
    }, [])

    async function getUserInterestedEvents(){
        try {
             const data = await fetch(`http://localhost:3000/api/v0.1/user/interested_events`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            if (data.ok){
                console.log("Favourites Data Retrieved: ", data);
                const events = await data.json();
                console.log("events: ", events);
                setActivities(events);
            }
        } catch (error) {
            console.error("Error trying to fetch interested events");
            setError("Error trying to fetch interested events");
        }finally{
            setLoading(false);
        }
       
    }

    //delete interested event from the interested_events table
    async function removefromInterested(event_id: string | number) {
        console.log("event id to delete: ", event_id);
        const param = new URLSearchParams();
        param.append('event_id', event_id.toString()); //event_id=17
        try {
            const response = await fetch(`http://localhost:3000/api/v0.1/user/del_interested_event?${param}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        getUserInterestedEvents(); //do i need to recall this back? since the page will refresh due to useEffect
        if (response.ok){
            console.log("Favourites Data Deleted: ", response);
        }
        } catch (error) {
            console.log("Error deleting interested event: ", error);
        }
       
    }

    return (
        <div>
            <Sidebar />
            <EventCard
            activities={activities}
            loading={loading}
            error={error}
            onActionClick={(eventId: number) => removefromInterested(eventId)}
            actionIcon={<X color="#737373" size={24} strokeWidth={1.2} />}
            actionTooltip="Remove from favourites"
            />
        </div>
        
    )
}
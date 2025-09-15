//this page will be about the events the user wants to attend
'use client';

import {  Trash } from 'lucide-react';
import { useState, useEffect } from 'react';
import Sidebar from '../components/sideBar';
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

export default function AttendEventsPage(){
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activities, setActivities] = useState<Event[]>([]);
    
    useEffect(() => {
        fetchAttendingEvents();
    }, []);

    async function fetchAttendingEvents(){
        try {
            const data = await fetch("http://localhost:3000/api/v0.1/user/attend_events" , {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if(data.ok){
                console.log("Attend Events Data: ", data);
                setActivities(await data.json());  //convert the data to json and parse into the setActivities
            }  
            else
                console.log("Fail to fetch attend events");
        } catch (error) {
            console.log("Error causing to fetch attend events", error);
            setError("Error in fetching attending events for the user");
        }
        finally{
            setLoading(false);
        }
    }

    async function removeFromAttendingEvents(event_id: string | number){
        try {
            const param = new URLSearchParams();
            param.append('event_id', event_id.toString());   //event_id=17
            console.log("param: ", param);
            const data = await fetch(`http://localhost:3000/api/v0.1/user/remove_attending_events?${param}`,{
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            });
            fetchAttendingEvents(); //update the page with the remaining data
            if(data.ok)
                console.log("Removed from attending events Data: ", data);
            else console.log("Oops. something went wrong in removing from attending events");
        }
        catch{
            console.log("Error causing to remove from attending events");
        }
    }

    return (
        <div>
            <Sidebar />
            <EventCard 
            activities={activities}
            loading={loading}
            error={error}
            onActionClick={(eventId: number) => removeFromAttendingEvents(eventId)}
            actionIcon={<Trash color="#737373" size={24} strokeWidth={1.2} />}
            actionTooltip="Remove from favourites"
            />
        </div>
    );

}

'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
export default function EventDetails(){
    // const [eventId, setEventId] = useState<string | null>(null);

    const param = useSearchParams();
    const event_id = param.get('event_id');
    // setEventId(event_id);

    console.log("Event ID from Event Details: ", event_id);

    useEffect(() => {
        if(event_id)
            fetchEventDetails(event_id);
    }, [event_id]);

    async function fetchEventDetails(eventId: string | number){
        try {
            console.log("EventID check in fetch event details: ", event_id);
            const data = await fetch(`http://localhost:3000/api/v0.1/events/event_details?event_id=${eventId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if(data.ok){
                console.log("Get Event Details: ", data);
            }
            else{
                console.log("Fail to get event details");
            }
        } catch (error) {
            console.error("Error getting event details", error);
        }
    }
    return (
        <>
            <div>Event Details Page</div>
        </>

    );
}
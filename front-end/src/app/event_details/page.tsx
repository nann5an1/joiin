'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import {EventHeader} from "../components/EventHeader";
import { EventDetailsComponent } from "../components/EventDetails";
import { Separator } from "@/components/ui/separator";

interface Event{
    id: string | number;
    title: string;
    category: string;
    descrip: string;
    img: string;
    location: string;
    pax: number;
    org_name: string;
    org_email: string;
    org_phone: string;
    start_date: string;
    end_date: string;
    fares: string | number;
    e_status: string;
    tags: string[];
}

export default function EventDetails(){
    // const [eventId, setEventId] = useState<string | null>(null);
    const [eventData, setEventData] = useState<Event>({
        id: "",
        title: "",
        category: "",
        descrip: "",
        img: "",
        location: "",
        pax: 0,
        org_name: "",
        org_email: "",
        org_phone: "",
        start_date: "",
        end_date: "",
        fares: "",
        e_status: "",
        tags: []
    });

    // const {title, category, descrip, img, location, pax, org_name, org_email, org_phone, start_date, end_date, fares, e_status, tags} = eventData;
    const param = useSearchParams();
    const event_id = param.get('event_id');
    // setEventId(event_id);

    console.log("Event ID from Event Details: ", event_id);
    // console.log(title);
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
                const response = await data.json()
                console.log("response: ", response);
                if(response && response.length > 0) {
                    if(typeof(response[0].tags) == 'string')
                        response[0].tags = JSON.parse(response[0].tags);
                    setEventData(response[0]);
                console.log("Tags value:", response[0].tags);
                console.log("Tags type:", typeof response[0].tags);
                console.log("Is array:", Array.isArray(response[0].tags));
            }
            }
            else{
                console.log("Fail to get event details");
            }
        } catch (error) {
            console.error("Error getting event details", error);
        }
    }
    return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          {/* Event Header */}
          <EventHeader 
            title={eventData.title}
            date={eventData.start_date}
            time={eventData.end_date}
            location={eventData.location}
            attendees={eventData.pax}
            category={eventData.category}
            imageUrl={eventData.img}
          />

          <Separator />

          {/* Event Details */}
          <EventDetailsComponent 
            description={eventData.descrip}
            organizer_name={eventData.org_name}
            organizer_email={eventData.org_email}
            organizer_phone={eventData.org_phone}
            venue={eventData.location}
            tags={eventData.tags}
          />

          <Separator />

          {/* Event Agenda */}
          {/* <EventAgenda agenda={eventData.agenda} /> */}
        </div>
      </div>
    </div>
  );
}
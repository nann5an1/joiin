//this page is the GET page for the featured events
'use client'

import {useState, useEffect} from 'react';
import EventCard from "../components/eventCard";
import {useRouter} from "next/navigation";
import {Heart, Plus} from 'lucide-react';

interface Event{
    id: string | number,
    title: string,
    img?: string,
    start_date: string,
    end_date?: string,
    location: string,
    category: string,
    descrip?: string,
    pax?: string | number,
    fares: string | number
}

export  function FeaturedEventsSection(){
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activities, setActivities] = useState<Event[]>([]);
    useEffect(()=> {
        // postFeaturedEventsController();
        fetchFeaturedEvents();
    }, []);

    const router = useRouter();

    //the post is for testing for the localhost only
    async function postFeaturedEventsController() {
        try {
            const data = await fetch("http://localhost:3000/api/v0.1/events/post_featured_events", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if(data.ok){
                console.log("postFeaturedEventsController data: ", data);
                setLoading(false);
            }
        } catch (error) {
            setError("Failed to fetch results for the featured events.");
        }
    }

    async function fetchFeaturedEvents() {
        try {
             const data = await fetch("http://localhost:3000/api/v0.1/events/featured_events", {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            if(data.ok){
                console.log("fetchFeaturedEvents data: ", data);
                setActivities(await data.json());
                setLoading(false);
            }
            else console.log("Oops something went wrong in fetchingFeaturedEvents");
        } catch (error) {
            console.error("Error trying to fetch featured events", error);
            setError("Failed to fetch results for the featured events.")
        }
       
    }

    ///handle each of the actions under the event card
    async function handleInterestedEvents(eventId: number) {
        router.push("/upcoming_events/?interested=true&event_id=" + eventId);
    }

    async function handleJoinEvent(eventId: number) {
        router.push("/upcoming_events/?join_events=true?event_id=" + eventId);
    }

    async function eventDetails(eventId: number) {
        router.push("/upcoming_events/?event_details=true?event_id=" + eventId);
    }

    return (
        <>
            <button onClick={() => postFeaturedEventsController()}></button>
            <EventCard 
                activities={activities}
                loading={loading}
                error={error}
                onActionInterested={(eventId: number) => handleInterestedEvents(eventId)}
                onActionJoin={(eventId: number) => handleJoinEvent(eventId)}
                onActionDetails={(eventId: number) => eventDetails(eventId)}
                interestedIcon={<Heart color="#737373" size={24} strokeWidth={1.2} />}
                joinIcon={<Plus color="#737373" size={24} strokeWidth={1.2} />}
                />
        </>
    );
}



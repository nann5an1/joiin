//this page retrievs the interested events for that user has marked "interested"

'use client'

import Sidebar from '../components/sideBar';
import { X } from 'lucide-react';
import {useState, useEffect} from 'react';

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
           {/* Activities List */}
                <div className='ml-32 grid p-4 row-start-1 row-end-3 col-start-2 col-end-5'>
                     {loading && <p>Loading activities...</p>}
                     {error && <p className='text-red-500'>{error}</p>}
                     {!error && !loading && activities.length == 0 && <p>No activities found</p>}
                    <div className='grid grid-cols-3 grid-rows-1 gap-4 justify-start'>
                        {activities.map((event) => (
                        <div    
                            key={event.id}
                            className='w-full border-solid rounded-xl font-bodoni p-2 hover:shadow-xl'> 
                            <div className='p-4 flex flex-row justify-center items-center w-full'>
                               {event.img && <img className="w-full h-48 object-cover rounded-md" src={`http://localhost:3000${event.img}`} alt={event.title || ""} />}
                            </div>
                            <div className='flex flex-row justify-end mr-4'>
                                 {/* <span className="text-xs text-gray-500">
                                    {new Date(event.start_date).toLocaleDateString()}
                                </span> */}
                                <button type="button" data-tooltip-target="tooltip-quick-look" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only"> Quick look </span>
                                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        {/* <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                        <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /> */}
                                    </svg>
                                </button>
                                <button onClick={() => {
                                    removefromInterested(event.id)
                                }} type="button" data-tooltip-target="remove from favourites" className="rounded-full p-2 hover:bg-gray-100 ">
                                   <X color="#737373" size={24} strokeWidth={1.2} />
                                </button>
                            </div>
                            <div className="font-bodoni grid grid-cols-1 justify-center gap-2 p-2">
                                <p className="text-gray-900 text-xl font-bold">{event.title}</p>
                                {/* <p className="text-gray-800">{event.descrip}</p> */}
                                {/* <div className='flex flex-row justify-end col-gap-2'> */}
                                <p className="text-gray-700">{event.start_date}</p>
                                    {/* <p className="text-gray-800">{event.end_date}</p> */}
                                {/* </div> */}
                                <p className="text-gray-700">{event.location}</p>
                                <p className="text-gray-800">{event.category}</p>
                                {/* <p className="text-gray-800">{event.pax}</p> */}
                                <p className="text-gray-800 text-lg font-semibold">{event.fares}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
        </div>
        
    )
}
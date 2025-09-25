'use client'

import React from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState, useEffect} from 'react';
import {Heart} from 'lucide-react';
import { Plus } from 'lucide-react';
import EventCard from '../components/eventCard';

export default function upcomingeventsPage(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [recent, setRecentActivities] = useState(false);
    const [nearest, setNearestActivites] = useState(false);
    const [popular, setPopActivities] = useState(false);
    const [free, setFreeActivities]  = useState(false);
    
    // Get URL parameters once
    const parsed_eventId = searchParams.get('event_id') as string;
    const searchString = searchParams.get('search');
    
    // Handle URL parameters in useEffect to prevent infinite loops
    //this will come from the home page's event card(featured events)
    useEffect(() => {
        if (parsed_eventId != null) {
            const eventId = parseInt(parsed_eventId);
            if (searchParams.get('interested') == 'true') handleInterestedEvents(eventId);
            else if (searchParams.get('join_events') == 'true') handleJoinEvent(eventId);
            else if (searchParams.get('event_details') == 'true')  eventDetails(eventId);
        }
    }, [parsed_eventId, searchParams]);

    // Handle search in useEffect
    useEffect(() => {
        if (searchString != null && searchString.trim()) handleSearch(searchString);
        else fetchActivities();
    }, [searchString]); // Only depend on searchString

    // Handle filter changes
    useEffect(() => {
        // Only fetch activities if we're not searching
        if (!searchString) fetchActivities();
    }, [recent, nearest, popular, free, searchString]);

    async function fetchFromAPI(params: URLSearchParams){
        try {
            setLoading(true);
            setError(null);
            console.log("Fetching activities...");
            const response = await fetch(`http://localhost:3000/api/v0.1/events/allevents?${params}`, 
                {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json();
            console.log("Activities fetched:", data);
            // if(data.length == 0) setError("No activities found");
            setActivities(data);
        } catch (error: any) {
            console.error("Error fetching activities:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    function fetchActivities(){
        const params = new URLSearchParams();
        if (recent) params.append('recent', 'true');
        if (nearest) params.append('nearest', 'true');
        if (popular) params.append('popular', 'true');
        if (free) params.append('free', 'true');
        if (!recent && !nearest && !popular && !free) params.append('all', 'true');
        fetchFromAPI(params);
    }
       
    function handleCheckBoxChange(e: React.ChangeEvent<HTMLInputElement>){
        const {value, checked} = e.target;
        switch (value){
            case "recent":
                setRecentActivities(checked);
                break;
            case "nearest":
                setNearestActivites(checked);
                break;
            case "popular":
                setPopActivities(checked);
                break;
            case "free":
                setFreeActivities(checked);
                break;
        }
        // fetchActivities will be called by useEffect when state changes
    }

    async function handleInterestedEvents(interestedId: number){
        try {
            const param = new URLSearchParams();
            param.append('event_id', interestedId.toString());
            console.log("param: ", param);
            const data = await fetch (`http://localhost:3000/api/v0.1/events/interested_events?${param}`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            });
            if (data.ok){
                console.log("Favourites Data: ", data);
            }
            else{
                console.log("Fail to add to favourites");
            }
        } catch (error) {
            console.error("Error adding to favourites", error);
        }
    }

    async function handleJoinEvent(event_id: number){
        try {
            console.log("event id: ", event_id);
            const param = new URLSearchParams();
            param.append('event_id', event_id.toString());
            const data = await fetch(`http://localhost:3000/api/v0.1/events/join_events?${param}`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            });
            if(data.ok)
                console.log("Join Event Data: ", data);
            else {
                console.log("HTTP request failed:", data.status, data.statusText);
            }
        } catch (error) {
             console.error("Error adding to join events", error);
        }
    }

    async function eventDetails(event_id: number){
        try {
            router.push(`/event_details?event_id=${event_id}`);
        } catch (error) {
            console.error("Error getting event details", error);
        }
    }

    async function handleSearch(searchString: string){
        try {
            console.log("Search string before handleSearch: ", searchString);
            setLoading(true);
            const data = await fetch(`http://localhost:3000/api/v0.1/events/search_events?search=${searchString}`, {
            method: 'GET',
            credentials: 'include',   
            headers: {
                'Content-Type': 'application/json',
            },
        });
            if(data.ok){
                const response = await data.json();
                console.log("Search Data: ", response);
                if(!response || response.length == 0) {
                    console.log("Sorry! No search results");
                    setActivities([]); // Set empty array for no results
                } else {
                    setActivities(response);
                }
            }
            else {
                console.log("Oops something wrong with fetching SEARCHED events");
                setError("Error fetching search results");
            }
        } catch (error) {
            console.error("Error searching events", error);
            setError("error searching events");
        } finally {
            setLoading(false);
        }
    }

    return(
        <div>
            {/* Show search indicator */}
            {searchString && (
                <div className="p-4 bg-blue-50 border-b">
                    <p className="text-blue-800">
                        Search results for: "<strong>{searchString}</strong>"
                        <button 
                            onClick={() => router.push('/upcoming_events')}
                            className="ml-4 text-blue-600 underline"
                        >
                            Clear search
                        </button>
                    </p>
                </div>
            )}
            
            {/* Filter List */}
            <div className='p-10 grid grid-cols-4 grid-rows-4 w-full h-2/3'>
                <div className='w-2/3 border-2 border-solid border-gray-200 text-gray-800 ml-8 p-4'>
                    <fieldset>
                        <legend className='text-xl font-bold'>Keywords</legend>
                        <div className='grid grid-col-1 justify-left align-center gap-2 p-4'>
                            <div>
                                 <input
                                type="checkbox" 
                                className='w-4 h-4 default:outline-2 checked:bg-blue-500 appearance-none border-2'
                                value="recent"
                                checked={recent}
                                onChange={handleCheckBoxChange}
                                disabled={!!searchString} // Disable filters when searching
                                />
                                <label htmlFor="" className="pl-2">Recent Activities</label>
                            </div>
                            <div>
                                <input type="checkbox" 
                                className='w-4 h-4 appearance-none border-2'
                                value="nearest"
                                checked={nearest}
                                onChange={handleCheckBoxChange}
                                disabled={!!searchString}
                                />
                                <label htmlFor="" className="pl-2">Nearest Activities</label>
                            </div>
                            <div>
                                <input type="checkbox" 
                                className='w-4 h-4 appearance-none border-2'
                                value="popular"
                                checked={popular}
                                onChange={handleCheckBoxChange}
                                disabled={!!searchString}
                                />
                                <label htmlFor="" className="pl-2">Popular Activities</label>
                            </div>
                            <div>
                                 <input type="checkbox" 
                                className='w-4 h-4 appearance-none border-2'
                                value="free"
                                checked={free}
                                onChange={handleCheckBoxChange}
                                disabled={!!searchString}
                                />
                                <label htmlFor="" className="pl-2">Free Activities</label>
                            </div>
                        </div>
                    </fieldset>   
                </div>
                
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
            </div>
        </div>
    )
}
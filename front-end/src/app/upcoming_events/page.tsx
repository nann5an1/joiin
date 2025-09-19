'use client'

import React from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState, useEffect} from 'react';
import {Heart} from 'lucide-react';
import { Plus } from 'lucide-react';
import EventCard from '../components/eventCard';


export default function upcomingeventsPage(){
    const router = useRouter();
    const [activities, setActivities] = useState<any[]>([]);
    const [searchedActivities, setSearchedActivities] = useState<any[]>([]);
    // const [detailedActivity, setDetailedActivity] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // const [allActivities, setAllActivities] =  useState(true);
    const [recent, setRecentActivities] = useState(false);
    const [nearest, setNearestActivites] = useState(false);
    const [popular, setPopActivities] = useState(false);
    const [free, setFreeActivities]  = useState(false);
    // const [hasEventId, setEventId] = useState(false);
    // const [favourites, setFavourites] = useState(false);
    // const [interested, setInterested] = useState<number | null>(null);
    
    const parsed_eventId = useSearchParams().get('event_id') as string; //retrieve the event_id coming from the home page
    if(parsed_eventId != null){
        if(useSearchParams().get('interested') == 'true') handleInterestedEvents(parseInt(parsed_eventId));
        else if(useSearchParams().get('join_events') == 'true') handleJoinEvent(parseInt(parsed_eventId));
        else if(useSearchParams().get('event_details') == 'true') eventDetails(parseInt(parsed_eventId));
    }

    const searchString = useSearchParams().get('search'); //trimmed word ("hello world")
    console.log("Frontend search string: ", searchString);
    if(searchString != null) handleSearch(searchString);
    
    useEffect(()=> {
        fetchActivities();
        }, 
        [recent, nearest, popular, free]); //the array dependency list, if any of these values change, the useEffect is watching on them, it will run again
    async function fetchFromAPI(params: URLSearchParams){
        try { //fetch recent activites 2 created days from now and still active
            setLoading(true);
            setError(null);
            console.log("Fetching recent activities...");
            const response = await fetch(`http://localhost:3000/api/v0.1/events/allevents?${params}`, 
                {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json();
            console.log("Acitivities fetched:", data);
            setActivities(data);
        } catch (error: any) {
            console.error("Error fetching recent activities:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    function fetchActivities(){
        const params = new URLSearchParams(); //get the URL query parameters
        if (recent) params.append('recent', 'true');
        if (nearest) params.append('nearest', 'true');
        if (popular) params.append('popular', 'true');
        if (free) params.append('free', 'true');
        if (!recent && !nearest && !popular && !free) params.append('all', 'true');
        fetchFromAPI(params);
    }
       
    function handleCheckBoxChange(e: React.ChangeEvent<HTMLInputElement>){
        const {value, checked} = e.target; //e.taget here means the "input" the useState is handling as the object here element
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
        fetchActivities();
    }

    //this function will post/add the user's interested events
    async function handleInterestedEvents(interestedId: number){
        try {
            // console.log("event id: ", event_id);

            const param = new URLSearchParams();
            param.append('event_id', interestedId.toString()); // Will show: "event_id=17"
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
            param.append('event_id', event_id.toString());   //event_id=17
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

    //will retrieve the details of 'clicked' event
    async function eventDetails(event_id: number){
        try {
            router.push(`/event_details?event_id=${event_id}`);
        } catch (error) {
            console.error("Error getting event details", error);
        }
    }

    async function handleSearch(searchString: string){
        const data = await fetch(`http://localhost:3000/api/v0.1/events/search_events?${searchString}`, {
            method: 'GET',
            credentials: 'include',   
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(data.ok){
            const response = await data.json();
            console.log("Search Data: ", response);
            setActivities(response); //return the searched activities from the search bar
        }
    }

    return(
        <div>
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
                                onChange={handleCheckBoxChange}
                                />
                                <label htmlFor="" className="pl-2">Recent Activites</label>
                            </div>
                            <div>
                                <input type="checkbox" 
                                className='w-4 h-4 appearance-none border-2'
                                value="nearest"
                                onChange={handleCheckBoxChange}
                                />
                                <label htmlFor="" className="pl-2">Nearest Activites</label>
                            </div>
                            <div>
                                <input type="checkbox" 
                                className='w-4 h-4 appearance-none border-2'
                                value="popular"
                                onChange={handleCheckBoxChange}
                                />
                                <label htmlFor="" className="pl-2">Popular Activites</label>
                            </div>
                            <div>
                                 <input type="checkbox" 
                                className='w-4 h-4 appearance-none border-2'
                                value="free"
                                onChange={handleCheckBoxChange}
                                />
                                <label htmlFor="" className="pl-2">Free Activites</label>
                            </div>
                           
                         </div>
                    </fieldset>   
                </div>
                
                <EventCard 
                activities={activities}
                loading={loading}
                error={error}
                onActionInterested={(eventId: number) => handleInterestedEvents(eventId)}
                onActionJoin={
                    (eventId: number) => handleJoinEvent(eventId)

                }
                onActionDetails={(eventId: number) => eventDetails(eventId)}
                interestedIcon={<Heart color="#737373" size={24} strokeWidth={1.2} />}
                joinIcon={<Plus color="#737373" size={24} strokeWidth={1.2} />}
                />
            </div>
        </div>
    )
}
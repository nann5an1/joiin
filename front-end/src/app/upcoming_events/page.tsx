'use client'

import React from 'react';
import {useState, useEffect} from 'react';
import {Heart} from 'lucide-react';
import { Plus } from 'lucide-react';

export default function upcomingeventsPage(){
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // const [allActivities, setAllActivities] =  useState(true);
    const [recent, setRecentActivities] = useState(false);
    const [nearest, setNearestActivites] = useState(false);
    const [popular, setPopActivities] = useState(false);
    const [free, setFreeActivities]  = useState(false);
    // const [favourites, setFavourites] = useState(false);
    // const [interested, setInterested] = useState<number | null>(null);

     useEffect(()=> {
        fetchActivities();
        // if(favourites && interested != null) handleInterestedEvents(interested);
        // setInterested(null);
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
            // const flat = data.flat(); //flatten the nested array into a single array
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
            else
                console.log("Fail to join event");
        } catch (error) {
             console.error("Error adding to join events", error);
        }
    }

    return(
        <div>
            {/* Filter List */}
            <div className='p-10 grid grid-cols-4 grid-rows-4 w-full h-2/3'>
                <div className='w-2/3 border-2 border-solid border-gray-200 text-gray-800 p-2'>
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
                {/* Activities List */}
                <div className='grid p-4 row-start-1 row-end-3 col-start-2 col-end-5'>
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
                                {/* <button type="button" data-tooltip-target="tooltip-quick-look" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            
                                </button> */}
                                <label className="cursor-pointer">
                                    <input 
                                    type="checkbox"
                                    onChange={() => {
                                        handleInterestedEvents(event.id);
                                        // if(!favourites){
                                        //     setFavourites(true);
                                        //     setInterested(event.id);
                                        // }   
                                        // else
                                        //     setFavourites(false);
                                    }}
                                    className="sr-only" // Hide the actual checkbox
                                    />
                                    <div className="rounded-full p-2 hover:bg-gray-100">
                                        <Heart 
                                            // color={favourites ? "#ef4444" : "#737373"} // Red when favorited, gray when not
                                            // fill={favourites ? "#ef4444" : "none"} // Filled when favorited
                                            size={24} 
                                            strokeWidth={1.2} 
                                        />
                                    </div>
                                </label>
                                 <label className="cursor-pointer">
                                    <input 
                                    type="button"
                                    onClick={() => {
                                        handleJoinEvent(event.id);
                                    }}
                                    className="sr-only" // Hide the actual checkbox
                                    />
                                    <div className="rounded-full p-2 hover:bg-gray-100">
                                        <Plus 
                                            // color={favourites ? "#ef4444" : "#737373"} // Red when favorited, gray when not
                                            // fill={favourites ? "#ef4444" : "none"} // Filled when favorited
                                            size={24} 
                                            strokeWidth={1.2} 
                                        />
                                    </div>
                                </label>
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
        </div>
    )
}
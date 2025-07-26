'use client'

import React from 'react';
import {useState, useEffect} from 'react';

export default function upcomingeventsPage(){

    async function authenticateUser() {
        try {
            const response = await fetch('http://localhost:3000/api/v0.1/', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                console.log("User authenticated successfully");
            } else {
                console.error("Authentication failed");
            }
        } catch (error) {
            console.error("Error during authentication:", error);
        }
    }

    const [recent, setRecentActivities] = useState(false);
    const [nearest, setNearestActivites] = useState(false);
    const [popular, setPopActivities] = useState(false);
    const [free, setFreeActivities] = useState(false);
     useEffect(()=> {
        fetchActivities();
        }, 
        [recent, nearest, popular, free]); //the array dependency list, if any of these values change, the useEffect is watching on them, it will run again
    async function fetchFromAPI(params: URLSearchParams){
        try { //fetch recent activites 2 created days from now and still active
            console.log("Fetching recent activities...");
            console.log("Params:", params.toString());
            const response = await fetch(`http://localhost:3000/api/v0.1/events/allevents?${params}`, 
                {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (response.ok){
                console.log("Recent activities fetched successfully");
            }
        } catch (error) {
            console.error("Error fetching recent activities:", error);
        }
    }
    function fetchActivities(){
        const params = new URLSearchParams();
        if (recent) params.append('recent', 'true');
        if (nearest) params.append('nearest', 'true');
        if (popular) params.append('popular', 'true');
        if (free) params.append('free', 'true');
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
    return(
        <div>
            <div className='grid grid-cols-2 w-full h-full'>
                <div className='w-1/3 border-2 border-solid border-gray-700 text-gray-800 p-5 m-5'>
                    <fieldset>
                        <legend className='text-xl font-bold'>Keywordshello</legend>
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
                            {/* <div>

                            </div> */}
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
                           
                            {/* <input type="range" />
                            <label htmlFor=""></label> */}
                         </div>
                    </fieldset>   
                </div>
                <div className='border-2 border-solid border-gray-700'>
                    products
                </div>
            </div>
        </div>
    )
}
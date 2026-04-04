'use client';

import Link from "next/link";
import { Info, Heart, CalendarPlus, Handshake, History, ListCheck } from 'lucide-react';

export default function SideBar(){
    return(
        <aside className="fixed top-0 left-0 h-full w-46 bg-gray-300 text-white p-4">{/* maybe delete this one and just make the below div as floating sidebar*/}
                <div className="grid grid-rows-12 w-16 row-gap-4 justify-center mt-16">{/*panel feature */}
                    <div className="w-12 h-12 row-start-2 bg-gray-200 rounded-xl justify-center p-2">
                        {/* <img className="w-full" src="calender.svg" alt="" /> */}
                        <Link href="/create">
                            <CalendarPlus color="#737373" size={32} strokeWidth={1.5}/>
                        </Link>
                    </div>
                     <div className="w-12 h-12 row-start-3 bg-gray-200 rounded-xl justify-center p-2">
                        {/* <img className="w-full" src="attend.svg" alt="" /> */}
                        <Link href="/created_events">
                            <ListCheck color="#737373" size={32} strokeWidth={1.5}/>
                        </Link>
                        
                    </div>
                    <div className="w-12 h-12 row-start-4 bg-gray-200 rounded-xl justify-center p-2">
                        {/* <img className="w-full" src="interested.svg" alt="" /> */}
                        
                        <Link href="/interested_events">
                            <Heart color="#737373" size={32} strokeWidth={1.5}/>
                        </Link>
                    </div>
                    <div className="w-12 h-12 row-start-5 bg-gray-200 rounded-xl justify-center p-2">
                        {/* <img className="w-full" src="attend.svg" alt="" /> */}
                        
                        <Link href="/attend_events">
                            <Handshake color="#737373" size={32} strokeWidth={1.5}/>
                        </Link>
                        
                    </div>
                    <div className="w-12 h-12 row-start-6 bg-gray-200 rounded-xl justify-center p-2">
                        {/* <img className="w-full" src="history.svg" alt="" /> */}
                        
                        <Link href="/history_events">
                            <History color="#737373" size={32} strokeWidth={1.5}/>
                        </Link>
                    </div>
                    <div className="w-12 h-12 row-start-10 bg-gray-200 rounded-xl justify-center p-2">
                        <Link href="/info">
                            <Info color="#737373" size={32} strokeWidth={1.5}/>
                        </Link>
                    </div>
                </div>
            </aside>
    )
}
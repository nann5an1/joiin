import Link from "next/link";
import { House,Info, Heart, CalendarPlus, Handshake, History } from 'lucide-react';

export default function ManageEventsPage(){
    return (
        /*Side bar */
        <div>
            <aside className="fixed top-0 left-0 h-full w-46 bg-gray-300 text-white p-4">{/* maybe delete this one and just make the below div as floating sidebar*/}
                <div className="grid grid-rows-10 w-16 row-gap-4 justify-center mt-16">{/*panel feature */}
                    <div className="w-12 h-12 row-start-1 bg-gray-200 rounded-xl justify-center p-2">{/*button-like feature still implemented in each img*/}
                        {/* <img className="w-full" src="house.svg" alt="" /> */}
                        
                        <Link href="/manage_events">
                            <House color="#737373" size={32} strokeWidth={1.5}/>
                        </Link>
                    </div>
                    <div className="w-12 h-12 row-start-2 bg-gray-200 rounded-xl justify-center p-2">
                        {/* <img className="w-full" src="calender.svg" alt="" /> */}
                        <CalendarPlus color="#737373" size={32} strokeWidth={1.5}/>
                        <Link href="/create"></Link>
                    </div>
                    <div className="w-12 h-12 row-start-3 bg-gray-200 rounded-xl justify-center p-2">
                        {/* <img className="w-full" src="interested.svg" alt="" /> */}
                        <Heart color="#737373" size={32} strokeWidth={1.5}/>
                        <Link href="/interested_events"></Link>
                    </div>
                    <div className="w-12 h-12 row-start-4 bg-gray-200 rounded-xl justify-center p-2">
                        {/* <img className="w-full" src="attend.svg" alt="" /> */}
                        <Handshake color="#737373" size={32} strokeWidth={1.5}/>
                        <Link href="/attend_events"></Link>
                        
                    </div>
                    <div className="w-12 h-12 row-start-5 bg-gray-200 rounded-xl justify-center p-2">
                        {/* <img className="w-full" src="history.svg" alt="" /> */}
                        <History color="#737373" size={32} strokeWidth={1.5}/>
                        <Link href="/history_events"></Link>
                    </div>
                    <div className="w-12 h-12 row-start-10 bg-gray-200 rounded-xl justify-center p-2">
                        <Info color="#737373" size={32} strokeWidth={1.5}/>
                    </div>
                </div>
            </aside>

            <main className="ml-64 p-6">
                Main content
            </main>
        </div>
    )
}
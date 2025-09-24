'use client'

import {Badge} from "@/components/ui/badge"
import {Separator} from "@/components/ui/separator"
import {Card, CardTitle} from "@/components/ui/card"
import { MapPin, Calendar, Users, Clock, Ticket } from "lucide-react";
import {format} from 'date-fns';

export default function EventCard({
  activities, 
  loading, 
  error, 
  onActionClick,
  onActionInterested,
  onActionJoin,
  onActionDetails,
  interestedIcon,
  joinIcon,
  actionIcon, 
  actionTooltip,
}: any) {
    // const [formattedDate, setFormattedDate] = useState('');
    // // const [originalDate, setOriginalDate] = useState('');
    // function changeDateFormat(originalDate :any){
    //     setFormattedDate(format(originalDate, 'dd/MM/yyyy HH:mm'));
    //     return formattedDate;
    // }

    return (
        <>
        {/* Activities List */}
        <div className='ml-20 grid p-4 row-start-1 row-end-3 col-start-2 col-end-5'>
            {loading && <p>Loading activities...</p>}
            {error && <p className='text-red-500'>{error}</p>}
            {!error && !loading && activities.length === 0 && <p>No activities found</p>}
            
            <div className='grid grid-cols-3 grid-rows-1 gap-4 justify-start'>
                {/* <Card> */}
                    {activities.map((event: any) => (
                    <div    
                        key={event.id}
                        className='w-full border-solid-1 rounded-xl font-bodoni p-2 hover:shadow-xl'>
                        
                        <div className='p-4 flex flex-row justify-center items-center w-full'>
                        {event.img && <img className="w-full h-48 object-cover rounded-md" src={`http://localhost:3000${event.img}`} alt={event.title || ""} />}
                        </div>
                        
                        <div className="flex flex-row justify-start items-center">
                            <Badge variant="secondary" className="ml-4 mr-40 bg-white/90 text-primary">
                                {event.category}
                            </Badge>
                            <div className='flex flex-row justify-end mr-4'>
                                {onActionInterested && (
                                    <button 
                                        onClick={() => onActionInterested(event.id)} 
                                        type="button" 
                                        data-tooltip-target={actionTooltip} 
                                        className="rounded-full p-2 hover:bg-gray-100"
                                    >
                                        {interestedIcon}
                                    </button>
                                )}
                                {onActionJoin && (
                                    <button 
                                        onClick={() => onActionJoin(event.id)} 
                                        type="button" 
                                        data-tooltip-target={actionTooltip} 
                                        className="rounded-full p-2 hover:bg-gray-100"
                                    >
                                        {joinIcon}
                                    </button>
                                )}
                                {/* Action Button - only show if onActionClick is provided */}
                                {onActionClick && (
                                    <button 
                                        onClick={() => onActionClick(event.id)} 
                                        type="button" 
                                        data-tooltip-target={actionTooltip} 
                                        className="rounded-full p-2 hover:bg-gray-100"
                                    >
                                        {actionIcon}
                                    </button>
                                )}
                            </div>
                        </div>
                            <div onClick={() => onActionDetails?.(event.id)}
                            className="font-bodoni grid grid-cols-1 justify-center gap-2 p-2">
                                <CardTitle>
                                    <p className="text-gray-900 text-xl font-bold">{event.title}</p>
                                </CardTitle>
                                
                                <div className="grid grid-cols-10 text-gray-700">
                                    <div className="col-start-1 justify-items-center">
                                        <MapPin className="h-4 w-4"/>
                                    </div>
                                    <div className="col-start-2 col-span-9">
                                        {event.location}
                                    </div>          
                                </div>
                                <div className="grid grid-cols-10 text-gray-700">
                                    <div className="col-start-1 justify-items-center">
                                        <Calendar className="h-4 w-4"/>
                                    </div>
                                    <div className="col-start-2 col-span-9">
                                        {format(event.start_date, "dd/MM/yyyy HH:mm")}
                                    </div>    
                                </div>

                                <div className="grid grid-cols-10 text-gray-700">
                                    <div className="col-start-1 justify-items-center">
                                        <Clock className="h-4 w-4"/>
                                    </div>
                                    <div className="col-start-2 col-span-9">
                                        {format(event.start_date, "dd/MM/yyyy HH:mm")}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-10 text-gray-700">
                                    <div className="col-start-1 justify-items-center">
                                        <Users className="h-4 w-4"/>
                                    </div>
                                    <div className="col-start-2 col-span-9">
                                        {event.pax} participants
                                    </div>    
                                </div>
                                <Separator />
                                <div className="grid grid-cols-10"> 
                                    <div className="col-start-1">
                                        <Ticket className="h-4 w-4 mr-2"/>Ticket
                                    </div>
                                    <div className="col-start-3 col-span-5">
                                        <Badge variant="secondary">$ {event.fares}</Badge>
                                    </div>
                                </div>
                            </div>
                            
                    </div>
                    ))}
                {/* </Card> */}
            </div>
        </div>
        </>
    )
}
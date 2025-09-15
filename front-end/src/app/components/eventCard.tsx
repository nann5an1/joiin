'use client'

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
    return (
        <>
        {/* Activities List */}
        <div className='ml-20 grid p-4 row-start-1 row-end-3 col-start-2 col-end-5'>
            {loading && <p>Loading activities...</p>}
            {error && <p className='text-red-500'>{error}</p>}
            {!error && !loading && activities.length === 0 && <p>No activities found</p>}
            
            <div className='grid grid-cols-3 grid-rows-1 gap-4 justify-start'>
                {activities.map((event: any) => (
                <div    
                    key={event.id}
                    className='w-full border-solid rounded-xl font-bodoni p-2 hover:shadow-xl'>
                    
                    <div className='p-4 flex flex-row justify-center items-center w-full'>
                       {event.img && <img className="w-full h-48 object-cover rounded-md" src={`http://localhost:3000${event.img}`} alt={event.title || ""} />}
                    </div>
                    
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
                        <div onClick={() => onActionDetails?.(event.id)}
                        className="font-bodoni grid grid-cols-1 justify-center gap-2 p-2">
                            <p className="text-gray-900 text-xl font-bold">{event.title}</p>
                            <p className="text-gray-700">{event.start_date}</p>
                            <p className="text-gray-700">{event.location}</p>
                            <p className="text-gray-800">{event.category}</p>
                            <p className="text-gray-800 text-lg font-semibold">{event.fares}</p>
                        </div>
                </div>
                ))}
            </div>
        </div>
        </>
    )
}
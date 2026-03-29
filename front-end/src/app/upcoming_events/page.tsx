'use client'
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Heart, Plus } from 'lucide-react';
import EventCard from '../components/eventCard';
import { useAllEvents, useSearchEvents, useJoinEvent, useAddInterestedEvent } from '@/hooks/useEvents';

export default function UpcomingEventsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [recent, setRecentActivities] = useState(false);
    const [nearest, setNearestActivites] = useState(false);
    const [popular, setPopActivities] = useState(false);
    const [free, setFreeActivities] = useState(false);

    const parsed_eventId = searchParams.get('event_id') as string;
    const searchString = searchParams.get('search') ?? '';

    // useAllEvents: queryKey is ["allEvents", { recent, nearest, popular, free }]
    // When a checkbox changes, the filters object changes, the key changes,
    // and TanStack Query refetches automatically — no manual useEffect needed.
    const { data: allActivities = [], isLoading: allLoading, isError: allError } = useAllEvents(
        { recent, nearest, popular, free }
    );

    // useSearchEvents: only fires when searchString.length > 0 (enabled is built into the hook).
    // While not searching, it returns empty data and makes no network request.
    const { data: searchActivities = [], isLoading: searchLoading, isError: searchError } = useSearchEvents(searchString);

    // Pick which dataset to display depending on whether the user is searching
    const activities = searchString ? searchActivities : allActivities;
    const loading = searchString ? searchLoading : allLoading;
    const error = (searchString ? searchError : allError) ? "Error fetching events." : null;

    const { mutate: joinEvent } = useJoinEvent();
    const { mutate: addInterested } = useAddInterestedEvent();

    // Handle URL params that arrive from the home page's featured event cards
    useEffect(() => {
        if (parsed_eventId != null) {
            const eventId = parseInt(parsed_eventId);
            if (searchParams.get('interested') === 'true') addInterested(eventId);
            else if (searchParams.get('join_events') === 'true') joinEvent(eventId);
            else if (searchParams.get('event_details') === 'true') router.push(`/event_details?event_id=${eventId}`);
        }
    }, [parsed_eventId, searchParams]);

    function handleCheckBoxChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value, checked } = e.target;
        switch (value) {
            case "recent": setRecentActivities(checked); break;
            case "nearest": setNearestActivites(checked); break;
            case "popular": setPopActivities(checked); break;
            case "free": setFreeActivities(checked); break;
        }
        // No manual fetch call needed — changing the filter state changes the queryKey,
        // and TanStack Query refetches useAllEvents automatically
    }

    return (
        <div>
            {searchString && (
                <div className="p-4 bg-blue-50 border-b">
                    <p className="text-blue-800">
                        Search results for: "<strong>{searchString}</strong>"
                        <button onClick={() => router.push('/upcoming_events')} className="ml-4 text-blue-600 underline">
                            Clear search
                        </button>
                    </p>
                </div>
            )}

            <div className='p-10 grid grid-cols-4 grid-rows-4 w-full h-2/3'>
                <div className='w-2/3 border-2 border-solid border-gray-200 text-gray-800 ml-8 p-4'>
                    <fieldset>
                        <legend className='text-xl font-bold'>Keywords</legend>
                        <div className='grid grid-col-1 justify-left align-center gap-2 p-4'>
                            <div>
                                <input type="checkbox" className='w-4 h-4 default:outline-2 checked:bg-blue-500 appearance-none border-2' value="recent" checked={recent} onChange={handleCheckBoxChange} disabled={!!searchString} />
                                <label className="pl-2">Recent Activities</label>
                            </div>
                            <div>
                                <input type="checkbox" className='w-4 h-4 appearance-none border-2' value="nearest" checked={nearest} onChange={handleCheckBoxChange} disabled={!!searchString} />
                                <label className="pl-2">Nearest Activities</label>
                            </div>
                            <div>
                                <input type="checkbox" className='w-4 h-4 appearance-none border-2' value="popular" checked={popular} onChange={handleCheckBoxChange} disabled={!!searchString} />
                                <label className="pl-2">Popular Activities</label>
                            </div>
                            <div>
                                <input type="checkbox" className='w-4 h-4 appearance-none border-2' value="free" checked={free} onChange={handleCheckBoxChange} disabled={!!searchString} />
                                <label className="pl-2">Free Activities</label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <EventCard
                    activities={activities}
                    loading={loading}
                    error={error}
                    onActionInterested={(eventId: number) => addInterested(eventId)}
                    onActionJoin={(eventId: number) => joinEvent(eventId)}
                    onActionDetails={(eventId: number) => router.push(`/event_details?event_id=${eventId}`)}
                    interestedIcon={<Heart color="#737373" size={24} strokeWidth={1.2} />}
                    joinIcon={<Plus color="#737373" size={24} strokeWidth={1.2} />}
                />
            </div>
        </div>
    );
}

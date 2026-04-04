'use client';
import { useSearchParams } from 'next/navigation';
import { EventDetailsComponent } from '../components/EventDetails';
import { useEventDetails, useJoinEvent, useAddInterestedEvent } from '@/hooks/useEvents';

export default function EventDetails() {
    const param = useSearchParams();
    const event_id = param.get('event_id');

    const { data: rawData, isLoading, isError } = useEventDetails(event_id);
    const { mutate: joinEvent } = useJoinEvent();
    const { mutate: addInterested } = useAddInterestedEvent();

    if (isLoading) return <div className="p-10 text-center">Loading event...</div>;
    if (isError) return <div className="p-10 text-center text-red-500">Failed to load event details.</div>;

    const eventData = rawData?.[0] ?? null;
    if (!eventData) return null;

    const tags = typeof eventData.tags === 'string'
        ? JSON.parse(eventData.tags)
        : (eventData.tags ?? []);

    return (
        <EventDetailsComponent
            title={eventData.title}
            start_date={eventData.start_date}
            end_date={eventData.end_date}
            location={eventData.location}
            pax={eventData.pax}
            current_count={eventData.current_count}
            category={eventData.category}
            imageUrl={eventData.img}
            description={eventData.descrip}
            org_name={eventData.org_name}
            fares={eventData.fares}
            tags={tags}
            onRegister={() => joinEvent(Number(event_id))}
            onSave={() => addInterested(Number(event_id))}
        />
    );
}

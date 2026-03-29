'use client';
import { useSearchParams } from 'next/navigation';
import { EventHeader } from "../components/EventHeader";
import { EventDetailsComponent } from "../components/EventDetails";
import { Separator } from "@/components/ui/separator";
import { useEventDetails } from '@/hooks/useEvents';

export default function EventDetails() {
    const param = useSearchParams();
    const event_id = param.get('event_id');

    // useQuery — enabled: event_id != null is built into the hook,
    // so it won't fire until the URL param is available
    const { data: rawData, isLoading, isError } = useEventDetails(event_id);

    if (isLoading) return <div className="p-10 text-center">Loading event...</div>;
    if (isError) return <div className="p-10 text-center text-red-500">Failed to load event details.</div>;

    const eventData = rawData?.[0] ?? null;
    if (!eventData) return null;

    // Tags may come back as a JSON string from the backend — parse if needed
    const tags = typeof eventData.tags === 'string' ? JSON.parse(eventData.tags) : (eventData.tags ?? []);

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-12">
                    <EventHeader
                        title={eventData.title}
                        date={eventData.start_date}
                        time={eventData.end_date}
                        location={eventData.location}
                        attendees={eventData.pax}
                        category={eventData.category}
                        imageUrl={eventData.img}
                    />
                    <Separator />
                    <EventDetailsComponent
                        description={eventData.descrip}
                        organizer_name={eventData.org_name}
                        organizer_email={eventData.org_email}
                        organizer_phone={eventData.org_phone}
                        venue={eventData.location}
                        tags={tags}
                    />
                    <Separator />
                </div>
            </div>
        </div>
    );
}

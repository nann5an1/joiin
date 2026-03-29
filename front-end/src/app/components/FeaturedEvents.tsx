'use client'
import EventCard from "../components/eventCard";
import { useRouter } from "next/navigation";
import { Heart, Plus } from 'lucide-react';
import { useFeaturedEvents } from '@/hooks/useEvents';

export function FeaturedEventsSection() {
    const router = useRouter();

    // useQuery auto-fetches when the component mounts.
    // isLoading / isError replace the manual useState(true) / useState(null) pattern.
    const { data: activities = [], isLoading, isError } = useFeaturedEvents();

    const error = isError ? "Failed to fetch featured events." : null;

    function handleInterestedEvents(eventId: number) {
        router.push("/upcoming_events/?interested=true&event_id=" + eventId);
    }

    function handleJoinEvent(eventId: number) {
        router.push("/upcoming_events/?join_events=true?event_id=" + eventId);
    }

    function eventDetails(eventId: number) {
        router.push("/upcoming_events/?event_details=true?event_id=" + eventId);
    }

    return (
        <EventCard
            activities={activities}
            loading={isLoading}
            error={error}
            onActionInterested={(eventId: number) => handleInterestedEvents(eventId)}
            onActionJoin={(eventId: number) => handleJoinEvent(eventId)}
            onActionDetails={(eventId: number) => eventDetails(eventId)}
            interestedIcon={<Heart color="#737373" size={24} strokeWidth={1.2} />}
            joinIcon={<Plus color="#737373" size={24} strokeWidth={1.2} />}
        />
    );
}

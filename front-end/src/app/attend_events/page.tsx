'use client';
import { Trash } from 'lucide-react';
import Sidebar from '../components/sideBar';
import EventCard from '../components/eventCard';
import { useAttendingEvents, useRemoveAttendingEvent } from '@/hooks/useUserEvents';

export default function AttendEventsPage() {
    // useQuery — fetches list on mount, re-fetches whenever the cache is invalidated
    const { data: activities = [], isLoading, isError } = useAttendingEvents();

    // useMutation — after success, invalidateQueries(["attendingEvents"]) triggers a refetch above.
    // This replaces the old pattern of manually calling fetchAttendingEvents() after deletion.
    const { mutate: removeEvent } = useRemoveAttendingEvent();

    const error = isError ? "Error fetching attending events." : null;

    return (
        <div>
            <Sidebar />
            <EventCard
                activities={activities}
                loading={isLoading}
                error={error}
                onActionClick={(eventId: number) => removeEvent(eventId)}
                actionIcon={<Trash color="#737373" size={24} strokeWidth={1.2} />}
                actionTooltip="Remove from attending"
            />
        </div>
    );
}

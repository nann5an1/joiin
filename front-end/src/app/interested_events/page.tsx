'use client'
import Sidebar from '../components/sideBar';
import { X } from 'lucide-react';
import EventCard from '../components/eventCard';
import { useInterestedEvents, useRemoveInterestedEvent } from '@/hooks/useUserEvents';

export default function InterestedEventsPage() {
    // useQuery — fetches interested events on mount
    const { data: activities = [], isLoading, isError } = useInterestedEvents();

    // useMutation — on success, invalidateQueries(["interestedEvents"]) causes the list to refetch.
    // You previously asked "do I need to recall this?" — with TanStack Query, you don't.
    const { mutate: removeEvent } = useRemoveInterestedEvent();

    const error = isError ? "Error fetching interested events." : null;

    return (
        <div>
            <Sidebar />
            <EventCard
                activities={activities}
                loading={isLoading}
                error={error}
                onActionClick={(eventId: number) => removeEvent(eventId)}
                actionIcon={<X color="#737373" size={24} strokeWidth={1.2} />}
                actionTooltip="Remove from favourites"
            />
        </div>
    );
}

'use client';
import React from 'react';
import Sidebar from '../components/sideBar';
import EventCard from '../components/eventCard';
import { X } from 'lucide-react';
import { useCreatedEvents, useDeleteCreatedEvent } from '@/hooks/useUserEvents';

export default function ManagedCreateEvents() {
    // useQuery — fetches list on mount, re-fetches when cache is invalidated
    const { data: activities = [], isLoading, isError } = useCreatedEvents();

    // useMutation — on success, invalidateQueries(["createdEvents"]) triggers a refetch above.
    // Replaces the old pattern of manually calling fetchUserCreatedEvents() after delete.
    const { mutate: deleteEvent } = useDeleteCreatedEvent();

    const error = isError ? "Error fetching created events." : null;

    return (
        <div>
            <Sidebar />
            <EventCard
                activities={activities}
                loading={isLoading}
                error={error}
                onActionClick={(eventId: number) => deleteEvent(eventId)}
                actionIcon={<X color="#737373" size={24} strokeWidth={1.2} />}
                actionTooltip="Delete event"
            />
        </div>
    );
}

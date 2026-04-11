'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Heart, Plus, Filter, Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import EventCard from '../components/eventCard';
import { useAllEvents, useSearchEvents, useJoinEvent, useAddInterestedEvent } from '@/hooks/useEvents';
import { useAttendingEvents, useInterestedEvents, useRemoveAttendingEvent, useRemoveInterestedEvent } from '@/hooks/useUserEvents';

type FilterType = 'all' | 'free' | 'indoor' | 'outdoor';

const FILTER_OPTIONS: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Free Events', value: 'free' },
    { label: 'Indoor', value: 'indoor' },
    { label: 'Outdoor', value: 'outdoor' },
];

export default function UpcomingEventsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [searchInput, setSearchInput] = useState('');
    const [locationInput, setLocationInput] = useState('');

    const parsed_eventId = searchParams.get('event_id') as string;
    const searchString = searchParams.get('search') ?? '';

    const free = activeFilter === 'free';

    const { data: allActivities = [], isLoading: allLoading, isError: allError } = useAllEvents(
        { recent: false, nearest: false, popular: false, free }
    );
    const { data: searchActivities = [], isLoading: searchLoading, isError: searchError } = useSearchEvents(searchString);

    const rawActivities = searchString ? searchActivities : allActivities;
    const loading = searchString ? searchLoading : allLoading;
    const error = (searchString ? searchError : allError) ? 'Error fetching events.' : null;

    // Client-side indoor/outdoor filter
    const activities = rawActivities.filter((event: any) => {
        if (activeFilter === 'all' || activeFilter === 'free') return true;
        const tags = Array.isArray(event.tags)
            ? event.tags
            : (typeof event.tags === 'string'
                ? (() => { try { return JSON.parse(event.tags); } catch { return []; } })()
                : []);
        const str = tags.join(' ').toLowerCase();
        return str.includes(activeFilter);
    });

    const { data: rawAttending } = useAttendingEvents();
    const { data: rawInterested } = useInterestedEvents();

    const attendingIds = new Set<number>(
        Array.isArray(rawAttending) ? rawAttending.map((e: any) => Number(e.id)) : []
    );
    const interestedIds = new Set<number>(
        Array.isArray(rawInterested) ? rawInterested.map((e: any) => Number(e.id)) : []
    );

    const { mutate: joinEvent } = useJoinEvent();
    const { mutate: addInterested } = useAddInterestedEvent();
    const { mutate: removeAttending } = useRemoveAttendingEvent();
    const { mutate: removeInterested } = useRemoveInterestedEvent();

    useEffect(() => {
        if (parsed_eventId != null) {
            const eventId = parseInt(parsed_eventId);
            if (searchParams.get('interested') === 'true') addInterested(eventId);
            else if (searchParams.get('join_events') === 'true') joinEvent(eventId);
            else if (searchParams.get('event_details') === 'true') router.push(`/event_details?event_id=${eventId}`);
        }
    }, [parsed_eventId, searchParams]);

    function handleSearch() {
        const q = searchInput.trim();
        if (q) router.push(`/upcoming_events?search=${encodeURIComponent(q)}`);
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="py-16 px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4"
                >
                    Discover <span className="text-blue-500">Sports Events</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto mb-8"
                >
                    Find and join the best sports events happening around you. Filter by preference and find exactly what you're looking for.
                </motion.p>

                {/* Search bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="flex flex-col sm:flex-row items-stretch gap-2 max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-2"
                >
                    <div className="flex items-center flex-1 gap-2 px-3 py-1">
                        <Search className="h-4 w-4 text-gray-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search events, sports, or venues..."
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSearch()}
                            className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent"
                        />
                    </div>
                    <div className="hidden sm:block w-px bg-gray-200 my-1" />
                    <div className="flex items-center flex-1 gap-2 px-3 py-1">
                        <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Any Location"
                            value={locationInput}
                            onChange={e => setLocationInput(e.target.value)}
                            className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent"
                        />
                    </div>
                    <Button
                        onClick={handleSearch}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 py-2 text-sm font-semibold shrink-0"
                    >
                        Search
                    </Button>
                </motion.div>

                {/* Filter pills */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex items-center justify-center gap-3 mt-6 flex-wrap"
                >
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Filter className="h-4 w-4" />
                        Filter by:
                    </span>
                    {FILTER_OPTIONS.map(f => (
                        <button
                            key={f.value}
                            onClick={() => setActiveFilter(f.value)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                activeFilter === f.value
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-500'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </motion.div>
            </section>

            <hr className="border-gray-100" />

            {/* Results */}
            <section className="max-w-full sm:px-12 lg:px-16 sm:mx-48">
                {searchString && (
                    <div className="mb-5 flex items-center gap-3 text-sm text-blue-700 bg-blue-50 rounded-lg px-4 py-2.5">
                        <span>
                            Search results for: <strong>{searchString}</strong>
                        </span>
                        <button
                            onClick={() => router.push('/upcoming_events')}
                            className="underline text-blue-500 ml-auto"
                        >
                            Clear search
                        </button>
                    </div>
                )}

                <div className="mb-6">
                    <p className="text-xl font-bold text-gray-900">
                        Showing {activities.length} event{activities.length !== 1 ? 's' : ''}
                    </p>
                </div>

                <EventCard
                    activities={activities}
                    loading={loading}
                    error={error}
                    gridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    onActionDetails={(eventId: number) => router.push(`/event_details?event_id=${eventId}`)}
                    onAddInterested={(eventId: number) => addInterested(eventId)}
                    onRemoveInterested={(eventId: number) => removeInterested(eventId)}
                    onAddJoin={(eventId: number) => joinEvent(eventId)}
                    onRemoveJoin={(eventId: number) => removeAttending(eventId)}
                    attendingIds={attendingIds}
                    interestedIds={interestedIds}
                    interestedIcon={<Heart className="h-7 w-7 text-black-600 hover:text-red-300" strokeWidth={1.7} />}
                    joinIcon={<Plus className="h-7 w-7 text-gray-600 hover:text-blue-300" strokeWidth={1.2} />}
                    gap="gap-12"
                />
            </section>
        </div>
    );
}

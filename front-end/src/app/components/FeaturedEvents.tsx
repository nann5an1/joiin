'use client'
import EventCard from "../components/eventCard";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFeaturedEvents } from '@/hooks/useEvents';

export function FeaturedEventsSection() {
    const router = useRouter();
    const { data: activities = [], isLoading, isError } = useFeaturedEvents();
    const error = isError ? "Failed to fetch featured events." : null;

    function handleViewDetails(eventId: number) {
        router.push(`/event_details?event_id=${eventId}`);
    }

    return (
        <section className="py-16 bg-gradient-to-b from-sky-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        Happening Now
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <span className="text-cyan-400">Live & Upcoming</span> Events
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Join thousands of athletes in exciting sports events happening around you
                    </p>
                </div>

                {/* Event cards */}
                <EventCard
                    activities={activities}
                    loading={isLoading}
                    error={error}
                    onActionDetails={handleViewDetails}
                />

                {/* View All button */}
                <div className="flex justify-center mt-10">
                    <Link href="/upcoming_events">
                        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8">
                            View All Events →
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
}

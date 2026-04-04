'use client'
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Trophy, Heart, Clock, Users, Calendar, MapPin, Settings, Plus } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { useUserName } from '@/hooks/useUser';
import { useCreatedEvents, useInterestedEvents, useAttendingEvents, useRemoveInterestedEvent, useRemoveAttendingEvent } from '@/hooks/useUserEvents';
import { useJoinEvent } from '@/hooks/useEvents';

type Tab = 'created' | 'interested' | 'attended' | 'history';

const TAB_URLS: Record<Tab, string> = {
    created: '/created_events',
    interested: '/interested_events',
    attended: '/attend_events',
    history: '/history_events',
};

const TABS: { key: Tab; label: string }[] = [
    { key: 'created', label: 'Created' },
    { key: 'interested', label: 'Interested' },
    { key: 'attended', label: 'Attended' },
    { key: 'history', label: 'History' },
];

const STATUS_STYLE: Record<string, string> = {
    Active: 'bg-emerald-100 text-emerald-700',
    Upcoming: 'bg-cyan-100 text-cyan-700',
    Completed: 'bg-gray-100 text-gray-600',
};

function getStatus(event: any): 'Active' | 'Upcoming' | 'Completed' {
    const now = new Date();
    const end = new Date(event.end_date);
    const start = new Date(event.start_date);
    if (now > end) return 'Completed';
    if (now >= start && now <= end) return 'Active';
    return 'Upcoming';
}

export default function Dashboard({ activeTab }: { activeTab: Tab }) {
    const router = useRouter();

    const { data: userNameData } = useUserName();
    const userName = userNameData?.data?.username ?? 'there';

    const { data: createdEvents = [], isLoading: createdLoading } = useCreatedEvents();
    const { data: interestedEvents = [], isLoading: intLoading } = useInterestedEvents();
    const { data: attendedEvents = [], isLoading: attLoading } = useAttendingEvents();

    const { mutate: removeInterested } = useRemoveInterestedEvent();
    const { mutate: removeAttending } = useRemoveAttendingEvent();
    const { mutate: joinEvent } = useJoinEvent();

    const totalParticipants = (createdEvents as any[]).reduce((sum, e) => sum + (Number(e.current_count) || 0), 0);
    const pastEvents = (attendedEvents as any[]).filter(e => new Date(e.end_date) < new Date()).length;

    return (
        <div className="min-h-screen login-page-bg">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">

                {/* Welcome */}
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Welcome back, {userName}!</h1>
                    <p className="text-slate-500 mt-1 text-sm">Manage your events and track your sports activities</p>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <StatCard label="Created" value={(createdEvents as any[]).length} icon={<Trophy className="h-6 w-6 text-white" />} gradient="from-blue-400 to-cyan-500" />
                    <StatCard label="Interested" value={(interestedEvents as any[]).length} icon={<Heart className="h-6 w-6 text-white" />} gradient="from-blue-500 to-indigo-500" />
                    <StatCard label="Past Events" value={pastEvents} icon={<Clock className="h-6 w-6 text-white" />} gradient="from-teal-400 to-emerald-500" />
                    <StatCard label="Total Participants" value={totalParticipants} icon={<Users className="h-6 w-6 text-white" />} gradient="from-emerald-400 to-green-500" />
                </div>

                {/* Tab bar + Create button */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-1 bg-white/60 rounded-xl p-1 border border-slate-200 shadow-sm">
                        {TABS.map(t => (
                            <Link
                                key={t.key}
                                href={TAB_URLS[t.key]}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                    activeTab === t.key
                                        ? 'bg-blue-500 text-white shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                {t.label}
                            </Link>
                        ))}
                    </div>
                    <Link
                        href="/create"
                        className="flex items-center border-md border-white gap-1.5 bg-cyan-500 hover:bg-cyan-200 text-blue-500 text-sm font-semibold px-4 py-2 rounded-xl shadow-md transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Create Event
                    </Link>
                </div>

                {/* Tab content */}
                <div className="space-y-3">
                    {activeTab === 'created' && (
                        <EventList
                            events={createdEvents}
                            loading={createdLoading}
                            renderRow={(e: any) => {
                                const status = getStatus(e);
                                return (
                                    <EventRow key={e.id} event={e}>
                                        <span className={`text-xs font-semibold px-2.5 py-1 border-sm rounded-full text-green-400 ${STATUS_STYLE[status]}`}>{status}</span>
                                        <button
                                            onClick={() => router.push(`/event_details?event_id=${e.id}`)}
                                            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
                                        >
                                            <Settings className="h-2 w-2.5" /> Manage
                                        </button>
                                    </EventRow>
                                );
                            }}
                        />
                    )}

                    {activeTab === 'interested' && (
                        <EventList
                            events={interestedEvents}
                            loading={intLoading}
                            renderRow={(e: any) => {
                                const status = getStatus(e);
                                return (
                                    <EventRow key={e.id} event={e}>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[status]}`}>{status}</span>
                                        <button
                                            onClick={() => joinEvent(e.id)}
                                            className="text-sm font-semibold bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                                        >
                                            Register
                                        </button>
                                        <button
                                            onClick={() => removeInterested(e.id)}
                                            className="text-sm font-medium text-red-500 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </EventRow>
                                );
                            }}
                        />
                    )}

                    {activeTab === 'attended' && (
                        <EventList
                            events={attendedEvents}
                            loading={attLoading}
                            renderRow={(e: any) => {
                                const cat = e.category ? e.category.charAt(0).toUpperCase() + e.category.slice(1) : 'Event';
                                return (
                                    <EventRow key={e.id} event={e}>
                                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-300 text-slate-600 bg-white">{cat}</span>
                                        <button
                                            onClick={() => router.push(`/event_details?event_id=${e.id}`)}
                                            className="text-sm font-medium text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
                                        >
                                            View Details
                                        </button>
                                    </EventRow>
                                );
                            }}
                        />
                    )}

                    {activeTab === 'history' && (
                        <HistoryList
                            createdEvents={createdEvents}
                            attendedEvents={attendedEvents}
                            onViewDetails={(id) => router.push(`/event_details?event_id=${id}`)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─── Sub-components ─── */

function StatCard({ label, value, icon, gradient }: { label: string; value: number; icon: React.ReactNode; gradient: string }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex items-center justify-between">
            <div>
                <p className="text-xs text-slate-500 font-medium">{label}</p>
                <p className="text-2xl font-extrabold text-slate-900 mt-0.5">{value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                {icon}
            </div>
        </div>
    );
}

function EventRow({ event, children }: { event: any; children: React.ReactNode }) {
    const date = (() => { try { return format(new Date(event.start_date), 'MMM d, yyyy'); } catch { return '—'; } })();
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <h3 className="text-base font-bold text-slate-900 flex-1 min-w-0 pb-2">{event.title}</h3>
                <div className="flex items-center gap-2 shrink-0 flex-wrap">{children}</div>
            </div>
            <div className="flex items-center gap-6 mt-2.5 text-sm text-slate-500 flex-wrap">
                <span className="flex items-center gap-2"><Calendar className="h-3 w-3 shrink-0 text-blue-500" />{date}</span>
                <span className="flex items-center gap-2"><MapPin className="h-3 w-3 shrink-0 text-blue-500" />{event.location}</span>
                <span className="flex items-center gap-2"><Users className="h-3 w-3 shrink-0 text-blue-500" />{event.current_count ?? 0} participants</span>
            </div>
        </div>
    );
}

function EventList({ events, loading, renderRow }: { events: any[]; loading: boolean; renderRow: (e: any) => React.ReactNode }) {
    if (loading) return <p className="text-center text-slate-400 py-8">Loading...</p>;
    if (!events.length) return <p className="text-center text-slate-400 py-8">No events found</p>;
    return <>{(events as any[]).map(renderRow)}</>;
}

function HistoryList({ createdEvents, attendedEvents, onViewDetails }: { createdEvents: any[]; attendedEvents: any[]; onViewDetails: (id: number) => void }) {
    const now = new Date();
    const pastCreated = (createdEvents as any[]).filter(e => new Date(e.end_date) < now).map(e => ({ ...e, role: 'Creator' }));
    const pastAttended = (attendedEvents as any[]).filter(e => new Date(e.end_date) < now).map(e => ({ ...e, role: 'Attendee' }));
    const all = [...pastCreated, ...pastAttended].sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

    if (!all.length) return <p className="text-center text-slate-400 py-8">No history yet</p>;

    return (
        <>
            {all.map((e, i) => (
                <div key={`${e.role}-${e.id}-${i}`} className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        <h3 className="text-base font-bold text-slate-900 flex-1 min-w-0">{e.title}</h3>
                        <div className="flex items-center gap-2 shrink-0 flex-wrap">
                            <span className={`text-xs font-semibold px-2 py-1.5 rounded-lg border ${
                                e.role === 'Creator' ? 'border-blue-400 text-blue-600 bg-blue-50' : 'border-gray-300 text-gray-600 bg-white'
                            }`}>{e.role}</span>
                            <button
                                onClick={() => onViewDetails(e.id)}
                                className="text-sm font-medium text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 mt-2.5 text-sm text-slate-500 flex-wrap">
                        <span className="flex items-center gap-2">
                            <Calendar className="h-2 w-2 shrink-0 text-blue-500" />
                            {(() => { try { return format(new Date(e.start_date), 'MMM d, yyyy'); } catch { return '—'; } })()}
                        </span>
                        <span className="flex items-center gap-2"><MapPin className="h-2 w-2 shrink-0 text-cyan-500" />{e.location}</span>
                        <span className="flex items-center gap-2"><Users className="h-2 w-2 shrink-0 text-cyan-500" />{e.current_count ?? 0} participants</span>
                    </div>
                </div>
            ))}
        </>
    );
}

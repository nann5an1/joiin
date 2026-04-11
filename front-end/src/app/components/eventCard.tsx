'use client'

import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Users, Share2, Check, Heart, Plus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { format, isValid } from 'date-fns';

function safeFormat(dateStr: string, fmt: string): string {
  try {
    const d = new Date(dateStr);
    return isValid(d) ? format(d, fmt) : '—';
  } catch {
    return '—';
  }
}

function getPriceBadge(event: any): { label: string; cls: string } {
  const fare = parseFloat(event.fares ?? 0);
  if (!fare || fare === 0) return { label: 'Free', cls: 'bg-blue-500 text-white' };
  return { label: `$${fare}`, cls: 'bg-blue-500 text-white' };
}

function getEnvTag(event: any): string {
  const tags = Array.isArray(event.tags)
    ? event.tags
    : (typeof event.tags === 'string' ? (() => { try { return JSON.parse(event.tags); } catch { return []; } })() : []);
  const str = tags.join(' ').toLowerCase();
  if (str.includes('indoor')) return 'Indoor';
  if (str.includes('outdoor')) return 'Outdoor';
  return 'Outdoor';
}

function ShareButton({ event }: { event: any }) {
  const [copied, setCopied] = useState(false);

  function handleShare(e: React.MouseEvent) {
    e.stopPropagation();
    const url = `${window.location.origin}/event_details?event_id=${event.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleShare}
      type="button"
      title="Copy event link"
      className="rounded-full p-2 hover:bg-slate-100 transition-colors outline-none focus:outline-none"
    >
      {copied
        ? <Check className="h-5 w-5 text-green-500" />
        : <Share2 className="h-5 w-5 text-slate-500" />}
    </button>
  );
}

function EventCardItem({ event, i, onActionDetails, onAddInterested, onRemoveInterested, onAddJoin, onRemoveJoin, attendingIds, interestedIds }: any) {
  const [interested, setInterested] = useState(() => interestedIds?.has(Number(event.id)) ?? false);
  const [joined, setJoined] = useState(() => attendingIds?.has(Number(event.id)) ?? false);

  const { label: priceLabel, cls: priceCls } = getPriceBadge(event);
  const envTag = getEnvTag(event);
  const dateStr = safeFormat(event.start_date, 'MMM dd, yyyy');
  const timeStr = safeFormat(event.start_date, 'HH:mm');
  const categoryLabel = event.category
    ? event.category.charAt(0).toUpperCase() + event.category.slice(1)
    : 'Event';

  function handleInterested(e: React.MouseEvent) {
    e.stopPropagation();
    const next = !interested;
    setInterested(next);
    next ? onAddInterested?.(event.id) : onRemoveInterested?.(event.id);
  }

  function handleJoin(e: React.MouseEvent) {
    e.stopPropagation();
    const next = !joined;
    setJoined(next);
    next ? onAddJoin?.(event.id) : onRemoveJoin?.(event.id);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: i * 0.05 }}
      className="h-full"
    >
      <Card
        className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full cursor-pointer group p-0 gap-0"
        onClick={() => onActionDetails?.(event.id)}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden shrink-0">
          {event.img ? (
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src={`http://localhost:3000${event.img}`}
              alt={event.title ?? ''}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-sky-200 to-blue-400" />
          )}
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {categoryLabel}
          </span>
          <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${priceCls}`}>
            {priceLabel}
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 p-5 flex flex-col">
          <span className="inline-flex w-fit items-center text-blue-700 bg-cyan-50 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
            {envTag}
          </span>
          <h3 className="text-slate-900 font-bold text-base leading-snug line-clamp-2 group-hover:text-cyan-600 transition-colors mb-1">
            {event.title}
          </h3>
          <div className="space-y-2 mt-auto pt-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
              <span>{dateStr} at {timeStr}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users className="h-4 w-4 shrink-0 text-slate-400" />
              <span>{event.current_count ?? 0}/{event.pax ?? '?'} Participants</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-5 py-3 flex items-center justify-between border-t border-slate-100">
          <div className="flex gap-3">
            {onAddInterested && (
              <button
                onClick={handleInterested}
                type="button"
                title={interested ? 'Remove from interested' : 'Save as interested'}
                className="rounded-full p-2 hover:bg-red-50 transition-colors outline-none focus:outline-none"
              >
                <Heart
                  className="h-5 w-5 transition-all duration-200"
                  strokeWidth={1.7}
                  fill={interested ? '#ef4444' : 'none'}
                  color={interested ? '#ef4444' : '#6b7280'}
                />
              </button>
            )}
            {onAddJoin && (
              <button
                onClick={handleJoin}
                type="button"
                title={joined ? 'Joined' : 'Join event'}
                className="rounded-full p-2 hover:bg-blue-50 transition-colors outline-none focus:outline-none"
              >
                <Plus
                  className="h-5 w-5 transition-all duration-200"
                  strokeWidth={1.7}
                  color={joined ? '#3b82f6' : '#6b7280'}
                />
              </button>
            )}
          </div>
          <ShareButton event={event} />
        </div>
      </Card>
    </motion.div>
  );
}

export default function EventCard({
  activities = [],
  loading,
  error,
  onActionDetails,
  onAddInterested,
  onRemoveInterested,
  onAddJoin,
  onRemoveJoin,
  attendingIds,
  interestedIds,
  gridClassName,
  gap = 'gap-6',
}: any) {
  const safeActivities = Array.isArray(activities) ? activities : [];
  const grid = gridClassName ?? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  return (
    <div className={`grid ${grid} ${gap} items-stretch`}>
      {loading && (
        <p className="col-span-full text-center text-gray-500 py-8">Loading events...</p>
      )}
      {error && (
        <p className="col-span-full text-center text-red-500 py-8">{error}</p>
      )}
      {!loading && !error && safeActivities.length === 0 && (
        <p className="col-span-full text-center text-gray-500 py-8">No events found</p>
      )}
      {safeActivities.map((event: any, i: number) => (
        <EventCardItem
          key={event.id}
          event={event}
          i={i}
          onActionDetails={onActionDetails}
          onAddInterested={onAddInterested}
          onRemoveInterested={onRemoveInterested}
          onAddJoin={onAddJoin}
          onRemoveJoin={onRemoveJoin}
          attendingIds={attendingIds}
          interestedIds={interestedIds}
        />
      ))}
    </div>
  );
}

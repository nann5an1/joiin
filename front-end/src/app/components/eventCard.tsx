'use client'

import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Users } from "lucide-react";
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

export default function EventCard({
  activities = [],
  loading,
  error,
  onActionDetails,
  onActionClick,
  onActionInterested,
  onActionJoin,
  actionIcon,
  actionTooltip,
  interestedIcon,
  joinIcon,
  gridClassName,
}: any) {
  const safeActivities = Array.isArray(activities) ? activities : [];
  const grid = gridClassName ?? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  return (
    <div className={`grid ${grid} gap-6 items-start`}>
      {loading && (
        <p className="col-span-full text-center text-gray-500 py-8">Loading events...</p>
      )}
      {error && (
        <p className="col-span-full text-center text-red-500 py-8">{error}</p>
      )}
      {!loading && !error && safeActivities.length === 0 && (
        <p className="col-span-full text-center text-gray-500 py-8">No events found</p>
      )}

      {safeActivities.map((event: any, i: number) => {
        const { label: priceLabel, cls: priceCls } = getPriceBadge(event);
        const envTag = getEnvTag(event);
        const dateStr = safeFormat(event.start_date, 'MMM dd, yyyy');
        const timeStr = safeFormat(event.start_date, 'HH:mm');
        const categoryLabel = event.category
          ? event.category.charAt(0).toUpperCase() + event.category.slice(1)
          : 'Event';

        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card
              className="overflow-hidden rounded-2xl border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col w-full cursor-pointer"
              onClick={() => onActionDetails?.(event.id)}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden shrink-0">
                {event.img ? (
                  <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:3000${event.img}`}
                    alt={event.title ?? ''}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-sky-200 to-blue-400" />
                )}

                {/* Category badge — top left */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  {categoryLabel}
                </span>

                {/* Price badge — top right */}
                <span className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${priceCls}`}>
                  {priceLabel}
                </span>
              </div>

              {/* Body */}
              <div className="flex-1 p-4 flex flex-col gap-2.5">
                {/* Environment tag */}
                <span className="inline-flex w-fit items-center border border-blue-200 text-blue-600 bg-blue-50 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {envTag}
                </span>

                <h3 className="text-gray-900 font-bold text-lg leading-snug">
                  {event.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>{dateStr} at {timeStr}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-blue-500">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="h-4 w-4 shrink-0" />
                  <span>{event.current_count ?? 0}/{event.pax ?? '?'} Participants</span>
                </div>
              </div>

              {/* Legacy action buttons */}
              {(onActionInterested || onActionJoin || onActionClick) && (
                <div className="px-4 pb-3 flex justify-end gap-1">
                  {onActionInterested && (
                    <button
                      onClick={e => { e.stopPropagation(); onActionInterested(event.id); }}
                      type="button"
                      title={actionTooltip}
                      className="rounded-full p-2 hover:bg-gray-100"
                    >
                      {interestedIcon}
                    </button>
                  )}
                  {onActionJoin && (
                    <button
                      onClick={e => { e.stopPropagation(); onActionJoin(event.id); }}
                      type="button"
                      title={actionTooltip}
                      className="rounded-full p-2 hover:bg-gray-100"
                    >
                      {joinIcon}
                    </button>
                  )}
                  {onActionClick && (
                    <button
                      onClick={e => { e.stopPropagation(); onActionClick(event.id); }}
                      type="button"
                      title={actionTooltip}
                      className="rounded-full p-2 hover:bg-gray-100"
                    >
                      {actionIcon}
                    </button>
                  )}
                </div>
              )}
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

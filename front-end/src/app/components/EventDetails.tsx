'use client';
import { Calendar, Clock, MapPin, Users, Heart, Share2, DollarSign, Info, ChevronLeft } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { useRouter } from 'next/navigation';

function safeFormat(dateStr: string, fmt: string): string {
  try {
    const d = new Date(dateStr);
    return isValid(d) ? format(d, fmt) : '—';
  } catch { return '—'; }
}

function getStatus(startDate: string, endDate: string): 'Upcoming' | 'Active' | 'Completed' {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (now > end) return 'Completed';
  if (now >= start && now <= end) return 'Active';
  return 'Upcoming';
}

interface EventDetailsProps {
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  pax: number;
  current_count: number;
  category: string;
  imageUrl: string;
  description: string;
  org_name: string;
  fares: string;
  tags: string[];
  onRegister?: () => void;
  onSave?: () => void;
}

const STATUS_CLS: Record<string, string> = {
  Upcoming: 'bg-cyan-500 text-white',
  Active: 'bg-emerald-500 text-white',
  Completed: 'bg-gray-400 text-white',
};

export function EventDetailsComponent({
  title, start_date, end_date, location, pax, current_count,
  category, imageUrl, description, org_name, fares, tags,
  onRegister, onSave,
}: EventDetailsProps) {
  const router = useRouter();

  const dateStr = safeFormat(start_date, 'MMM d, yyyy');
  const timeStr = safeFormat(start_date, 'h:mm a');
  const status = getStatus(start_date, end_date);
  const categoryLabel = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Event';
  const fareNum = parseFloat(fares ?? '0');
  const priceLabel = !fareNum ? 'Free' : `$${fareNum}`;
  const isFree = !fareNum;

  // Location stored as "Venue Name, Full Address"
  const commaIdx = location?.indexOf(', ') ?? -1;
  const venueName = commaIdx !== -1 ? location.slice(0, commaIdx) : location;
  const venueAddress = commaIdx !== -1 ? location.slice(commaIdx + 2) : '';

  return (
    <div className="min-h-screen login-page-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* ── Left Column ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Hero Image */}
            <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden">
              {imageUrl ? (
                <img
                  src={`http://localhost:3000${imageUrl}`}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-sky-200 to-blue-400" />
              )}
              <div className="absolute top-3 right-3 flex gap-2">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_CLS[status]}`}>
                  {status}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-800">
                  {categoryLabel}
                </span>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
              <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>

              {/* Meta grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <p className="text-xs font-medium text-slate-400 mb-1">Date</p>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <Calendar className="h-4 w-4 text-cyan-500 shrink-0" />
                    {dateStr}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 mb-1">Time</p>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <Clock className="h-4 w-4 text-cyan-500 shrink-0" />
                    {timeStr}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 mb-1">Location</p>
                  <div className="flex items-start gap-1.5 text-sm font-medium text-slate-700">
                    <MapPin className="h-4 w-4 text-cyan-500 shrink-0 mt-0.5" />
                    <div>
                      <div>{venueName}</div>
                      {venueAddress && (
                        <div className="text-xs text-slate-400 font-normal">{venueAddress}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 mb-1">Participants</p>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <Users className="h-4 w-4 text-cyan-500 shrink-0" />
                    {current_count ?? 0} / {pax ?? '?'}
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* About */}
              <div>
                <h2 className="text-base font-bold text-slate-900 mb-2">About This Event</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
              </div>

              {/* Requirements */}
              {tags && tags.length > 0 && (
                <>
                  <hr className="border-slate-100" />
                  <div>
                    <h2 className="text-base font-bold text-slate-900 mb-2">Requirements</h2>
                    <ul className="space-y-1.5">
                      {tags.map((tag, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Right Sidebar ── */}
          <div className="space-y-4">

            {/* Registration Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">Entry Fee</p>
                <p className="text-2xl font-extrabold text-slate-900">{priceLabel}</p>
              </div>
              {!isFree && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <DollarSign className="h-3.5 w-3.5" />
                  Secure payment
                </div>
              )}
              <button
                onClick={onRegister}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                Register Now
              </button>
              <div className="flex gap-2">
                <button
                  onClick={onSave}
                  className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 py-2 rounded-xl transition-colors"
                >
                  <Heart className="h-4 w-4" /> Save
                </button>
                <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-500">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Organizer */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
              <p className="text-sm font-bold text-slate-900">Organized By</p>
              <p className="text-sm text-slate-500">{org_name}</p>
              <div className="flex items-start gap-2 bg-cyan-50 border border-cyan-200 rounded-xl p-3">
                <Info className="h-4 w-4 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-cyan-700 mb-0.5">Important Note</p>
                  <p className="text-xs text-cyan-600 leading-relaxed">
                    Please arrive 30 minutes before the event starts for check-in and preparation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

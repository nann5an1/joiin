'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FeaturesSection } from './components/FeatureSection';
import { CategorySection } from './components/CategorySection';
import { CTASection } from './components/CTASection';
import { FeaturedEventsSection } from './components/FeaturedEvents';
import { TestimonialsSection } from './components/TestimonialsSection';

export const dynamic = 'force-dynamic';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    router.refresh();
  }, []);

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (query) {
      router.push(`/upcoming_events?search=${encodeURIComponent(query)}`);
    } else {
      router.push('/upcoming_events');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'free') {
      router.push('/upcoming_events?free=true');
    } else {
      router.push('/upcoming_events');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-12" style={{ background: 'linear-gradient(to bottom, #e8f4ff, #C2EFFF)' }}>
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Discover <span className="text-blue-500">Sports Events</span>
          </h1>

          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Find and join the best sports events happening around you. Filter by preference
            and find exactly what you&apos;re looking for.
          </p>

          {/* Search pill */}
          <div className="bg-white rounded-full shadow-lg flex items-center max-w-2xl mx-auto mb-6 px-2 py-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search events, sports, or venues…"
              className="flex-1 bg-transparent outline-none px-4 text-gray-700 placeholder-gray-400 text-sm min-w-0"
            />
            <div className="w-px h-6 bg-gray-200 mx-2 shrink-0" />
            <div className="flex items-center gap-1.5 px-3 text-gray-400 text-sm shrink-0">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Any Location</span>
            </div>
            <Button
              onClick={handleSearch}
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 shrink-0"
            >
              Search
            </Button>
          </div>

          {/* Filter chips */}
          <div className="flex justify-center items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 3.185-9 7.111 0 2.08 1.042 3.957 2.737 5.298L5.25 21l4.5-2.25a9.956 9.956 0 002.25.261c4.97 0 9-3.184 9-7.111C21 7.185 16.97 3 12 3z" />
              </svg>
              Filter by:
            </span>
            {[
              { label: 'All', value: 'all' },
              { label: 'Free Events', value: 'free' },
              { label: 'Indoor', value: 'indoor' },
              { label: 'Outdoor', value: 'outdoor' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterClick(filter.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Category carousel */}
      <CategorySection />

      {/* Live & Upcoming Events */}
      <FeaturedEventsSection />

      {/* Features */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <CTASection />

    </div>
  );
}

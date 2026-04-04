'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const UnauthHeader = () => {
  return (
    <nav className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-gray-900 font-bold text-xl">Joiin</span>
          </Link>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/#features"
              className="text-gray-600 hover:text-blue-600 transition-colors text-md font-medium"
            >
              Features
            </a>
            <a
              href="/#how-it-works"
              className="text-gray-600 hover:text-blue-600 transition-colors text-md font-medium"
            >
              How It Works
            </a>
            <Link
              href="/upcoming_events"
              className="text-gray-600 hover:text-blue-600 transition-colors text-md font-medium"
            >
              Upcoming Events
            </Link>
          </div>

          {/* Right buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-cyan-400 hover:text-cyan-500 font-medium">
                Sign In
              </Button>
            </Link>
            <Link href="/sign_up">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5">
                Get Started
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

'use client';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const AuthHeader = () => {
  const [inputVal, setInputVal] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fix: Proper event handler for Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputVal.trim()) {
      console.log('Searching for:', inputVal);
      // Navigate to upcoming events with search parameter
      // router.push(`/upcoming_events?search=${encodeURIComponent(inputVal.trim())}`);
    }
  };

  // Fix: Proper typing and immediate state update
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputVal(value);
    console.log('Input value:', value);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="grid grid-cols-4 justify-items-start w-full p-4 border gap-4 min-h-16 font-semibold text-gray-700">
      {/* Logo */}
      <div className="col-start-1 col-end-2 w-10 h-10">
        <Link href="/">
          <img src="join.png" alt="Logo" className="w-full h-full object-contain" />
        </Link>
      </div>

      {/* Search bar with icon */}
      <div className="col-start-2 col-end-4 w-full relative">
        <div className="relative">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input 
            type="text" 
            value={inputVal}
            className="rounded-xl bg-[var(--search-bar)] h-full w-full mt-2 pt-2 pb-2 pl-10 pr-4 border-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Search events, categories, locations..."
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* Navigation links + dropdown */}
      <div className="flex flex-row col-start-4 justify-end items-center relative" ref={dropdownRef}>
        <Link 
          href="/create" 
          className="mr-4 font-medium block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 transition-colors"
        >
          Create Events
        </Link>
        
        <Link 
          href="/upcoming_events" 
          className="mr-4 font-medium block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 transition-colors"
        >
          Upcoming Events
        </Link>

        {/* Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setOpen(!open)}
            className="font-medium py-2 px-4 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors flex items-center gap-2"
          >
            Menu
            <svg 
              className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {open && (
            <div className="absolute top-full right-0 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black/5 z-50">
              <Link
                href="/manage_events"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-xl transition-colors"
                onClick={() => setOpen(false)}
              >
                Manage Events
              </Link>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setOpen(false)}
              >
                Settings
              </Link>
              <Link
                href="/logout"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-xl transition-colors"
                onClick={() => setOpen(false)}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

'use client';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const UnauthHeader = () => {
  const [inputVal, setInputVal] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fix: Proper event handler for Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputVal.trim()) {
      console.log('Searching for:', inputVal);
      // Navigate to upcoming events with search parameter
      router.push(`/upcoming_events?search=${inputVal.trim()}`);
    }
  };

  // Fix: Proper typing and immediate state update
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputVal(value);
    console.log('Input value:', value);
  };

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
          href="/login" 
          className="mr-4 font-medium block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 transition-colors"
        >
          Create
        </Link>
        
        <Link 
          href="/upcoming_events" 
          className="mr-4 font-medium block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 transition-colors"
        >
          Upcoming
        </Link>

        <Link 
          href="/login" 
          className="mr-4 font-medium block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 transition-colors"
        >
          Login
        </Link>
        
        <Link 
          href="/sign_up" 
          className="mr-4 font-medium block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 transition-colors"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};
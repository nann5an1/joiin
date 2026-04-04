'use client';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, UserCircle2, ChevronDown } from 'lucide-react';

export const AuthHeader = () => {
  const [inputVal, setInputVal] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputVal.trim()) {
      router.push(`/upcoming_events?search=${inputVal.trim()}`);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  return (
    <nav className="flex items-center justify-between w-full px-6 py-3 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="white" strokeWidth="2"/>
            <path d="M3 9h18" stroke="white" strokeWidth="2"/>
            <circle cx="8" cy="6.5" r="1" fill="white"/>
            <circle cx="16" cy="6.5" r="1" fill="white"/>
          </svg>
        </div>
        <span className="text-base font-bold text-slate-800">SportSync</span>
      </Link>

      {/* Right: Bell + Avatar dropdown */}
      <div className="flex items-center gap-3" ref={dropdownRef}>
        {/* Bell */}
        <button className="relative p-2 rounded-full hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Avatar → /profile (direct link) */}
        <Link
          href="/profile"
          className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          <UserCircle2 className="h-5 w-5 text-white" />
        </Link>

        {/* Chevron dropdown for nav links */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          {open && (
            <div className="absolute top-full right-0 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black/5 z-50 py-1">
              <Link href="/manage_events" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors" onClick={() => setOpen(false)}>Dashboard</Link>
              <Link href="/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors" onClick={() => setOpen(false)}>Profile</Link>
              <Link href="/settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors" onClick={() => setOpen(false)}>Settings</Link>
              <hr className="my-1 border-slate-100" />
              <Link href="/logout" className="block px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors" onClick={() => setOpen(false)}>Logout</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

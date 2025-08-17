'use client';
import Link from "next/link";
import {useState} from 'react';

export const AuthHeader = () => {
  const [open, setOpen] = useState(false);
    return (
     <nav className="grid grid-cols-4 justify-items-start w-full p-4 border gap-4 min-h-16">
          <div className="col-start-1 col-end-2 w-10 h-10">
            <img src="join.png" alt="" />
          </div>
          <div className="col-start-2 col-end-4 w-full">
            <input 
              type="text" 
              className="rounded-xl bg-[var(--search-bar)] h-full w-full pl-10 pr-4 border-none focus:outline-none" 
              placeholder="Search..."
            />
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
              className="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>
            </svg> */}
          </div>
          <div className="flex flex-row col-start-4 justify-right items-center">
              <Link href="/create" className="mr-8 font-medium block py-2 px-3 text-gray-900 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Create Events</Link>
              <Link href="/upcoming_events" className="mr-8 font-medium block py-2 px-3 text-gray-900 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Upcoming Events</Link>

              <button 
              onClick={() => setOpen(!open)}
              className="font-medium py-2 px-4 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Dropdown
            </button>

            {/* Dropdown menu */}
            {open && (
              <div className="absolute top-full right-0 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black/5 z-10">
                <Link
                  href="/manage_events"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-xl"
                >
                  Manage Events
                </Link>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <Link
                  href="/logout"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-xl"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
      </nav>
    )
};

// return (
//     <nav className="grid grid-cols-4 justify-items-center w-full p-4 border gap-4 min-h-16">
//       {/* Logo */}
//       <div className="col-start-1 col-end-2 w-10 h-10">
//         <img src="join.png" alt="logo" />
//       </div>

//       {/* Search bar */}
//       <div className="col-start-2 col-end-4 w-full relative">
//         <input
//           type="text"
//           className="rounded-xl bg-[var(--search-bar)] h-full w-full pl-10 pr-4"
//           placeholder="Search..."
//         />
//       </div>

//       {/* Navigation links + dropdown */}
//       <div className="flex flex-row col-start-4 justify-right items-center relative">
//         <Link
//           href="/create"
//           className="mr-8 font-medium block py-2 px-3 text-gray-900 rounded hover:bg-gray-900 hover:text-white transition"
//         >
//           Create Events
//         </Link>
//         <Link
//           href="/upcoming_events"
//           className="mr-8 font-medium block py-2 px-3 text-gray-900 rounded hover:bg-gray-900 hover:text-white transition"
//         >
//           Upcoming Events
//         </Link>
//         <Link
//           href="/logout"
//           className="mr-8 font-medium block py-2 px-3 text-gray-900 rounded hover:bg-gray-900 hover:text-white transition"
//         >
//           Logout
//         </Link>

//         {/* Dropdown button */}
//         <div className="relative">
//           <button
//             onClick={() => setOpen(!open)}
//             className="font-medium py-2 px-4 rounded-md bg-gray-200 hover:bg-gray-300"
//           >
//             Dropdown
//           </button>

//           {/* Dropdown menu */}
//           {open && (
//             <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black/5 z-10">
//               <Link
//                 href="/profile"
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-xl"
//               >
//                 Profile
//               </Link>
//               <Link
//                 href="/settings"
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               >
//                 Settings
//               </Link>
//               <button
//                 className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-xl"
//               >
//                 Sign out
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };
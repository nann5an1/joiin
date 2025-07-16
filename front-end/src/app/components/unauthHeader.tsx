'use client';
import Link from "next/link";

export const UnauthHeader = () => {
    return (
        <nav className="bg-gray-800 border-gray-800 text-white text-sm">
          <div className="max-w-screen-xl flex flex-wrap items-center mr-18 mx-auto p-4">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                EventHub
              </span>
            </a>
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false">
                {/* <span className="sr-only">Open user menu</span> */}
                <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
              </button>
            </div>
            <div className="flex items-center justify-center w-full md:flex md:w-auto md:order-1" id="navbar-user">  
              {/* <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"> */}
                <Link href="/upcoming_events" className="mr-8 font-medium block py-2 px-3 text-gray-100 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-blue-400 md:p-0 dark:text-white md:dark:hover:text-blue-500">Upcoming Events</Link>
                <Link href="/create" className="mr-8 font-medium block py-2 px-3 text-gray-100 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Create Events</Link>
                <Link href="/about" className="mr-8 font-medium block py-2 px-3 text-gray-100 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">About Us</Link>
                <Link href="/contact_us" className="mr-8 font-medium block py-2 px-3 text-gray-100 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Contact Us</Link>     
                <Link href="/login" className="mr-8 font-medium block py-2 px-3 text-gray-100 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Login</Link>                         
                <Link href="/sign_up" className="mr-8 font-medium block py-2 px-3 text-gray-100 rounded hover:bg-gray-109000 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Sign Up</Link>            
              {/* </ul> */}
            </div>
          </div>
        </nav>
    )
};
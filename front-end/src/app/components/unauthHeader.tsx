'use client';
import Link from "next/link";

export const UnauthHeader = () => {
    return (
        <nav className="rounded-3xl max-w-full p-6 -translate-y-4 shadow-lg">
          <div className="max-w-screen-xl flex flex-wrap items-center mr-18 mx-auto p-4">
            <div>
              <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Joiin
                </span>
              </a> 
            </div>
            <div className="flex items-center justify-center w-full md:flex md:w-auto md:order-1" id="navbar-user">
              {/* <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"> */}
                <Link href="/upcoming_events" className="mr-8 font-larger block py-2 px-3 text-gray-900 transition delay-100 ease-in-out duration-300 rounded hover:font-xl hover:bg-gray-900 md:hover:bg-transparent md:hover:text-blue-400 md:p-0 dark:text-white md:dark:hover:text-blue-500">Upcoming Events</Link>
                <Link href="/create" className="mr-8 font-medium block py-2 px-3 text-gray-900 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Create Events</Link>
                <Link href="/about" className="mr-8 font-medium block py-2 px-3 text-gray-900 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">About Us</Link>
                <Link href="/contact_us" className="mr-8 font-medium block py-2 px-3 text-gray-900 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Contact Us</Link>     
                <Link href="/login" className="mr-8 font-medium block py-2 px-3 text-gray-900 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Login</Link>                         
                <Link href="/sign_up" className="mr-8 font-medium block py-2 px-3 text-gray-900 rounded hover:bg-gray-109000 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Sign Up</Link>            
              {/* </ul> */}
            </div>
          </div>
        </nav>
    )
};
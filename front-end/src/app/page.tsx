'use client';

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import SplitText from "@/components/reactbits/splittext";
import { Handshake } from 'lucide-react';

export const dynamic = "force-dynamic";

export default function Home() {

   
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [])
 return ( 
   <div className="min-h-screen flex flex-col items-center">
   {/*Hero section */}
    <section className="w-full shadow-xl/20 flex justify-center bg-gradient-to-b from-[var(--foreground)] from-40% via-[var(--foreground-secondary)] via-70% to-[var(--foreground-tertiary)] to-100% rounded-xl ">
        <div className=" grid mx-auto max-w-screen-md lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12">
            <div className="place-self-center mr-auto lg:col-span-7">
                <h1 className="mb-4 max-w-2xl text-4xl text-[var(--section)] font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">Bring your game. Find your people.</h1>
                <p className="mb-6 max-w-2xl font-light text-gray-900 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Need a sport buddy? From quick pick-ups to full leagues, Joiin helps players find teammates, fill spots, and keep the game going strong.</p>
                <a href="#" className="inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-gray-900 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    Get started
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
                <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-800 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    Learn More
                </a> 
            </div>
                          
        </div>
    </section>

    {/*Cateogory section */}
    <section className="grid grid-cols-14 justify-center items-center col-gap-4 mt-16">
        <div className="w-20 h-20 col-start-1 col-end-2 bg-gray-200 rounded-xl justify-center p-4">
            <img className="w-full" src="hiking.svg" alt="" />
        </div>
         <div className="w-20 h-20 col-start-3 col-end-4 bg-gray-200 rounded-xl justify-center p-4">
            <img className="w-full" src="pool.svg" alt="" />
        </div>
         <div className="w-20 h-20 col-start-5 col-end-6 bg-gray-200 rounded-xl justify-center p-4">
            <img className="w-full" src="bike.svg" alt="" />
        </div>
         <div className="w-20 h-20 col-start-7 col-end-8 bg-gray-200 rounded-xl justify-center p-4">
            <img className="w-full" src="badminton.svg" alt="" />
        </div>
         <div className="w-20 h-20 col-start-9 col-end-10 bg-gray-200 rounded-xl justify-center p-4">
            <img className="w-full" src="scuba_diving.svg" alt="" />
        </div>
         <div className="w-20 h-20 col-start-11 col-end-12 bg-gray-200 rounded-xl justify-center p-4">
            <img className="w-full" src="yoga.svg" alt="" />
        </div>
         <div className="w-20 h-20 col-start-13 col-end-14 bg-gray-200 rounded-xl justify-center p-4">
            <img className="w-full" src="camping.svg" alt="" />
        </div>
    </section>

    <section>
        <h3>Featured Events</h3>
        
    </section>
    {/* <section className="my-auto border-solid border-2 border-[var(--foreground)] align-center mx-auto max-w-screen-xl lg:py-16 rounded-md">
        <h2 className="flex justify-center align-center text-4xl font-extrabold p-16 text-[var(--section)]">Looking for</h2>
        <div className="w-screen-full mx-16 pb-16 flex flex-wrap justify-between align-center font-semibold text-2xl font-[var(--section)]">
            <SplitText text="New Interests"

            className="text-3xl font-semibold text-center flex justify-center align-center"

            delay={100}

            duration={0.6}

            ease="bounce.out"

            splitType="chars"

            from={{ opacity: 0, y: 40 }}

            to={{ opacity: 1, y: 0 }}

            threshold={0.1}

            rootMargin="-100px"

            textAlign="center"

            onLetterAnimationComplete={handleAnimationComplete}

            />
            <Handshake />
            <SplitText text="New Friends"

            className="text-3xl font-semibold text-center flex justify-center align-center"

            delay={100}

            duration={0.6}

            ease="bounce.out"

            splitType="chars"

            from={{ opacity: 0, y: 40 }}

            to={{ opacity: 1, y: 0 }}

            threshold={0.1}

            rootMargin="-100px"

            textAlign="center"

            onLetterAnimationComplete={handleAnimationComplete}

            />
            <SplitText text="New Adventures"

            className="text-3xl font-semibold text-center flex justify-center align-center"

            delay={100}

            duration={0.6}

            ease="bounce.out"

            splitType="chars"

            from={{ opacity: 0, y: 40 }}

            to={{ opacity: 1, y: 0 }}

            threshold={0.1}

            rootMargin="-100px"

            textAlign="center"

            onLetterAnimationComplete={handleAnimationComplete}

            />
        </div>
        
    </section> */}

    {/* <section className="">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">What is Joiin?</h2>
                <p className="mb-4 text-xl text-gray-700">Joiin is a dynamic social sports platform designed to bring people together through shared physical activities. Whether you're looking to join a casual game, host an event, or meet like-minded individuals, Joiin makes it easy to connect, play, and build lasting communities. From football and hiking to yoga and cycling, it adapts to your interests and encourages active, meaningful social connections.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
                <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1"></img>
                <img className="mt-4 w-full rounded-lg lg:mt-10" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2"></img>
            </div>
        </div>
    </section>

    <section className="m-10 bg-gray-50 dark:bg-gray-800 rounded-md">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="mb-8 max-w-screen-md lg:mb-16">
                <h2 className="mb-4 text-4xl font-extrabold text-[var(--foreground)] ">What we do</h2>
                <p className="text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
            </div>
            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0 p-4">
                <div>
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold dark:text-white">️ Built for Sport Lovers, by Sport Lovers</h3>
                    <p className="text-gray-500 dark:text-gray-400">Tired of flaky WhatsApp groups and ghosted invites? Joiin is your sanctuary—crafted with the sweaty palms of athletes who know the agony of last-minute cancellations. Here, you’re among your own tribe.</p>
                </div>
                <div>
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold dark:text-white"> Host or Join – Your Game, Your Rules</h3>
                    <p className="text-gray-500 dark:text-gray-400">Whether you're a seasoned marathoner or a casual Sunday hiker with a thing for brunch afterward, Joiin empowers you to create events or jump in on others with a single tap. No fuss, just fun.</p>
                </div>
                <div>
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>                    
                    </div>
                    <h3 className="mb-2 text-xl font-bold dark:text-white">Grow Your Circle, Not Just Your Calves</h3>
                    <p className="text-gray-500 dark:text-gray-400">Why stop at sports? Post-match pizzas, sunrise yoga followed by espresso hangouts—Joiin isn’t just an event app, it’s a lifestyle movement. Come for the sprints, stay for the stories.</p>
                </div>
            </div>
        </div>
      </section>

    <section className="py-24">
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
    </section>
        
    <section>
        <section className="bg-[var(--foreground)] dark:bg-gray-900">       
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h2 className="mb-4 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">Start your free trial today</h2>
                <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">Try Flowbite Platform for 30 days. No credit card required.</p>
                <a href="#" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Free trial for 30 days</a>
            </div>
        </div>
        <div className="flex justify-center items-center py-8 w-2/5 mx-auto sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-1/5">
            <button className="bg-[var(--foreground-tertiary)] rounded-sm justify-center align-center text-gray-900 hover:transition duration-300 delay-200 hover:bg-gray-900 hover:text-white py-2 px-4">Get Started</button>
        </div>
    </section>
        
    </section> */}
    <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></script>
   </div>
  );
}


'use client'

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  { name: "Hiking",     icon: "hiking.svg",      keyword: "hiking" },
  { name: "Running",    icon: "running.svg",      keyword: "running" },
  { name: "Swimming",   icon: "pool.svg",         keyword: "swimming" },
  { name: "Cycling",    icon: "bike.svg",         keyword: "cycling" },
  { name: "Badminton",  icon: "badminton.svg",    keyword: "badminton" },
  { name: "Yoga",       icon: "yoga.svg",         keyword: "yoga" },
  { name: "Camping",    icon: "camping.svg",      keyword: "camping" },
  { name: "Pickleball", icon: "pickleball.svg",   keyword: "pickleball" },
  { name: "VolleyBall", icon: "volleyball.svg",   keyword: "volleyball" },
  { name: "Football",   icon: "football.svg",     keyword: "football" },
  { name: "Tennis",     icon: "tennis.svg",       keyword: "tennis" },
];

const gradientMap: Record<string, string> = {
  hiking:     'from-green-400 to-emerald-600',
  running:    'from-orange-400 to-red-500',
  swimming:   'from-blue-400 to-cyan-600',
  cycling:    'from-yellow-400 to-orange-500',
  badminton:  'from-purple-400 to-violet-600',
  yoga:       'from-pink-400 to-rose-500',
  camping:    'from-teal-400 to-green-600',
  pickleball: 'from-lime-400 to-green-500',
  volleyball: 'from-amber-400 to-yellow-600',
  football:   'from-red-400 to-rose-600',
  tennis:     'from-sky-400 to-blue-500',
};

export function CategorySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);

  const router = useRouter();
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) setItemsPerView(2);
      else if (window.innerWidth < 768) setItemsPerView(3);
      else if (window.innerWidth < 1024) setItemsPerView(4);
      else setItemsPerView(5);
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const getVisibleCategories = () => {
    const visible = [];
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentIndex + i) % categories.length;
      visible.push({ ...categories[index], index });
    }
    return visible;
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: { x: 0, opacity: 1, scale: 1, rotateY: 0 },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 15 : -15,
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <section className="py-16 w-full bg-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="flex justify-center mb-4">
          <span className="bg-teal-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full">
            Explore Sports
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">
          Find Your <span className="text-cyan-400">Perfect Sport</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Browse through various sports categories and discover events tailored for you
        </p>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Prev button */}
          <button
            onClick={prevSlide}
            className="border-none absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
            aria-label="Previous category"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Next button */}
          <button
            onClick={nextSlide}
            className="border-none absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
            aria-label="Next category"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Carousel container */}
          <div className="overflow-hidden mx-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-center items-center gap-4 sm:gap-6 lg:gap-24 py-4"
            >
              <AnimatePresence mode="popLayout" custom={direction}>
                {getVisibleCategories().map((category, idx) => (
                  <motion.div
                    key={`${category.name}-${category.index}-${currentIndex}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 },
                      rotateY: { duration: 0.4 },
                    }}
                    className="flex flex-col items-center flex-shrink-0"
                    style={{ perspective: "1000px" }}
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.1, rotateY: 5, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push("/upcoming_events?search=" + category.keyword)}
                      className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl flex items-center justify-center cursor-pointer relative overflow-hidden"
                    >
                      {/* Gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-blue-600 to-teal-500`} />
                      {/* Category icon */}
                      <img
                        src={`/${category.icon}`}
                        alt={category.name}
                        className="relative z-10 w-10 h-10 sm:w-11 sm:h-11 object-contain"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    </motion.div>

                    <motion.p
                      variants={itemVariants}
                      className="text-center mt-2 text-xs sm:text-sm lg:text-base text-gray-700 transition-colors"
                    >
                      {category.name}
                    </motion.p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

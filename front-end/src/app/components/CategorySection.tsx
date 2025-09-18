
// export  function CategorySection() {
//     return (
//         <>
//         <section className="grid grid-cols-14 justify-center items-center col-gap-4 mt-16"> 
//                 <div className="w-20 h-20 col-start-1 col-end-2 bg-gray-200 rounded-xl justify-center p-4 hover:bg-[var(--foreground)]">
//                     <img className="w-full " src="hiking.svg" alt="" />
//                 </div>
//                  <div className="w-20 h-20 col-start-3 col-end-4 bg-gray-200 rounded-xl justify-center p-4">
//                     <img className="w-full" src="pool.svg" alt="" />
//                 </div>
//                  <div className="w-20 h-20 col-start-5 col-end-6 bg-gray-200 rounded-xl justify-center p-4">
//                     <img className="w-full" src="bike.svg" alt="" />
//                 </div>
//                  <div className="w-20 h-20 col-start-7 col-end-8 bg-gray-200 rounded-xl justify-center p-4">
//                     <img className="w-full" src="badminton.svg" alt="" />
//                 </div>
//                  <div className="w-20 h-20 col-start-9 col-end-10 bg-gray-200 rounded-xl justify-center p-4">
//                     <img className="w-full" src="scuba_diving.svg" alt="" />
//                 </div>
//                  <div className="w-20 h-20 col-start-11 col-end-12 bg-gray-200 rounded-xl justify-center p-4">
//                     <img className="w-full" src="yoga.svg" alt="" />
//                 </div>
//                  <div className="w-20 h-20 col-start-13 col-end-14 bg-gray-200 rounded-xl justify-center p-4">
//                     <img className="w-full" src="camping.svg" alt="" />
//                 </div>
//             </section>
//         </>
//     )
// }

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  { name: "Hiking", icon: "hiking.svg" },
  { name: "Swimming", icon: "🏊" },
  { name: "Cycling", icon: "🚴" },
  { name: "Badminton", icon: "🏸" },
  { name: "Scuba Diving", icon: "🤿" },
  { name: "Yoga", icon: "🧘" },
  { name: "Camping", icon: "🏕️" },
  { name: "Rock Climbing", icon: "🧗" },
  { name: "Surfing", icon: "🏄" },
  { name: "Tennis", icon: "🎾" },
  { name: "Running", icon: "🏃" },
  { name: "Golf", icon: "⛳" }
];

export function CategorySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);

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
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 15 : -15,
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <section className="mt-16 w-full px-4">
      <div className="relative max-w-6xl mx-auto">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110 dark:bg-black/90 dark:hover:bg-black"
          aria-label="Previous category"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110 dark:bg-black/90 dark:hover:bg-black"
          aria-label="Next category"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Carousel Container */}
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
                  style={{
                    perspective: "1000px",
                  }}
                >
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.1, 
                      rotateY: 5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center p-3 sm:p-4 hover:bg-[var(--foreground)] hover:text-white transition-all duration-300 cursor-pointer group relative overflow-hidden"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        background: [
                          "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                          "linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2))",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                    
                    
                    <img src={category.icon} alt="" className="w-12 h-12"/>
                
                  </motion.div>
                  
                  <motion.p
                    variants={itemVariants}
                    className="text-center mt-2 text-xs sm:text-sm lg:text-base transition-colors"
                  >
                    {category.name}
                  </motion.p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[var(--foreground)] w-6"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
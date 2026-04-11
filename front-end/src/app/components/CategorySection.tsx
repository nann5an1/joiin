'use client'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Bike, Dumbbell, TentTree, Volleyball, BadgeIcon, Activity, Wind, Mountain, Waves, Trophy, Target, Footprints } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const sportsCategories = [
  { icon: Bike,       name: "Cycling",     color: "from-cyan-400 to-cyan-600",   keyword: "cycling" },
  { icon: Volleyball, name: "Badminton",   color: "from-blue-400 to-blue-600",   keyword: "badminton" },
  { icon: Activity,   name: "Yoga",        color: "from-teal-400 to-teal-600",   keyword: "yoga" },
  { icon: TentTree,   name: "Camping",     color: "from-green-400 to-green-600", keyword: "camping" },
  { icon: Target,     name: "Pickleball",  color: "from-cyan-500 to-blue-500",   keyword: "pickleball" },
  { icon: Trophy,     name: "Basketball",  color: "from-blue-500 to-teal-500",   keyword: "basketball" },
  { icon: Dumbbell,   name: "Fitness",     color: "from-teal-500 to-green-500",  keyword: "fitness" },
  { icon: Mountain,   name: "Hiking",      color: "from-green-500 to-cyan-500",  keyword: "hiking" },
  { icon: Waves,      name: "Swimming",    color: "from-cyan-400 to-teal-400",   keyword: "swimming" },
  { icon: Wind,       name: "Running",     color: "from-blue-400 to-cyan-400",   keyword: "running" },
  { icon: Footprints, name: "Walking",     color: "from-teal-400 to-blue-400",   keyword: "walking" },
  { icon: BadgeIcon,  name: "Tennis",      color: "from-green-400 to-blue-400",  keyword: "tennis" },
];

export function CategorySection() {
  const router = useRouter();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 768,  settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 480,  settings: { slidesToShow: 2, slidesToScroll: 1, dots: false } },
    ],
  };

  return (
    <section className="py-10 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto px-8">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full mb-3 sm:mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-700 text-xs sm:text-sm font-medium">Explore Sports</span>
          </motion.div>
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Find Your{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Perfect Sport
            </span>
          </motion.h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-4 sm:px-0">
            Browse through various sports categories and discover events tailored for you
          </p>
        </div>

        {/* Carousel */}
        <div className="sports-carousel">
          <Slider {...settings}>
            {sportsCategories.map((sport, index) => (
              <div key={index} className="px-2">
                <motion.div
                  className="flex flex-col items-center justify-center py-3 sm:py-4 cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push(`/upcoming_events?search=${sport.keyword}`)}
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${sport.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 group-hover:shadow-xl transition-shadow duration-300`}>
                    <sport.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-cyan-600 transition-colors text-center">
                    {sport.name}
                  </span>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style>{`
        .sports-carousel .slick-list {
          overflow: hidden;
        }
        .sports-carousel .slick-dots {
          bottom: -32px;
        }
        .sports-carousel .slick-dots li button:before {
          font-size: 7px;
          color: #06b6d4;
        }
        .sports-carousel .slick-dots li.slick-active button:before {
          color: #0891b2;
        }
        .sports-carousel .slick-prev,
        .sports-carousel .slick-next {
          width: 32px;
          height: 32px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          z-index: 10;
          display: flex !important;
          align-items: center;
          justify-content: center;
        }
        .sports-carousel .slick-prev { left: -16px; }
        .sports-carousel .slick-next { right: -16px; }
        .sports-carousel .slick-prev:before,
        .sports-carousel .slick-next:before {
          font-size: 18px;
          color: #0891b2;
          line-height: 1;
        }
        .sports-carousel .slick-prev:hover,
        .sports-carousel .slick-next:hover {
          background: #ecfeff;
        }
        @media (min-width: 640px) {
          .sports-carousel .slick-prev { left: -18px; }
          .sports-carousel .slick-next { right: -18px; }
          .sports-carousel .slick-prev:before,
          .sports-carousel .slick-next:before { font-size: 20px; }
        }
      `}</style>
    </section>
  );
}

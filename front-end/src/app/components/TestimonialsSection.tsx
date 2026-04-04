import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Tournament Director",
    org: "City Sports League",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    quote: "SportSync transformed how we manage our annual basketball tournament. What used to take weeks of planning now takes just a few hours. The automated scheduling is a game-changer!",
    rating: 5,
    highlight: false,
  },
  {
    name: "Michael Chen",
    role: "Athletic Coordinator",
    org: "Regional High School District",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    quote: "Managing 12 different sports across multiple schools was a nightmare before SportSync. Now everything is organized, parents are informed, and our teams are happier than ever.",
    rating: 5,
    highlight: false,
  },
  {
    name: "Emily Rodriguez",
    role: "Event Manager",
    org: "National Youth Sports",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    quote: "The real-time updates and communication features have drastically reduced confusion and no-shows. Our event attendance has improved by 40% since switching to SportSync.",
    rating: 5,
    highlight: false,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full mb-4">
            <span className="text-cyan-700 text-sm font-medium">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            Loved by{" "}
            <span className="text-cyan-400">Event Coordinators</span>
          </h2>
          <p className="text-lg text-gray-600">
            See what sports professionals are saying about SportSync
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className={`p-6 hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-cyan-200 relative overflow-hidden ${
                t.highlight ? "border-cyan-300" : "border-gray-100"
              }`}
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-30" />

              <div className="relative">
                {/* Quote icon */}
                <Quote className="w-10 h-10 text-cyan-200 mb-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                    <p className="text-xs text-cyan-500">{t.org}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}

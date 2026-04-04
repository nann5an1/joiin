import { Calendar, Users, Trophy, Bell, BarChart3, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Intelligent calendar system that automatically manages game times, venues, and team availability.",
    color: "from-cyan-400 to-cyan-600",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Organize teams, track rosters, and manage player information all in one centralized platform.",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: Trophy,
    title: "Tournament Brackets",
    description: "Create and manage tournament brackets with automatic progression and real-time score updates.",
    color: "from-teal-400 to-teal-600",
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    description: "Keep everyone informed with instant updates about schedule changes, scores, and announcements.",
    color: "from-green-400 to-green-600",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track performance metrics, attendance rates, and generate comprehensive event reports.",
    color: "from-sky-400 to-sky-600",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime to ensure your data is always safe and accessible.",
    color: "from-cyan-500 to-blue-600",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-700 text-sm font-medium">Features</span>
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Everything You Need to Run{" "}
            <span className="text-cyan-400">Perfect Events</span>
          </motion.h2>
          <p className="text-lg text-gray-600">
            Powerful tools designed to make sports event coordination effortless and efficient
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-cyan-200 group h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

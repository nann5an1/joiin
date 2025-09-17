import { Card, CardContent } from "@/components/ui/card";
import { 
  Zap, 
  Shield, 
  Users, 
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Setup",
    description: "Create and publish sports events in under 5 minutes with our intuitive drag-and-drop builder."
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Effortlessly manage teams, players, and registrations with automated notifications and reminders."
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Integrated payment processing with industry-standard security for entry fees and merchandise."
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need to Create Amazing Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to make sports event management effortless, 
            from small local games to large tournaments.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
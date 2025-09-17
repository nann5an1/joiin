import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings, Share2, Play } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Plus,
    title: "Create Your Event",
    description: "Use our intuitive builder to set up your sports event with all the details, rules, and requirements.",
    color: "bg-blue-500"
  },
  {
    step: "02",
    icon: Settings,
    title: "Configure & Customize",
    description: "Set registration limits, pricing, schedules, and customize the look to match your brand.",
    color: "bg-green-500"
  },
  {
    step: "03",
    icon: Share2,
    title: "Share & Promote",
    description: "Share your event link across social media, email, and other channels to attract participants.",
    color: "bg-purple-500"
  },
  {
    step: "04",
    icon: Play,
    title: "Manage & Execute",
    description: "Track registrations, communicate with participants, and run your event smoothly on event day.",
    color: "bg-orange-500"
  }
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Get your sports event up and running in four simple steps
          </p>
          <Button variant="outline" className="mb-8">
            <Play className="mr-2 h-4 w-4" />
            Watch 2-minute Demo
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className="mb-4">
                    <div className={`w-16 h-16 ${step.color} text-white rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div className="text-sm font-bold text-gray-400 mb-2">
                      STEP {step.step}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg">
            Start Creating Your Event
          </Button>
        </div>
      </div>
    </section>
  );
}
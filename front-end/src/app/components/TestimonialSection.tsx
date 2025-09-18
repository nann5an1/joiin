import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marathon Event Director",
    company: "City Running Club",
    content: "SportSync transformed how we organize our annual marathon. The registration process is seamless, and the analytics help us improve every year. Couldn't be happier!",
    rating: 5,
    avatar: "SJ"
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Basketball League Commissioner",
    company: "Metro Basketball Association",
    content: "Managing our 16-team league used to be a nightmare. Now with SportSync, everything from scheduling to team communications is automated. Game changer!",
    rating: 5,
    avatar: "MC"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Fitness Instructor",
    company: "FitLife Studios",
    content: "I've organized over 50 fitness events using SportSync. The platform is intuitive, my participants love the experience, and I save hours every week.",
    rating: 5,
    avatar: "ER"
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Event Organizers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what sports event organizers are saying about SportSync.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-blue-500 text-white">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
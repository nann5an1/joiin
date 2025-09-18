import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Zap className="h-8 w-8" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Create Your First Event?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of event organizers who trust Join to bring their sports communities together. 
            Start creating amazing events today – it's free to get started!
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10">
            Schedule Demo Call
          </Button>
        </div>
        
        <div className="mt-8 text-sm opacity-75">
          <p>No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </div>
    </section>
  );
}
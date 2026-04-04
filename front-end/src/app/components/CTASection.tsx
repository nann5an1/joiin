import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              ✦ Limited Time Offer
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Ready to Transform Your Sports Events?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-lg">
              Join thousands of event coordinators who have already revolutionized their
              sports management. Start your free 14-day trial today — no credit card required.
            </p>
            <div className="flex flex-row gap-4 flex-wrap">
              <Link href="/sign_up">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white bg-transparent hover:bg-white hover:text-blue-600 px-8"
                >
                  Start Free Trial →
                </Button>
              </Link>
              <Link href="/sign_up">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-white/90 px-8"
                >
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                {['bg-pink-400', 'bg-purple-400', 'bg-blue-400'].map((c, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white`} />
                ))}
              </div>
              <span className="text-sm opacity-80">50k+ coordinators trust us</span>
            </div>
          </div>

          {/* Right: bordered placeholder box */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-80 h-64 rounded-2xl border-2 border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl">
              <div className="text-center text-white/80">
                <div className="text-5xl mb-3">🏆</div>
                <p className="font-semibold text-lg">Your next event awaits</p>
                <p className="text-sm opacity-70 mt-1">Sign up and get started today</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

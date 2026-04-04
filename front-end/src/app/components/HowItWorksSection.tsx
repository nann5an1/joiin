const steps = [
  {
    step: "01",
    title: "Create Your Event",
    description: "Set up your sports event in minutes with our intuitive event creation wizard. Define teams, venues, and schedules.",
  },
  {
    step: "02",
    title: "Invite & Coordinate",
    description: "Send invitations to teams, coaches, and officials. Everyone stays connected through our unified platform.",
  },
  {
    step: "03",
    title: "Manage & Track",
    description: "Monitor everything in real-time. Update scores, manage changes, and keep all participants informed instantly.",
  },
  {
    step: "04",
    title: "Analyze & Improve",
    description: "Review comprehensive analytics and feedback to make your next event even better.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16" style={{ background: 'linear-gradient(to bottom, #e8f4ff, #C2EFFF)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Centered header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="text-3xl font-bold text-gray-900">
            Get Started in <span className="text-cyan-400">Four Simple Steps</span>
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            From setup to success, we've streamlined the entire process
          </p>
        </div>

        {/* 2-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: steps list */}
          <div className="flex flex-col gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-5">
                <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{step.step}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: gradient placeholder */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <div className="w-full h-96 bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-400 flex items-center justify-center">
              <div className="text-white text-center px-8">
                <div className="text-6xl mb-4">⚽</div>
                <p className="font-semibold text-xl mb-2">Get in the Game</p>
                <p className="text-sm opacity-80">Start your sports journey today</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

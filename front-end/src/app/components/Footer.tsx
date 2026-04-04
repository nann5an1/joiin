'use client';

export const Footer = () => {
  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Top grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">

          {/* Logo + tagline + socials */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/join.png" alt="Joiin" className="w-8 h-8 object-contain" />
              <span className="text-white text-xl font-bold">Joiin</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              The all-in-one platform for sports event coordination. Streamline your
              tournaments, leagues, and sporting events with ease.
            </p>
            <div className="flex gap-4">
              {/* Facebook */}
              <a href="/" aria-label="Facebook" className="hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="/" aria-label="Twitter" className="hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="/" aria-label="Instagram" className="hover:text-white transition-colors">
                <svg viewBox="0 0 30 30" fill="currentColor" className="h-5 w-5">
                  <circle cx="15" cy="15" r="4" />
                  <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10 C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1 c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="/" aria-label="LinkedIn" className="hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-white font-semibold mb-4">Product</p>
            <ul className="space-y-2 text-sm">
              <li><a href="/#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Use Cases</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Updates</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-white font-semibold mb-4">Company</p>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-white font-semibold mb-4">Support</p>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="/" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2024 Joiin. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="/" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

import Link from 'next/link'

export default function CTA() {
  return (
    <section className="relative bg-blue-600 py-12 md:py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/4">
          <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <circle cx="400" cy="400" r="400" fill="url(#gradient)" />
          </svg>
        </div>
        <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4">
          <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <circle cx="300" cy="300" r="300" fill="url(#gradient2)" />
          </svg>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your AI capabilities?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join leading enterprises that are building reliable, scalable AI systems with IdeaCode's orchestration platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/signup" className="btn text-blue-600 bg-white hover:bg-blue-50 w-full sm:w-auto">
              Start Free Trial
            </Link>
            <Link href="/demo" className="btn text-white border-2 border-white hover:bg-blue-700 w-full sm:w-auto">
              Request Demo
            </Link>
          </div>
          <div className="mt-8 text-blue-100 text-sm">
            <p>No credit card required. 14-day free trial with full platform access.</p>
          </div>
        </div>

        {/* Logos */}
        <div className="mt-12 md:mt-16">
          <p className="text-center text-blue-200 text-sm font-medium mb-6">TRUSTED BY INNOVATIVE COMPANIES</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="flex items-center justify-center">
              <div className="h-8 text-blue-100 opacity-70 hover:opacity-100 transition duration-300">
                <svg className="h-full" viewBox="0 0 100 30" fill="currentColor">
                  <path d="M15 5h-5v20h5V5zm20 0h-5v20h5V5zm-10 0h-5v20h5V5zM60 5H40v5h7.5v15H55V10h5V5zM80 5h-5L65 25h5.5l1.5-3.75h11L84.5 25H90L80 5zm-6.25 11.25L77.5 10l3.75 6.25h-7.5z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 text-blue-100 opacity-70 hover:opacity-100 transition duration-300">
                <svg className="h-full" viewBox="0 0 100 30" fill="currentColor">
                  <path d="M20 5h-5v8.5h-.25L5 5H0v20h5v-8.5h.25L15 25h5V5zm15 0h-5v20h15v-5h-10V5zm35 0H55v20h15v-5H60v-3h10v-4H60V10h10V5zM85 5h15v5H90v3h10v4H90v3h10v5H85V5z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 text-blue-100 opacity-70 hover:opacity-100 transition duration-300">
                <svg className="h-full" viewBox="0 0 100 30" fill="currentColor">
                  <path d="M30 15c0-5.5-4.5-10-10-10S10 9.5 10 15s4.5 10 10 10 10-4.5 10-10zm-10 5c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm40-5c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm-10 5c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm40-5c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm-10 5c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 text-blue-100 opacity-70 hover:opacity-100 transition duration-300">
                <svg className="h-full" viewBox="0 0 100 30" fill="currentColor">
                  <path d="M10 25h5V5h-5v20zm40-20h-5v8.5h-.25L35 5h-5v20h5v-8.5h.25L45 25h5V5zm15 0h15v5H70v15h-5V10h-5V5zm30 0h-5v20h5V5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
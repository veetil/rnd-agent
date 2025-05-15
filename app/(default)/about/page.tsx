import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'About - IdeaCode',
  description: 'Learn about IdeaCode\'s mission, vision, and the team behind the enterprise AI orchestration platform.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h1 mb-6">About IdeaCode</h1>
            <p className="text-xl text-gray-600 mb-8">
              We're building the future of enterprise AI orchestration.
            </p>
          </div>
        </div>
      </section>

      {/* Mission section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="h2 mb-4">Our Mission</h2>
              <p className="text-xl text-gray-600">
                To empower organizations with reliable, scalable, and portable AI agent systems that drive innovation and efficiency.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="h3 mb-4">The Problem We're Solving</h3>
                <p className="text-lg text-gray-600 mb-4">
                  As AI systems become more complex and mission-critical, organizations face significant challenges in orchestrating, scaling, and maintaining these systems across different environments and models.
                </p>
                <p className="text-lg text-gray-600">
                  The lack of standardization and enterprise-grade infrastructure leads to fragmented implementations, vendor lock-in, and operational inefficiencies.
                </p>
              </div>
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="h3 mb-4">Our Solution</h3>
                <p className="text-lg text-gray-600 mb-4">
                  IdeaCode provides an enterprise-grade orchestration layer that abstracts away the complexity of managing AI agent systems, enabling:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Model portability and interoperability</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Sophisticated orchestration workflows</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Persistent memory and context management</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Enterprise-grade reliability and security</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="h2 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Trust & Reliability</h3>
              <p className="text-gray-600">
                We build systems that organizations can depend on for their most critical AI operations, with a focus on stability, security, and consistent performance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Interoperability</h3>
              <p className="text-gray-600">
                We believe in breaking down silos and enabling seamless integration across different AI models, platforms, and systems to maximize flexibility and value.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously push the boundaries of what's possible in AI orchestration, staying ahead of emerging trends and technologies to deliver cutting-edge solutions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Partnership</h3>
              <p className="text-gray-600">
                We work closely with our customers, treating their challenges as our own and developing solutions that directly address their specific needs and objectives.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Transparency</h3>
              <p className="text-gray-600">
                We believe in open communication and visibility into how our systems work, enabling informed decision-making and building trust with our customers and partners.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Scalability</h3>
              <p className="text-gray-600">
                We design our solutions to grow with our customers, supporting their journey from initial AI adoption to enterprise-wide deployment with consistent performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-blue-600 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 text-center">
          <h2 className="h2 text-white mb-6">Ready to transform your AI operations?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join the organizations that are leveraging IdeaCode to build scalable, reliable AI agent systems.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn text-blue-600 bg-white hover:bg-blue-50">
              Contact Sales
            </Link>
            <Link href="/documentation/getting-started" className="btn text-white border-2 border-white hover:bg-blue-700">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
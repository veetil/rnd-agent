import Image from 'next/image'
import Link from 'next/link'
import CTASection from '@/components/cta-section'

export const metadata = {
  title: 'IdeaCode - Enterprise-grade orchestration layer for AI agent systems',
  description: 'IdeaCode provides a reliable, scalable, and secure orchestration layer for enterprise AI agent systems, enabling model portability, orchestration excellence, memory persistence, and operational reliability.',
}

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h1 mb-6">Enterprise-grade orchestration layer for AI agent systems</h1>
            <p className="text-xl text-gray-600 mb-8">
              Build reliable, scalable, and secure AI agent systems that work together seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/platform" className="btn text-white bg-blue-600 hover:bg-blue-700">
                Explore Platform
              </Link>
              <Link href="/contact" className="btn text-blue-600 bg-white border-2 border-blue-600 hover:bg-blue-50">
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-gray-500 uppercase tracking-wider text-sm font-semibold">Trusted by leading enterprises</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {/* Placeholder logos - replace with actual client logos */}
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>

      {/* Key differentiators section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="h2 mb-4">Why IdeaCode?</h2>
            <p className="text-lg text-gray-600">
              Our platform provides four key differentiators that make it the ideal choice for enterprise AI orchestration.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Model Portability */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="h3 mb-3">Model Portability</h3>
              <p className="text-gray-600 mb-4">
                Switch between different AI models and providers without changing your application code. IdeaCode provides a unified interface that abstracts away the complexities of different AI models.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Support for all major AI providers</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Seamless model switching</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Consistent API across models</span>
                </li>
              </ul>
              <Link href="/platform/model-portability" className="text-blue-600 font-medium hover:text-blue-700">
                Learn more →
              </Link>
            </div>

            {/* Orchestration Excellence */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="h3 mb-3">Orchestration Excellence</h3>
              <p className="text-gray-600 mb-4">
                Coordinate multiple AI agents to work together seamlessly, handling complex workflows and ensuring efficient communication between agents.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced workflow management</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Inter-agent communication</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Task distribution and monitoring</span>
                </li>
              </ul>
              <Link href="/platform/orchestration" className="text-blue-600 font-medium hover:text-blue-700">
                Learn more →
              </Link>
            </div>

            {/* Memory Persistence */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="h3 mb-3">Memory Persistence</h3>
              <p className="text-gray-600 mb-4">
                Enable AI agents to maintain context and remember past interactions, creating more coherent and personalized experiences for users.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Long-term memory storage</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Context-aware interactions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Secure and compliant data storage</span>
                </li>
              </ul>
              <Link href="/platform/memory-persistence" className="text-blue-600 font-medium hover:text-blue-700">
                Learn more →
              </Link>
            </div>

            {/* Operational Reliability */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="h3 mb-3">Operational Reliability</h3>
              <p className="text-gray-600 mb-4">
                Build AI systems that meet enterprise requirements for uptime, performance, and security, with comprehensive monitoring and management tools.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>99.9% uptime guarantee</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced monitoring and alerting</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Enterprise-grade security</span>
                </li>
              </ul>
              <Link href="/platform/reliability" className="text-blue-600 font-medium hover:text-blue-700">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="h2 mb-4">Powering AI Innovation Across Industries</h2>
            <p className="text-lg text-gray-600">
              See how organizations are using IdeaCode to build intelligent, reliable AI systems.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Use case 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="h3 mb-3">Financial Services</h3>
                <p className="text-gray-600 mb-4">
                  How a leading bank automated customer service and fraud detection with IdeaCode's orchestration platform.
                </p>
                <Link href="/case-studies/financial-services" className="text-blue-600 font-medium hover:text-blue-700">
                  Read case study →
                </Link>
              </div>
            </div>

            {/* Use case 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="h3 mb-3">Healthcare</h3>
                <p className="text-gray-600 mb-4">
                  How a healthcare provider improved patient care with AI-powered clinical decision support.
                </p>
                <Link href="/case-studies/healthcare" className="text-blue-600 font-medium hover:text-blue-700">
                  Read case study →
                </Link>
              </div>
            </div>

            {/* Use case 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="h3 mb-3">E-commerce</h3>
                <p className="text-gray-600 mb-4">
                  How an e-commerce platform increased sales by 35% with personalized shopping experiences.
                </p>
                <Link href="/case-studies/e-commerce" className="text-blue-600 font-medium hover:text-blue-700">
                  Read case study →
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/case-studies" className="btn text-white bg-blue-600 hover:bg-blue-700">
              View All Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <CTASection
        title="Ready to transform your AI capabilities?"
        description="Get started with IdeaCode today and build enterprise-grade AI agent systems that deliver real business value."
        primaryCTA={{
          text: "Schedule a Demo",
          href: "/contact"
        }}
        secondaryCTA={{
          text: "Explore Platform",
          href: "/platform"
        }}
        background="gradient"
      />
    </>
  )
}

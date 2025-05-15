import Link from 'next/link'

export const metadata = {
  title: 'Documentation - IdeaCode',
  description: 'Technical documentation and guides for the IdeaCode enterprise AI orchestration platform.',
}

export default function DocumentationPage() {
  return (
    <>
      {/* Hero section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h1 mb-6">Documentation</h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive guides and technical documentation for the IdeaCode platform.
            </p>
          </div>
        </div>
      </section>

      {/* Documentation sections */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {/* Getting Started */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">Getting Started</h2>
              <p className="text-gray-600 mb-6">
                Everything you need to know to get up and running with the IdeaCode platform.
              </p>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link href="/documentation/getting-started/introduction" className="text-blue-600 hover:text-blue-800">
                    Introduction to IdeaCode
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/getting-started/quick-start" className="text-blue-600 hover:text-blue-800">
                    Quick Start Guide
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/getting-started/installation" className="text-blue-600 hover:text-blue-800">
                    Installation & Setup
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/getting-started/key-concepts" className="text-blue-600 hover:text-blue-800">
                    Key Concepts
                  </Link>
                </li>
              </ul>
              <Link href="/documentation/getting-started" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                View all guides
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* API Reference */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">API Reference</h2>
              <p className="text-gray-600 mb-6">
                Comprehensive API documentation for developers integrating with the IdeaCode platform.
              </p>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link href="/documentation/api/authentication" className="text-blue-600 hover:text-blue-800">
                    Authentication
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/api/models" className="text-blue-600 hover:text-blue-800">
                    Models API
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/api/orchestration" className="text-blue-600 hover:text-blue-800">
                    Orchestration API
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/api/memory" className="text-blue-600 hover:text-blue-800">
                    Memory API
                  </Link>
                </li>
              </ul>
              <Link href="/documentation/api" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                View full API reference
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* SDKs & Libraries */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">SDKs & Libraries</h2>
              <p className="text-gray-600 mb-6">
                Client libraries and SDKs for popular programming languages and frameworks.
              </p>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link href="/documentation/sdks/javascript" className="text-blue-600 hover:text-blue-800">
                    JavaScript/TypeScript SDK
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/sdks/python" className="text-blue-600 hover:text-blue-800">
                    Python SDK
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/sdks/java" className="text-blue-600 hover:text-blue-800">
                    Java SDK
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/sdks/go" className="text-blue-600 hover:text-blue-800">
                    Go SDK
                  </Link>
                </li>
              </ul>
              <Link href="/documentation/sdks" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                View all SDKs
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Tutorials */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">Tutorials</h2>
              <p className="text-gray-600 mb-6">
                Step-by-step tutorials for common use cases and integration scenarios.
              </p>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link href="/documentation/tutorials/chatbot" className="text-blue-600 hover:text-blue-800">
                    Building a Chatbot
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/tutorials/agent-workflow" className="text-blue-600 hover:text-blue-800">
                    Creating Agent Workflows
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/tutorials/memory-integration" className="text-blue-600 hover:text-blue-800">
                    Implementing Memory
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/tutorials/model-switching" className="text-blue-600 hover:text-blue-800">
                    Model Switching
                  </Link>
                </li>
              </ul>
              <Link href="/documentation/tutorials" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                View all tutorials
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Best Practices */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">Best Practices</h2>
              <p className="text-gray-600 mb-6">
                Guidelines and recommendations for building robust, scalable AI systems with IdeaCode.
              </p>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link href="/documentation/best-practices/architecture" className="text-blue-600 hover:text-blue-800">
                    System Architecture
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/best-practices/security" className="text-blue-600 hover:text-blue-800">
                    Security Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/best-practices/performance" className="text-blue-600 hover:text-blue-800">
                    Performance Optimization
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/best-practices/monitoring" className="text-blue-600 hover:text-blue-800">
                    Monitoring & Observability
                  </Link>
                </li>
              </ul>
              <Link href="/documentation/best-practices" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                View all best practices
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* FAQ & Troubleshooting */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">FAQ & Troubleshooting</h2>
              <p className="text-gray-600 mb-6">
                Common questions and solutions to frequently encountered issues.
              </p>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link href="/documentation/faq/general" className="text-blue-600 hover:text-blue-800">
                    General FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/faq/api-issues" className="text-blue-600 hover:text-blue-800">
                    API Troubleshooting
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/faq/orchestration-issues" className="text-blue-600 hover:text-blue-800">
                    Orchestration Issues
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/faq/memory-issues" className="text-blue-600 hover:text-blue-800">
                    Memory Troubleshooting
                  </Link>
                </li>
              </ul>
              <Link href="/documentation/faq" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                View all FAQs
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community & Support section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="h2 mb-4">Community & Support</h2>
            <p className="text-lg text-gray-600">
              Connect with the IdeaCode community and get the help you need.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Community Forum</h3>
              <p className="text-gray-600 mb-6">
                Join discussions, ask questions, and share your experiences with other IdeaCode users.
              </p>
              <Link href="https://community.ideacode.ai" className="btn text-white bg-blue-600 hover:bg-blue-700">
                Visit Forum
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Developer Discord</h3>
              <p className="text-gray-600 mb-6">
                Connect with the IdeaCode team and other developers in real-time on our Discord server.
              </p>
              <Link href="https://discord.gg/ideacode" className="btn text-white bg-blue-600 hover:bg-blue-700">
                Join Discord
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Technical Support</h3>
              <p className="text-gray-600 mb-6">
                Get help from our dedicated support team for technical issues and questions.
              </p>
              <Link href="/support" className="btn text-white bg-blue-600 hover:bg-blue-700">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
import Link from 'next/link'

export const metadata = {
  title: 'Getting Started - IdeaCode Documentation',
  description: 'Get started with the IdeaCode enterprise AI orchestration platform.',
}

export default function GettingStartedPage() {
  return (
    <>
      {/* Hero section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h1 mb-6">Getting Started</h1>
            <p className="text-xl text-gray-600 mb-8">
              Everything you need to know to get up and running with the IdeaCode platform.
            </p>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2>Welcome to IdeaCode</h2>
              <p>
                IdeaCode is an enterprise-grade orchestration layer for AI agent systems. This guide will help you get started with the platform and understand its key features.
              </p>
              
              <div className="grid gap-8 mt-12">
                {/* Introduction */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Introduction to IdeaCode</h3>
                  <p className="text-gray-600 mb-4">
                    Learn about the core concepts and architecture of the IdeaCode platform.
                  </p>
                  <Link href="/documentation/getting-started/introduction" className="text-blue-600 font-medium hover:text-blue-800">
                    Read introduction
                  </Link>
                </div>

                {/* Quick Start */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Quick Start Guide</h3>
                  <p className="text-gray-600 mb-4">
                    Get up and running with IdeaCode in less than 10 minutes.
                  </p>
                  <Link href="/documentation/getting-started/quick-start" className="text-blue-600 font-medium hover:text-blue-800">
                    Follow quick start guide
                  </Link>
                </div>

                {/* Installation & Setup */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Installation & Setup</h3>
                  <p className="text-gray-600 mb-4">
                    Detailed instructions for installing and configuring IdeaCode in your environment.
                  </p>
                  <Link href="/documentation/getting-started/installation" className="text-blue-600 font-medium hover:text-blue-800">
                    View installation guide
                  </Link>
                </div>

                {/* Key Concepts */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Key Concepts</h3>
                  <p className="text-gray-600 mb-4">
                    Understand the fundamental concepts and terminology used in IdeaCode.
                  </p>
                  <Link href="/documentation/getting-started/key-concepts" className="text-blue-600 font-medium hover:text-blue-800">
                    Learn key concepts
                  </Link>
                </div>
              </div>
              
              <h2 className="mt-12">Next Steps</h2>
              <p>
                After you've completed the getting started guide, you can explore these resources to learn more:
              </p>
              
              <ul>
                <li>
                  <Link href="/documentation/api" className="text-blue-600 hover:text-blue-800">
                    API Reference
                  </Link> - Comprehensive API documentation for developers
                </li>
                <li>
                  <Link href="/documentation/sdks" className="text-blue-600 hover:text-blue-800">
                    SDKs & Libraries
                  </Link> - Client libraries for popular programming languages
                </li>
                <li>
                  <Link href="/documentation/tutorials" className="text-blue-600 hover:text-blue-800">
                    Tutorials
                  </Link> - Step-by-step guides for common use cases
                </li>
                <li>
                  <Link href="/documentation/examples" className="text-blue-600 hover:text-blue-800">
                    Examples
                  </Link> - Sample applications and code snippets
                </li>
              </ul>
              
              <div className="bg-blue-50 p-6 rounded-lg mt-8">
                <h3 className="text-blue-800 mb-2">Need Help?</h3>
                <p className="text-blue-700 mb-0">
                  If you have any questions or need assistance, please don't hesitate to <Link href="/support" className="text-blue-600 font-medium hover:text-blue-800">contact our support team</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
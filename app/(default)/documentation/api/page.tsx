import Link from 'next/link'

export const metadata = {
  title: 'API Reference - IdeaCode Documentation',
  description: 'Comprehensive API documentation for the IdeaCode enterprise AI orchestration platform.',
}

export default function ApiPage() {
  return (
    <>
      {/* Hero section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h1 mb-6">API Reference</h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive API documentation for developers integrating with the IdeaCode platform.
            </p>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2>API Overview</h2>
              <p>
                The IdeaCode API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.
              </p>
              
              <div className="grid gap-8 mt-12">
                {/* Authentication */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Authentication</h3>
                  <p className="text-gray-600 mb-4">
                    Learn how to authenticate with the IdeaCode API using API keys or OAuth 2.0.
                  </p>
                  <Link href="/documentation/api/authentication" className="text-blue-600 font-medium hover:text-blue-800">
                    View authentication docs
                  </Link>
                </div>

                {/* Models API */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Models API</h3>
                  <p className="text-gray-600 mb-4">
                    Manage and interact with AI models through a unified interface.
                  </p>
                  <Link href="/documentation/api/models" className="text-blue-600 font-medium hover:text-blue-800">
                    View Models API docs
                  </Link>
                </div>

                {/* Orchestration API */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Orchestration API</h3>
                  <p className="text-gray-600 mb-4">
                    Coordinate complex workflows and agent interactions with the Orchestration API.
                  </p>
                  <Link href="/documentation/api/orchestration" className="text-blue-600 font-medium hover:text-blue-800">
                    View Orchestration API docs
                  </Link>
                </div>

                {/* Memory API */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Memory API</h3>
                  <p className="text-gray-600 mb-4">
                    Store and retrieve contextual information for AI agents with the Memory API.
                  </p>
                  <Link href="/documentation/api/memory" className="text-blue-600 font-medium hover:text-blue-800">
                    View Memory API docs
                  </Link>
                </div>
              </div>
              
              <h2 className="mt-12">API Versioning</h2>
              <p>
                The IdeaCode API is versioned to ensure backward compatibility. The current version is v1. All API requests should include the version in the URL path.
              </p>
              
              <div className="bg-gray-800 text-white p-3 rounded-md mb-4 overflow-x-auto">
                <pre><code>https://api.ideacode.ai/v1/models</code></pre>
              </div>
              
              <h2>Rate Limits</h2>
              <p>
                The IdeaCode API implements rate limiting to ensure fair usage and system stability. Rate limits vary by endpoint and subscription tier. You can check your current rate limit status in the response headers.
              </p>
              
              <table className="min-w-full divide-y divide-gray-200 mt-4">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Header</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">X-RateLimit-Limit</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">The maximum number of requests you're permitted to make per hour.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">X-RateLimit-Remaining</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">The number of requests remaining in the current rate limit window.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">X-RateLimit-Reset</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">The time at which the current rate limit window resets in UTC epoch seconds.</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="bg-blue-50 p-6 rounded-lg mt-8">
                <h3 className="text-blue-800 mb-2">Need Help?</h3>
                <p className="text-blue-700 mb-0">
                  If you have any questions or need assistance with our API, please don't hesitate to <Link href="/support" className="text-blue-600 font-medium hover:text-blue-800">contact our support team</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
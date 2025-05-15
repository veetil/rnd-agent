import Link from 'next/link'

export const metadata = {
  title: 'SDKs & Libraries - IdeaCode Documentation',
  description: 'Client libraries and SDKs for the IdeaCode enterprise AI orchestration platform.',
}

export default function SdksPage() {
  return (
    <>
      {/* Hero section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h1 mb-6">SDKs & Libraries</h1>
            <p className="text-xl text-gray-600 mb-8">
              Client libraries and SDKs for popular programming languages and frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2>IdeaCode SDKs</h2>
              <p>
                IdeaCode provides official client libraries for popular programming languages to make it easy to integrate with our platform. These SDKs handle authentication, error handling, and provide a convenient interface for interacting with the IdeaCode API.
              </p>
              
              <div className="grid gap-8 md:grid-cols-2 mt-12">
                {/* JavaScript/TypeScript SDK */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold">JavaScript/TypeScript</h3>
                  <p className="text-gray-600 mb-4">
                    Our JavaScript/TypeScript SDK works in both Node.js and browser environments.
                  </p>
                  <Link href="/documentation/sdks/javascript" className="text-blue-600 font-medium hover:text-blue-800">
                    View documentation
                  </Link>
                </div>

                {/* Python SDK */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Python</h3>
                  <p className="text-gray-600 mb-4">
                    Our Python SDK provides a Pythonic interface to the IdeaCode API.
                  </p>
                  <Link href="/documentation/sdks/python" className="text-blue-600 font-medium hover:text-blue-800">
                    View documentation
                  </Link>
                </div>

                {/* Java SDK */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Java</h3>
                  <p className="text-gray-600 mb-4">
                    Our Java SDK provides a robust, type-safe interface to the IdeaCode API.
                  </p>
                  <Link href="/documentation/sdks/java" className="text-blue-600 font-medium hover:text-blue-800">
                    View documentation
                  </Link>
                </div>

                {/* Go SDK */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold">Go</h3>
                  <p className="text-gray-600 mb-4">
                    Our Go SDK provides a clean, idiomatic interface to the IdeaCode API.
                  </p>
                  <Link href="/documentation/sdks/go" className="text-blue-600 font-medium hover:text-blue-800">
                    View documentation
                  </Link>
                </div>
              </div>
              
              <h2 className="mt-12">Community Libraries</h2>
              <p>
                In addition to our official SDKs, there are several community-maintained libraries that provide integration with IdeaCode:
              </p>
              
              <ul>
                <li>
                  <Link href="/documentation/sdks/ruby" className="text-blue-600 hover:text-blue-800">
                    Ruby Gem
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/sdks/php" className="text-blue-600 hover:text-blue-800">
                    PHP Library
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/sdks/dotnet" className="text-blue-600 hover:text-blue-800">
                    .NET SDK
                  </Link>
                </li>
                <li>
                  <Link href="/documentation/sdks/rust" className="text-blue-600 hover:text-blue-800">
                    Rust Crate
                  </Link>
                </li>
              </ul>
              
              <div className="bg-blue-50 p-6 rounded-lg mt-8">
                <h3 className="text-blue-800 mb-2">Need Help?</h3>
                <p className="text-blue-700 mb-0">
                  If you have any questions or need assistance with our SDKs, please don't hesitate to <Link href="/support" className="text-blue-600 font-medium hover:text-blue-800">contact our support team</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata = {
  title: 'IdeaCode for Technical Developers - Enterprise AI Orchestration',
  description: 'Powerful APIs, SDKs, and tools for technical developers to integrate sophisticated AI capabilities into applications.',
};

export default function TechnicalDevelopers() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Header />

      {/* Page content */}
      <main className="grow">
        {/* Hero section */}
        <section className="relative pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="text-center md:text-left md:flex md:items-center md:justify-between">
              {/* Hero content */}
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
                <h1 className="h1 mb-4 font-extrabold">
                  Built for Developers, by Developers
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Powerful APIs, SDKs, and tools that make it easy to integrate sophisticated AI capabilities into your applications.
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link href="/docs" className="btn text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                    View Documentation
                  </Link>
                  <Link href="/docs/getting-started/quickstart" className="btn text-gray-600 bg-gray-100 hover:bg-gray-200 w-full sm:w-auto">
                    Quickstart Guide
                  </Link>
                </div>
              </div>

              {/* Hero image */}
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="bg-gray-900 rounded-lg shadow-xl p-6">
                    <div className="bg-gray-800 rounded-md p-4 text-white font-mono text-sm overflow-hidden">
                      <div className="flex items-center mb-4">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="ml-4 text-gray-400">IdeaCode SDK Example</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-blue-400">// Initialize the IdeaCode client</div>
                        <div className="text-white">const ideacode = new IdeaCode({"{"}</div>
                        <div className="text-white pl-4">apiKey: process.env.IDEACODE_API_KEY,</div>
                        <div className="text-white pl-4">modelProvider: 'openai'</div>
                        <div className="text-white">{"}"});</div>
                        <div className="text-white"></div>
                        <div className="text-blue-400">// Create an agent workflow</div>
                        <div className="text-white">const workflow = ideacode.createWorkflow({"{"}</div>
                        <div className="text-white pl-4">name: 'customer-support',</div>
                        <div className="text-white pl-4">agents: ['classifier', 'responder', 'escalator'],</div>
                        <div className="text-white pl-4">memory: {"{"} type: 'persistent' {"}"}</div>
                        <div className="text-white">{"}"});</div>
                        <div className="text-white"></div>
                        <div className="text-blue-400">// Process a user query</div>
                        <div className="text-white">const result = await workflow.process({"{"}</div>
                        <div className="text-white pl-4">input: userQuery,</div>
                        <div className="text-white pl-4">context: userHistory</div>
                        <div className="text-white">{"}"});</div>
                      </div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-50 blur-xl"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-400 rounded-full opacity-50 blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="relative bg-gray-50">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="py-12 md:py-20">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="h2 mb-4">Developer-First Features</h2>
                <p className="text-lg text-gray-600">
                  IdeaCode provides the tools and APIs you need to build sophisticated AI agent systems with minimal effort.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {/* Feature 1 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="h4 mb-2">Unified API</h3>
                  <p className="text-gray-600 mb-4">
                    A single, consistent API that works across all major AI models, allowing you to switch providers without changing your code.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  </div>
                  <h3 className="h4 mb-2">Comprehensive SDKs</h3>
                  <p className="text-gray-600 mb-4">
                    Well-documented SDKs for all major programming languages, with type definitions and intelligent autocomplete.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="h4 mb-2">Workflow Designer</h3>
                  <p className="text-gray-600 mb-4">
                    Visual tools for designing complex agent workflows, which can be exported as code or used directly via API.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <h3 className="h4 mb-2">Memory Management</h3>
                  <p className="text-gray-600 mb-4">
                    Built-in tools for managing context and state across interactions, with support for various storage backends.
                  </p>
                </div>

                {/* Feature 5 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="h4 mb-2">Monitoring & Logging</h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive monitoring and logging tools that integrate with your existing observability stack.
                  </p>
                </div>

                {/* Feature 6 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="h4 mb-2">Local Development</h3>
                  <p className="text-gray-600 mb-4">
                    Robust local development tools, including a CLI, local server, and testing utilities for rapid iteration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code examples section */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="py-12 md:py-20 border-t border-gray-200">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="h2 mb-4">Simple to Integrate</h2>
                <p className="text-lg text-gray-600">
                  IdeaCode's APIs are designed to be easy to use while providing powerful capabilities.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-900 rounded-lg shadow-xl p-6 mb-8">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-4 text-gray-400">Model Switching Example</div>
                  </div>
                  <div className="bg-gray-800 rounded-md p-4 text-white font-mono text-sm overflow-auto">
                    <pre className="text-white">
{`// Initialize with OpenAI
const ideacode = new IdeaCode({
  apiKey: process.env.IDEACODE_API_KEY,
  modelProvider: 'openai',
  modelName: 'gpt-4'
});

// Process a request
const result = await ideacode.process({
  input: "Summarize the latest quarterly report"
});

// Switch to Anthropic
ideacode.setModelProvider({
  provider: 'anthropic',
  modelName: 'claude-3-opus'
});

// Same code works with the new model
const result2 = await ideacode.process({
  input: "Summarize the latest quarterly report"
});`}
                    </pre>
                  </div>
                </div>

                <div className="text-center">
                  <Link href="/docs/examples" className="btn text-white bg-blue-600 hover:bg-blue-700">
                    View More Examples
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="relative bg-gray-50">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="py-12 md:py-20">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="h2 mb-4">Ready to start building?</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Get started with IdeaCode today and build sophisticated AI agent systems with confidence.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link href="/signup" className="btn text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                    Create Free Account
                  </Link>
                  <Link href="/contact" className="btn text-gray-600 bg-gray-100 hover:bg-gray-200 w-full sm:w-auto">
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}
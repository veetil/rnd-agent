import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata = {
  title: 'IdeaCode for Engineering Leaders - Enterprise AI Orchestration',
  description: 'Governance, monitoring, and management tools for engineering leaders to gain visibility and control over AI systems.',
};

export default function EngineeringLeaders() {
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
                  Visibility and Control for Engineering Leaders
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Comprehensive governance, monitoring, and management tools that provide complete visibility and control over your AI systems.
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link href="/contact" className="btn text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                    Schedule a Demo
                  </Link>
                  <Link href="/solutions" className="btn text-gray-600 bg-gray-100 hover:bg-gray-200 w-full sm:w-auto">
                    Explore Solutions
                  </Link>
                </div>
              </div>

              {/* Hero image */}
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="bg-white rounded-lg shadow-xl p-6">
                    <div className="bg-gray-50 rounded-md p-4 overflow-hidden">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="text-lg font-semibold">IdeaCode Monitoring Dashboard</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-3 rounded shadow-sm">
                          <div className="text-sm text-gray-500 mb-1">Active Agents</div>
                          <div className="text-2xl font-bold text-blue-600">24</div>
                          <div className="text-xs text-green-500 mt-1">↑ 12% from last week</div>
                        </div>
                        <div className="bg-white p-3 rounded shadow-sm">
                          <div className="text-sm text-gray-500 mb-1">Avg. Response Time</div>
                          <div className="text-2xl font-bold text-blue-600">1.2s</div>
                          <div className="text-xs text-green-500 mt-1">↓ 0.3s from last week</div>
                        </div>
                        <div className="bg-white p-3 rounded shadow-sm">
                          <div className="text-sm text-gray-500 mb-1">Token Usage</div>
                          <div className="text-2xl font-bold text-blue-600">1.4M</div>
                          <div className="text-xs text-orange-500 mt-1">↑ 8% from last week</div>
                        </div>
                        <div className="bg-white p-3 rounded shadow-sm">
                          <div className="text-sm text-gray-500 mb-1">Success Rate</div>
                          <div className="text-2xl font-bold text-blue-600">99.8%</div>
                          <div className="text-xs text-green-500 mt-1">↑ 0.2% from last week</div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-sm font-medium">System Health</div>
                          <div className="text-sm text-green-600 font-medium">Excellent</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-400 rounded-full opacity-50 blur-xl"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400 rounded-full opacity-50 blur-xl"></div>
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
                <h2 className="h2 mb-4">Built for Engineering Leadership</h2>
                <p className="text-lg text-gray-600">
                  IdeaCode provides the tools engineering leaders need to effectively manage and govern AI systems at scale.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {/* Feature 1 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="h4 mb-2">Comprehensive Monitoring</h3>
                  <p className="text-gray-600 mb-4">
                    Real-time visibility into all aspects of your AI systems, including performance, usage, and health metrics.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="h4 mb-2">Governance Controls</h3>
                  <p className="text-gray-600 mb-4">
                    Enforce policies, manage access controls, and ensure compliance with regulatory requirements across all AI systems.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="h4 mb-2">Resource Optimization</h3>
                  <p className="text-gray-600 mb-4">
                    Tools to optimize resource usage, control costs, and ensure efficient utilization of AI infrastructure.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="h4 mb-2">Audit Trails</h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive logging and audit trails for all AI system activities, supporting compliance and troubleshooting.
                  </p>
                </div>

                {/* Feature 5 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <h3 className="h4 mb-2">Alerting & Notifications</h3>
                  <p className="text-gray-600 mb-4">
                    Proactive alerting system that notifies you of issues before they impact your users or business.
                  </p>
                </div>

                {/* Feature 6 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="h4 mb-2">Performance Analytics</h3>
                  <p className="text-gray-600 mb-4">
                    Detailed analytics and reporting to help you understand system performance and identify optimization opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case study section */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="py-12 md:py-20 border-t border-gray-200">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="h2 mb-4">Success Stories</h2>
                <p className="text-lg text-gray-600">
                  See how engineering leaders are using IdeaCode to manage and scale their AI systems.
                </p>
              </div>

              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-blue-600 text-white p-8 flex flex-col justify-center">
                    <div className="text-2xl font-bold mb-2">FinTech Leader</div>
                    <div className="text-blue-200 mb-4">Global financial services company</div>
                    <div className="flex items-center mb-6">
                      <div className="flex">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm">
                      "IdeaCode's governance tools have been instrumental in helping us scale our AI systems while maintaining regulatory compliance."
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-xl font-bold mb-4">Challenges</h3>
                    <ul className="text-gray-600 space-y-2 mb-6">
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Managing 50+ AI agents across multiple business units</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Strict regulatory requirements for financial services</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Need for comprehensive audit trails and monitoring</span>
                      </li>
                    </ul>
                    
                    <h3 className="text-xl font-bold mb-4">Results</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="text-2xl font-bold text-blue-600">65%</div>
                        <div className="text-sm text-gray-600">Reduction in incident response time</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="text-2xl font-bold text-blue-600">100%</div>
                        <div className="text-sm text-gray-600">Regulatory compliance</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="text-2xl font-bold text-blue-600">30%</div>
                        <div className="text-sm text-gray-600">Cost optimization</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="text-2xl font-bold text-blue-600">3x</div>
                        <div className="text-sm text-gray-600">Faster AI system deployment</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Link href="/case-studies/fintech" className="text-blue-600 hover:text-blue-800 font-medium">
                        Read the full case study &rarr;
                      </Link>
                    </div>
                  </div>
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
                <h2 className="h2 mb-4">Ready to take control of your AI systems?</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Schedule a demo to see how IdeaCode can help you manage and scale your AI infrastructure with confidence.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link href="/contact" className="btn text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                    Schedule a Demo
                  </Link>
                  <Link href="/docs" className="btn text-gray-600 bg-gray-100 hover:bg-gray-200 w-full sm:w-auto">
                    View Documentation
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
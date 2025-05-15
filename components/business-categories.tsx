import Image from "next/image";

export default function IntegrationPartners() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h3 mb-4">Trusted by leading AI companies</h2>
            <p className="text-lg text-gray-600">
              Our enterprise-grade orchestration layer powers AI agent systems
              across industries, enabling seamless integration and reliable
              operation at scale.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
              {/* Partner 1 */}
              <div className="flex items-center justify-center py-2">
                <svg className="w-32 h-8 fill-current text-gray-400" viewBox="0 0 124 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.5 16c0-5.523-4.477-10-10-10S4.5 10.477 4.5 16s4.477 10 10 10c5.523 0 10-4.477 10-10zm-10 7.5a7.5 7.5 0 110-15 7.5 7.5 0 010 15z" />
                  <path d="M32.5 4.5h-2v23h2v-23zM40.5 20h-2v7.5h2V20zM40.5 4.5h-2V16h2V4.5zM48.5 13h-2v14.5h2V13zM48.5 4.5h-2v6h2v-6zM56.5 7.5h-2v20h2v-20zM56.5 4.5h-2v1.5h2V4.5zM64.5 15h-2v12.5h2V15zM64.5 4.5h-2v9h2v-9z" />
                </svg>
              </div>

              {/* Partner 2 */}
              <div className="flex items-center justify-center py-2">
                <svg className="w-32 h-8 fill-current text-gray-400" viewBox="0 0 124 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M42.5 4.5h-20v23h20v-23zm-2 21h-16v-19h16v19z" />
                  <path d="M62.5 4.5h-10v23h10c6.351 0 11.5-5.149 11.5-11.5 0-6.351-5.149-11.5-11.5-11.5zm0 21h-8v-19h8c5.247 0 9.5 4.253 9.5 9.5 0 5.247-4.253 9.5-9.5 9.5z" />
                  <path d="M82.5 4.5h-2v23h2v-23zM99.5 4.5h-10v23h2v-9.5h8c3.866 0 7-3.134 7-7s-3.134-6.5-7-6.5zm0 11.5h-8V6.5h8c2.761 0 5 2.239 5 5s-2.239 5-5 5z" />
                </svg>
              </div>

              {/* Partner 3 */}
              <div className="flex items-center justify-center py-2">
                <svg className="w-32 h-8 fill-current text-gray-400" viewBox="0 0 124 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.5 9.5c-3.584 0-6.5 2.916-6.5 6.5s2.916 6.5 6.5 6.5 6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5zm0 11c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5z" />
                  <path d="M24.5 4.5c-6.351 0-11.5 5.149-11.5 11.5s5.149 11.5 11.5 11.5 11.5-5.149 11.5-11.5-5.149-11.5-11.5-11.5zm0 21c-5.247 0-9.5-4.253-9.5-9.5s4.253-9.5 9.5-9.5 9.5 4.253 9.5 9.5-4.253 9.5-9.5 9.5z" />
                  <path d="M52.5 9.5h-12v2h5v12h2v-12h5v-2zM57.5 9.5h-2v14h2v-14zM57.5 4.5h-2v3h2v-3zM72.5 16.75h-10v2h10v-2zM82.5 9.5h-2v14h2v-14zM82.5 4.5h-2v3h2v-3zM97.5 9.5h-10v14h2v-6h8v-2h-8v-4h8v-2z" />
                </svg>
              </div>

              {/* Partner 4 */}
              <div className="flex items-center justify-center py-2">
                <svg className="w-32 h-8 fill-current text-gray-400" viewBox="0 0 124 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44.5 4.5h-20v23h20v-23zm-2 21h-16v-19h16v19z" />
                  <path d="M54.5 4.5h-2v23h2v-23zM64.5 4.5h-2v23h2v-23zM79.5 4.5h-10v23h10v-23zm-2 21h-6v-19h6v19z" />
                  <path d="M89.5 4.5h-2v23h2v-23zM109.5 4.5h-15v23h2v-10.5h13v-2h-13V6.5h13v-2z" />
                </svg>
              </div>

              {/* Partner 5 */}
              <div className="flex items-center justify-center py-2">
                <svg className="w-32 h-8 fill-current text-gray-400" viewBox="0 0 124 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.5 4.5h-20v23h20v-23zm-2 21h-16v-19h16v19z" />
                  <path d="M34.5 4.5h-2v23h2v-23zM49.5 4.5h-10v23h2v-10.5h8c3.866 0 7-3.134 7-7s-3.134-5.5-7-5.5zm0 10.5h-8V6.5h8c2.761 0 5 2.239 5 5s-2.239 5-5 5z" />
                  <path d="M69.5 4.5h-10v23h10v-23zm-2 21h-6v-19h6v19zM79.5 4.5h-2v23h2v-23zM99.5 4.5h-15v23h2v-10.5h13v-2h-13V6.5h13v-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
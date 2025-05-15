import Image from "next/image";

export default function LargeTestimonial() {
  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none mb-16"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          width="1760"
          height="518"
          viewBox="0 0 1760 518"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-02"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g
            transform="translate(0 0)"
            fill="url(#illustration-02)"
            fillRule="evenodd"
          >
            <circle cx="1630" cy="128" r="128" />
            <circle cx="178" cy="481" r="40" />
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 mb-4">Trusted by innovative teams</h2>
            <p className="text-xl text-gray-600">
              Our enterprise-grade orchestration layer is powering the next generation
              of AI agent systems at leading companies across industries.
            </p>
          </div>

          {/* Testimonial */}
          <div className="max-w-3xl mx-auto">
            <div className="relative flex flex-col bg-white p-6 rounded-lg shadow-xl">
              {/* Testimonial content */}
              <div className="text-center">
                <div className="relative inline-flex flex-col mb-4">
                  <Image
                    className="rounded-full"
                    src="/images/testimonial-01.jpg"
                    width={96}
                    height={96}
                    alt="Testimonial 01"
                  />
                  <svg
                    className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-primary-500"
                    viewBox="0 0 24 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
                <blockquote className="text-xl text-gray-600 italic mb-4">
                  "IdeaCode's orchestration layer has been a game-changer for our AI initiatives. We've been able to build and deploy complex agent systems in a fraction of the time, with unmatched reliability and flexibility."
                </blockquote>
                <div className="font-bold text-lg text-gray-800 mb-1">
                  Sarah Johnson
                </div>
                <div className="text-gray-600">
                  CTO at TechForward
                </div>
              </div>
            </div>
          </div>

          {/* Logos */}
          <div className="max-w-5xl mx-auto mt-12">
            <div className="text-center text-sm text-gray-500 mb-6">
              Trusted by innovative companies worldwide
            </div>
            <div className="flex flex-wrap justify-center -mx-4">
              {/* Logo 1 */}
              <div className="flex items-center justify-center py-2 px-4">
                <svg
                  className="w-32 h-8 fill-current text-gray-400"
                  viewBox="0 0 124 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24.5 16c0-5.523-4.477-10-10-10S4.5 10.477 4.5 16s4.477 10 10 10c5.523 0 10-4.477 10-10zm-10 7.5a7.5 7.5 0 110-15 7.5 7.5 0 010 15z" />
                  <path d="M32.5 4.5h-2v23h2v-23zM40.5 20h-2v7.5h2V20zM40.5 4.5h-2V16h2V4.5zM48.5 13h-2v14.5h2V13zM48.5 4.5h-2v6h2v-6zM56.5 7.5h-2v20h2v-20zM56.5 4.5h-2v1.5h2V4.5zM64.5 15h-2v12.5h2V15zM64.5 4.5h-2v9h2v-9z" />
                </svg>
              </div>

              {/* Logo 2 */}
              <div className="flex items-center justify-center py-2 px-4">
                <svg
                  className="w-32 h-8 fill-current text-gray-400"
                  viewBox="0 0 124 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M42.5 4.5h-20v23h20v-23zm-2 21h-16v-19h16v19z" />
                  <path d="M62.5 4.5h-10v23h10c6.351 0 11.5-5.149 11.5-11.5 0-6.351-5.149-11.5-11.5-11.5zm0 21h-8v-19h8c5.247 0 9.5 4.253 9.5 9.5 0 5.247-4.253 9.5-9.5 9.5z" />
                  <path d="M82.5 4.5h-2v23h2v-23zM99.5 4.5h-10v23h2v-9.5h8c3.866 0 7-3.134 7-7s-3.134-6.5-7-6.5zm0 11.5h-8V6.5h8c2.761 0 5 2.239 5 5s-2.239 5-5 5z" />
                </svg>
              </div>

              {/* Logo 3 */}
              <div className="flex items-center justify-center py-2 px-4">
                <svg
                  className="w-32 h-8 fill-current text-gray-400"
                  viewBox="0 0 124 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24.5 9.5c-3.584 0-6.5 2.916-6.5 6.5s2.916 6.5 6.5 6.5 6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5zm0 11c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5z" />
                  <path d="M24.5 4.5c-6.351 0-11.5 5.149-11.5 11.5s5.149 11.5 11.5 11.5 11.5-5.149 11.5-11.5-5.149-11.5-11.5-11.5zm0 21c-5.247 0-9.5-4.253-9.5-9.5s4.253-9.5 9.5-9.5 9.5 4.253 9.5 9.5-4.253 9.5-9.5 9.5z" />
                  <path d="M52.5 9.5h-12v2h5v12h2v-12h5v-2zM57.5 9.5h-2v14h2v-14zM57.5 4.5h-2v3h2v-3zM72.5 16.75h-10v2h10v-2zM82.5 9.5h-2v14h2v-14zM82.5 4.5h-2v3h2v-3zM97.5 9.5h-10v14h2v-6h8v-2h-8v-4h8v-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
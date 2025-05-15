import Link from "next/link";
import Logo from "./logo";

interface FooterProps {
  border?: boolean;
}

export default function Footer({ border = true }: FooterProps) {
  return (
    <footer className={`${border ? "border-t border-gray-200" : ""}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-20">
            {/* Logo and company info */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="mb-2">
                <Logo />
              </div>
              <div className="text-gray-500 text-sm">
                Enterprise-grade orchestration layer for AI agent systems.
              </div>
            </div>

            {/* Footer links */}
            <div className="md:col-span-8 lg:col-span-9 grid sm:grid-cols-3 gap-8">
              {/* 1st block */}
              <div className="text-sm">
                <h6 className="text-gray-800 font-medium mb-2">Products</h6>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/features/model-portability"
                      className="text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      Model Portability
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/features/orchestration"
                      className="text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      Orchestration Excellence
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/features/memory"
                      className="text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      Memory Persistence
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/features/reliability"
                      className="text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      Operational Reliability
                    </Link>
                  </li>
                </ul>
              </div>

              {/* 2nd block */}
              <div className="text-sm">
                <h6 className="text-gray-800 font-medium mb-2">Resources</h6>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/docs"
                      className="text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/support"
                      className="text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      Support Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/case-studies"
                      className="text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      Case Studies
                    </Link>
                  </li>
                </ul>
              </div>

              {/* 3rd block */}
              <div className="text-sm">
                <h6 className="text-gray-800 font-medium mb-2">Company</h6>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom area */}
          <div className="md:flex md:items-center md:justify-between py-6 md:py-8 border-t border-gray-200 mt-12">
            {/* Social links */}
            <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
              <li>
                <a
                  href="#0"
                  className="flex justify-center items-center text-gray-500 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
                  </svg>
                </a>
              </li>
              <li className="ml-4">
                <a
                  href="#0"
                  className="flex justify-center items-center text-gray-500 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                  aria-label="Github"
                >
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                  </svg>
                </a>
              </li>
              <li className="ml-4">
                <a
                  href="#0"
                  className="flex justify-center items-center text-gray-500 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z" />
                  </svg>
                </a>
              </li>
            </ul>

            {/* Copyright */}
            <div className="text-sm text-gray-500 mr-4">
              &copy; {new Date().getFullYear()} IdeaCode. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './logo'
import MobileMenu from './mobile-menu'

export default function Header() {
  const [top, setTop] = useState<boolean>(true)
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)
  const pathname = usePathname()

  // Handle scroll event
  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true)
    }
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-white backdrop-blur-sm shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Link href="/" className="block" aria-label="IdeaCode">
              <Logo />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop menu links */}
            <ul className="flex grow justify-start flex-wrap items-center">
              <li>
                <Link
                  href="/solutions"
                  className={`text-gray-600 hover:text-gray-900 px-3 py-2 flex items-center transition duration-150 ease-in-out ${pathname === '/solutions' ? 'text-blue-600' : ''}`}
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/platform"
                  className={`text-gray-600 hover:text-gray-900 px-3 py-2 flex items-center transition duration-150 ease-in-out ${pathname === '/platform' ? 'text-blue-600' : ''}`}
                >
                  Platform
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation"
                  className={`text-gray-600 hover:text-gray-900 px-3 py-2 flex items-center transition duration-150 ease-in-out ${pathname.startsWith('/documentation') ? 'text-blue-600' : ''}`}
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className={`text-gray-600 hover:text-gray-900 px-3 py-2 flex items-center transition duration-150 ease-in-out ${pathname === '/pricing' ? 'text-blue-600' : ''}`}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`text-gray-600 hover:text-gray-900 px-3 py-2 flex items-center transition duration-150 ease-in-out ${pathname === '/about' ? 'text-blue-600' : ''}`}
                >
                  About
                </Link>
              </li>
            </ul>

            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/signin"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/signup" className="btn-sm text-white bg-blue-600 hover:bg-blue-700 ml-3">
                  <span>Sign up</span>
                  <svg className="w-3 h-3 fill-current text-white shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile menu */}
          <div className="flex md:hidden">
            {/* Hamburger button */}
            <button
              className={`hamburger ${mobileNavOpen ? 'active' : ''}`}
              aria-controls="mobile-nav"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg className="w-6 h-6 fill-current text-gray-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect y="4" width="24" height="2" />
                <rect y="11" width="24" height="2" />
                <rect y="18" width="24" height="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <MobileMenu open={mobileNavOpen} setOpen={setMobileNavOpen} />
    </header>
  )
}
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MobileMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function MobileMenu({ open, setOpen }: MobileMenuProps) {
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  // Close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!menuRef.current || menuRef.current.contains(target as Node)) return
      setOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  }, [setOpen])

  // Close the mobile menu if the route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname, setOpen])

  // Handle keyboard events
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!open || keyCode !== 27) return
      setOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [open, setOpen])

  return (
    <div
      ref={menuRef}
      className={`fixed top-0 z-20 left-0 w-full h-screen bg-white overflow-auto transition-all duration-300 ease-in-out ${
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="py-8 px-5 sm:px-6">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="block" aria-label="IdeaCode" onClick={() => setOpen(false)}>
            {/* Logo will go here */}
            <div className="text-xl font-bold text-blue-600">IdeaCode</div>
          </Link>
          <button
            className="text-gray-500 hover:text-gray-900"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.707 5.293L12 12l6.707 6.707-1.414 1.414L10.586 12l6.707-6.707z" />
              <path d="M5.293 5.293L12 12l-6.707 6.707 1.414 1.414L13.414 12 6.707 5.293z" />
            </svg>
          </button>
        </div>
        <nav className="py-5">
          <ul className="mb-8">
            <li className="py-2 border-b border-gray-200">
              <Link
                href="/solutions"
                className={`flex text-gray-600 hover:text-gray-900 py-2 ${
                  pathname === '/solutions' ? 'text-blue-600' : ''
                }`}
                onClick={() => setOpen(false)}
              >
                Solutions
              </Link>
            </li>
            <li className="py-2 border-b border-gray-200">
              <Link
                href="/platform"
                className={`flex text-gray-600 hover:text-gray-900 py-2 ${
                  pathname === '/platform' ? 'text-blue-600' : ''
                }`}
                onClick={() => setOpen(false)}
              >
                Platform
              </Link>
            </li>
            <li className="py-2 border-b border-gray-200">
              <Link
                href="/documentation"
                className={`flex text-gray-600 hover:text-gray-900 py-2 ${
                  pathname?.startsWith('/documentation') ? 'text-blue-600' : ''
                }`}
                onClick={() => setOpen(false)}
              >
                Documentation
              </Link>
            </li>
            <li className="py-2 border-b border-gray-200">
              <Link
                href="/pricing"
                className={`flex text-gray-600 hover:text-gray-900 py-2 ${
                  pathname === '/pricing' ? 'text-blue-600' : ''
                }`}
                onClick={() => setOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li className="py-2 border-b border-gray-200">
              <Link
                href="/about"
                className={`flex text-gray-600 hover:text-gray-900 py-2 ${
                  pathname === '/about' ? 'text-blue-600' : ''
                }`}
                onClick={() => setOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>
          <div className="flex flex-col space-y-3">
            <Link
              href="/signin"
              className="btn text-gray-600 bg-gray-100 hover:bg-gray-200 w-full"
              onClick={() => setOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
              onClick={() => setOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
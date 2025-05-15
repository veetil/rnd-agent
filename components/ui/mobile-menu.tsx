"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Transition } from "@headlessui/react";

interface MobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function MobileMenu({ open, setOpen }: MobileMenuProps) {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);

  // Close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !open ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [open, setOpen]);

  // Close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!open || keyCode !== 27) return;
      setOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [open, setOpen]);

  // Handle mobile menu visibility
  useEffect(() => {
    setNavbarOpen(open);
  }, [open]);

  return (
    <div ref={mobileNav}>
      <Transition
        show={navbarOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed top-0 left-0 right-0 z-20 h-screen pt-16 pb-4 overflow-y-auto bg-white"
      >
        <div className="px-5 py-2">
          <nav className="flex flex-col h-full">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/solutions"
                  className="flex py-2 text-gray-600 hover:text-gray-900 font-medium"
                  onClick={() => setOpen(false)}
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="flex py-2 text-gray-600 hover:text-gray-900 font-medium"
                  onClick={() => setOpen(false)}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="flex py-2 text-gray-600 hover:text-gray-900 font-medium"
                  onClick={() => setOpen(false)}
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="flex py-2 text-gray-600 hover:text-gray-900 font-medium"
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/signin"
                    className="flex py-2 text-gray-600 hover:text-gray-900 font-medium"
                    onClick={() => setOpen(false)}
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="btn-sm text-white bg-primary-600 hover:bg-primary-700 w-full text-center"
                    onClick={() => setOpen(false)}
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </Transition>
    </div>
  );
}
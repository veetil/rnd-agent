import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="IdeaCode">
      <div className="flex items-center">
        <svg
          className="w-8 h-8 mr-2"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="0%"
              y1="32.443%"
              x2="104.18%"
              y2="50%"
              id="logo-a"
            >
              <stop stopColor="#0369A1" offset="0%" />
              <stop stopColor="#0EA5E9" offset="100%" />
            </linearGradient>
            <linearGradient
              x1="18.74%"
              y1="17.384%"
              x2="96.787%"
              y2="88.669%"
              id="logo-b"
            >
              <stop stopColor="#7C3AED" offset="0%" />
              <stop stopColor="#6D28D9" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <path
              d="M22 19.22c6.627 0 9.593-6.415 9.593-13.042C31.593-.45 28.627.007 22 .007S10 2.683 10 9.31c0 6.628 5.373 9.91 12 9.91z"
              fill="url(#logo-a)"
              transform="rotate(45 21 10)"
            />
            <path
              d="M13.22 24.274c0 6.627-6.415 9.593-13.042 9.593-6.628 0-6.17-2.966-6.17-9.593 0-6.627 2.675-12 9.303-12 6.627 0 9.91 5.373 9.91 12z"
              fill="url(#logo-b)"
              transform="rotate(45 3.5 21.5)"
            />
          </g>
        </svg>
        <span className="text-xl font-bold text-gray-900">IdeaCode</span>
      </div>
    </Link>
  );
}
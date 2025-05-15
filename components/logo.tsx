import Link from 'next/link'

export default function Logo() {
  return (
    <div className="flex items-center">
      <svg className="w-8 h-8 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="6" fill="url(#logo-gradient)" />
        <path
          d="M16 8l-8 8 8 8 8-8-8-8z"
          fill="white"
          fillOpacity="0.9"
        />
        <path
          d="M16 12l-4 4 4 4 4-4-4-4z"
          fill="url(#logo-gradient)"
        />
      </svg>
      <div className="font-bold text-xl text-gray-900">IdeaCode</div>
    </div>
  )
}
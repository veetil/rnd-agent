import React from 'react'
import Link from 'next/link'

interface CTAButton {
  text: string
  href: string
}

interface CTASectionProps {
  title: string
  description: string
  primaryCTA: CTAButton
  secondaryCTA?: CTAButton
  background?: 'white' | 'gray' | 'blue' | 'gradient'
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  background = 'white'
}) => {
  // Determine background styles based on the background prop
  const getBgClasses = () => {
    switch (background) {
      case 'white':
        return 'bg-white'
      case 'gray':
        return 'bg-gray-50'
      case 'blue':
        return 'bg-blue-600 text-white'
      case 'gradient':
        return 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
      default:
        return 'bg-white'
    }
  }

  // Determine button styles based on the background
  const getPrimaryButtonClasses = () => {
    if (background === 'blue' || background === 'gradient') {
      return 'bg-white text-blue-600 hover:bg-blue-50'
    }
    return 'bg-blue-600 text-white hover:bg-blue-700'
  }

  const getSecondaryButtonClasses = () => {
    if (background === 'blue' || background === 'gradient') {
      return 'border border-white text-white hover:bg-white/10'
    }
    return 'border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
  }

  return (
    <section className={`py-16 md:py-24 ${getBgClasses()}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className={`text-xl ${background === 'blue' || background === 'gradient' ? 'text-blue-100' : 'text-gray-600'} max-w-3xl mx-auto mb-8`}>
          {description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href={primaryCTA.href}
            className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${getPrimaryButtonClasses()} md:py-4 md:text-lg md:px-8`}
          >
            {primaryCTA.text}
          </Link>
          {secondaryCTA && (
            <Link 
              href={secondaryCTA.href}
              className={`inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md ${getSecondaryButtonClasses()} md:py-4 md:text-lg md:px-8`}
            >
              {secondaryCTA.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default CTASection
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface CTAButton {
  text: string
  href: string
}

interface HeroProps {
  title: string
  description: string
  primaryCTA: CTAButton
  secondaryCTA?: CTAButton
  image?: string
  align?: 'left' | 'center' | 'right'
  backgroundImage?: string
  backgroundOverlay?: boolean
}

export default function Hero({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  image,
  align = 'left',
  backgroundImage,
  backgroundOverlay = false,
}: HeroProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }

  const containerClasses = `max-w-3xl ${alignmentClasses[align]}`

  return (
    <section className="relative">
      {/* Background image or color */}
      {backgroundImage ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          {backgroundOverlay && <div className="absolute inset-0 bg-black opacity-50" />}
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      )}

      {/* Hero content */}
      <div className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col md:flex-row items-center">
            {/* Text content */}
            <div className={containerClasses}>
              <h1 className="h1 mb-6">{title}</h1>
              <p className="text-xl text-gray-600 mb-8">{description}</p>
              <div className={`flex flex-wrap gap-4 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}>
                <Link href={primaryCTA.href} className="btn text-white bg-blue-600 hover:bg-blue-700">
                  {primaryCTA.text}
                </Link>
                {secondaryCTA && (
                  <Link href={secondaryCTA.href} className="btn text-gray-600 bg-white hover:bg-gray-100 border border-gray-300">
                    {secondaryCTA.text}
                  </Link>
                )}
              </div>
            </div>

            {/* Hero image */}
            {image && (
              <div className="mt-12 md:mt-0 md:ml-12">
                <Image
                  src={image}
                  alt="Hero"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
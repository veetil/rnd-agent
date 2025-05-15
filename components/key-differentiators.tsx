'use client'

import { motion } from 'framer-motion'

interface DifferentiatorItem {
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
}

interface KeyDifferentiatorsProps {
  title: string
  subtitle: string
  items: DifferentiatorItem[]
}

export default function KeyDifferentiators({
  title,
  subtitle,
  items
}: KeyDifferentiatorsProps) {
  return (
    <section className="relative bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h2 
              className="h2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
            {items.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="h4 mb-2">{item.title}</h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mt-4">
                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
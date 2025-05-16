import TeaserLanding from '@/components/landing/TeaserLanding'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'R&D Agent Store - Transform Research into Code',
  description: 'The R&D Agent Store automates the journey from research insights to production-ready code, helping product teams accelerate innovation.',
  keywords: [
    'R&D', 'research and development', 'AI agents', 'code generation',
    'research automation', 'innovation', 'product development',
    'machine learning', 'artificial intelligence'
  ],
  authors: [{ name: 'IdeaCode', url: 'https://ideacode.ai' }],
  creator: 'IdeaCode',
  publisher: 'IdeaCode',
  alternates: {
    canonical: 'https://ideacode.ai',
  },
  openGraph: {
    title: 'R&D Agent Store - Transform Research into Code',
    description: 'The R&D Agent Store automates the journey from research insights to production-ready code, helping product teams accelerate innovation.',
    url: 'https://ideacode.ai',
    siteName: 'IdeaCode AI',
    images: [
      {
        url: 'https://ideacode.ai/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'R&D Agent Store - Transform Research into Code'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'R&D Agent Store - Transform Research into Code',
    description: 'The R&D Agent Store automates the journey from research insights to production-ready code, helping product teams accelerate innovation.',
    creator: '@ideacode_ai',
    images: ['https://ideacode.ai/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
}

export default function RndAgentStorePage() {
  return <TeaserLanding />
}
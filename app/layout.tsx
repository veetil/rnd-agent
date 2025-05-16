import "./css/style.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "IdeaCode AI - Transform Research into Code",
  description: "IdeaCode AI automates the journey from research insights to production-ready code, helping product teams accelerate innovation.",
  keywords: [
    'AI', 'research and development', 'AI agents', 'code generation',
    'research automation', 'innovation', 'product development',
    'machine learning', 'artificial intelligence'
  ],
  authors: [{ name: 'IdeaCode', url: 'https://ideacode.ai' }],
  creator: 'IdeaCode',
  publisher: 'IdeaCode',
  openGraph: {
    title: 'IdeaCode AI - Transform Research into Code',
    description: 'IdeaCode AI automates the journey from research insights to production-ready code, helping product teams accelerate innovation.',
    url: 'https://ideacode.ai',
    siteName: 'IdeaCode AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IdeaCode AI - Transform Research into Code',
    description: 'IdeaCode AI automates the journey from research insights to production-ready code, helping product teams accelerate innovation.',
    creator: '@ideacode_ai',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}

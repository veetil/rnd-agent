/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure rnd-agent-store as the main page
  async redirects() {
    return [
      {
        source: '/',
        destination: '/rnd-agent-store',
        permanent: true,
      },
    ];
  },
  // Add image domains if you're using external images
  images: {
    domains: ['ideacode.ai'],
  },
};

module.exports = nextConfig;

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Add external image domains if your covers aren’t local
  images: {
    remotePatterns: [
      // Example domains — remove or change to your needs
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
    ],
  },
  // You can leave experimental empty unless you’re opting into specific features
  experimental: {
    // reactCompiler: true, // optional if you want to try React Compiler on Next 15
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['beravirtual.com', 'nextui-docs-v2.vercel.app']
  },

  webpack: (config) => {
       config.resolve.alias.canvas = false;
       return config;
     },
}

module.exports = nextConfig

const million = require("million/compiler");
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['beravirtual.com', 'nextui-docs-v2.vercel.app']
  },

  webpack: (config) => {
       config.resolve.alias.canvas = false;
       return config;
     },
};
 
const millionConfig = {
  auto: true,// if you're using RSC: auto: { rsc: true },
};
 
module.exports = million.next(
  nextConfig, { auto: { rsc: true } }
);
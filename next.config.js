/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   swcMinify:false,

  rules: {
    "@next/next/no-sync-scripts": "off",
  },
  images: {
    domains: ['sanitation-reporter-images.s3.eu-west-2.amazonaws.com','esicapps-images.s3.eu-west-2.amazonaws.com'],
  },
 // ignoreBuildErrors: true,
};

module.exports = nextConfig;

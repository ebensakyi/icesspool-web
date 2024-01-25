/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   swcMinify:false,

  // rules: {
  //   "@next/next/no-sync-scripts": "off",
  // },
  images: {
    domains: ['icesspool-files.s3.amazonaws.com','esicapps-exports.s3.eu-west-2.amazonaws.com',],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
   // ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

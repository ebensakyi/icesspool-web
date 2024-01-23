/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   swcMinify:false,

  rules: {
    "@next/next/no-sync-scripts": "off",
  },
  images: {
    domains: ['icesspool-files.s3.amazonaws.com','esicapps-exports.s3.eu-west-2.amazonaws.com',],
  },
 // ignoreBuildErrors: true,
};

module.exports = nextConfig;

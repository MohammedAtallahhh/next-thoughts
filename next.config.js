/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: [
      "lh3.googleusercontent.com",
      "cdn.sanity.io",
      "scontent.fcai20-3.fna.fbcdn.net",
    ],
  },
};

module.exports = nextConfig;

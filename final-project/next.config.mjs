/** @type {import('next').NextConfig} */
const nextConfig = {
  // devIndicators: {
  //   buildActivity: false,
  // },
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "imagedelivery.net",
      },
      {
        hostname: "i.imgur.com",
      },
    ],
  },
};

export default nextConfig;

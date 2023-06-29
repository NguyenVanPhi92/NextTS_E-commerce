/** @type {import('next').NextConfig} */
const withImages = require("next-images")

module.exports = withImages({
  reactStrictMode: false,
  images: {
    disableStaticImages: true,
    domains: [
      process.env.NEXT_PUBLIC_NEWS_IMAGE_URL,
      process.env.NEXT_PUBLIC_IMAGE_URL,
      "cf.shopee.vn",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
})

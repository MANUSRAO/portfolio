/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgbox.io',
        port: '',
        pathname: '/*/*',
      },
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
        port:'',
        pathname: '/*'
      },
    ],
  },
  reactStrictMode: true,
}
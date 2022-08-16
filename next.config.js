/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    //include url for image profile at 1st, to avoid 1st error that make it cannot start at all
    domains: [
      'lh3.googleusercontent.com',
      'cdn.pixabay.com',
      'p16-amd-va.tiktokcdn.com',
      'image.shutterstock.com',
      'www.shutterstock.com',
      'yt3.ggpht.com'
    ],
  },
};

module.exports = nextConfig;

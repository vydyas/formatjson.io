/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      PRERENDER_TOKEN: process.env.PRERENDER_TOKEN,
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Prerender-Token',
              value: process.env.PRERENDER_TOKEN || '',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
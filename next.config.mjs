/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'unpkg.com',
              port: '',
              pathname: '/**',
              
            },
            {
                protocol: 'https',
                hostname: 'openstreetmap.org',
                port: '',
                pathname: '/**',
                
              },
          ],
    },
};

export default nextConfig;

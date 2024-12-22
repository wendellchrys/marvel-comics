import "dotenv/config";

const nextConfig = {
  env: {
    MARVEL_PUBLIC_KEY: process.env.MARVEL_PUBLIC_KEY,
    MARVEL_PRIVATE_KEY: process.env.MARVEL_PRIVATE_KEY,
    MARVEL_API_BASE_URL: process.env.MARVEL_API_BASE_URL,
  },
  images: {
    domains: ['i.annihil.us'],
  },
};

export default nextConfig;

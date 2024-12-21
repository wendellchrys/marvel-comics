import "dotenv/config";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MARVEL_PUBLIC_KEY: process.env.MARVEL_PUBLIC_KEY,
    MARVEL_PRIVATE_KEY: process.env.MARVEL_PRIVATE_KEY,
    MARVEL_API_BASE_URL: process.env.MARVEL_API_BASE_URL,
  },
};

export default nextConfig;

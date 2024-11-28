import type { NextConfig } from "next";
import analyze from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
};

//export default nextConfig;
const withBundleAnalyzer = analyze({
  enabled: process.env.ANALYZE === "true",
});
export default withBundleAnalyzer(nextConfig);

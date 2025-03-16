import type { NextConfig } from "next";
import analyze from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    authInterrupts: true,
    ppr: "incremental",
    reactCompiler: {
      compilationMode: "infer",
    },
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

//export default nextConfig;
const withBundleAnalyzer = analyze({
  enabled: process.env.ANALYZE === "true",
});
export default withBundleAnalyzer(nextConfig);

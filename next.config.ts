import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
      rules: {
          '*.glsl': {
              loaders: ['raw-loader'],
              as: '*.js',
          },
      },
  },
  output: 'export',
};

export default nextConfig;

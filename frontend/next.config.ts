import path from "path";

const nextConfig = {
  webpack: (config: { module: { rules: { test: RegExp; include: string[]; use: { loader: string; options: { presets: string[]; }; }[]; }[]; }; }) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [
        path.resolve(__dirname, "../backend/src/shared"),
        path.resolve(__dirname, "src")
      ],
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["next/babel"]
          }
        }
      ]
    });
    return config;
  }
};

export default nextConfig;

import type { NextConfig } from "next";

const config: NextConfig = {
  // Previews are served at *.lazyfrog.app, and the platform's renderer (screenshots, project_scan)
  // opens the app on its sandbox address; the dev server only answers its own hostnames otherwise.
  allowedDevOrigins: ["*.lazyfrog.app", "10.200.*.*"],
  // The preview is what the owner shows people; Next's dev badge isn't part of their site.
  devIndicators: false,
  experimental: {
    // No Turbopack cache on disk for `next dev`. Saving it held the dev server's work in memory
    // twice for a few seconds: about 200 MB more at once after the first pages compiled, enough
    // to stop a type check beside it, and after a dozen new pages it took a 1 GB preview down by
    // itself. Without it the dev server holds only the pages it has compiled, and compiles them
    // again after a restart.
    turbopackFileSystemCacheForDev: false,
  },
};

export default config;

"use strict";

// next.config.js
var nextConfig = {
  images: {
    domains: [
      "googleusercontent.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "cdn.openai.com"
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};
module.exports = nextConfig;

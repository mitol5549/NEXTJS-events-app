const webpack = require('webpack');
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'query',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
    );
    return config;
  },
};

const webpack = require('webpack');

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_SIGNUP_URL: '/api/auth/signup',
  },
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

const webpack = require('webpack');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    constants: require.resolve('constants-browserify'),
    zlib: require.resolve("browserify-zlib"),
    url: require.resolve("url/"),
    "http": require.resolve("stream-http"),
    'process/browser': require.resolve('process/browser'),
    "https": false
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }), 
  ]);
  return config;
};
const { override, useBabelRc, addWebpackAlias } = require('customize-cra');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const NodeSchemePlugin = require('./NodeSchemePlugin');

module.exports = override(
    useBabelRc(),
    addWebpackAlias({
        path: require.resolve('path-browserify'),
    }),
    (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            assert: require.resolve('assert/'),
            os: require.resolve('os-browserify/browser'),
            url: require.resolve('url/'),
            buffer: require.resolve('buffer/'),
            stream: require.resolve('stream-browserify'),
            constants: require.resolve('constants-browserify'),
            zlib: require.resolve('browserify-zlib'),
            child_process: false,
            http: require.resolve('stream-http'),
            querystring: require.resolve('querystring-es3'),
        };
        config.plugins = (config.plugins || []).concat([new NodePolyfillPlugin(), new NodeSchemePlugin()]);
        return config;
    },
);

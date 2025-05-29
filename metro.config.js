const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

// Default Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// Custom Metro configuration
const customConfig = {
  resolver: {
    // Ensure Metro resolves WebSocket-related modules
    extraNodeModules: {
      ...require('node-libs-react-native'),
      ws: require.resolve('react-native-websocket'),
    },
  },
  transformer: {
    // Optional: Enable inline requires for better performance
    inlineRequires: true,
  },
};

// Merge the default and custom configuration
const mergedConfig = mergeConfig(defaultConfig, customConfig);

// Wrap with Reanimated Metro configuration
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);

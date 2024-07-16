const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
async function getConfig() {
  const defaultConfig = await getDefaultConfig(__dirname);

  const {transformer, resolver} = defaultConfig;

  defaultConfig.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  defaultConfig.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  };

  return defaultConfig;
}

module.exports = (async () => {
  const config = await getConfig();
  return mergeConfig(config, {});
})();

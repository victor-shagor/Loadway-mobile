const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.alias = {
  '@src': './src',
};

module.exports = defaultConfig;

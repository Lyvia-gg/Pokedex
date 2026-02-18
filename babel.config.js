// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
//   };
// };
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      // [
      //   'module:react-native-dotenv',
      //   {
      //     moduleName: '@env',
      //     path: '.env',
      //     safe: false,
      //     allowUndefined: true,
      //   },
      // ],
      'react-native-reanimated/plugin',
    ],
  };
};

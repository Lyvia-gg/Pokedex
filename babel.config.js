// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
//   };
// };
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      // '@babel/preset-typescript',
      // 'module:metro-react-native-babel-preset',
    ],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};

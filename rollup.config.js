import buble from 'rollup-plugin-buble';
let packageJson = require('./package.json');
let {'jsnext:main': jsnext, main} = packageJson;

export default {
  moduleName: 'object-browser',
  entry: 'src/object-browser.js',
  targets: [{
    format: 'umd',
    dest: main
  }, {
    format: 'es',
    dest: jsnext
  }],
  globals: {
    lodash: '_'
  },
  external: ['lodash'],
  plugins: [
    buble()
  ]
};

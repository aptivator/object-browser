import babel                            from '@rollup/plugin-babel';
let {'jsnext:main': jsnext, main, name} = require('./package.json');

export default {
  input: 'src/object-browser.js',
  output: [{
    format: 'umd',
    file: main,
    name,
    globals: {
      lodash: '_'
    }
  }, {
    format: 'es',
    file: jsnext,
    name,
    globals: {
      lodash: '_'
    }
  }],
  external: ['lodash'],  
  plugins: [
    babel({
      babelHelpers: 'bundled'
    })
  ]
};

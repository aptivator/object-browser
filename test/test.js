let browser = require('../dist/object-browser');

let o = {
  names: [{
    first: 'Dmitriy'
  }, {
    first: 'Igor'
  }]  
};

console.log(browser(o, 'names.first', {exists: true, combined: true, flatten: true}));

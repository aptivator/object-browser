# object-browser

### Introduction

Object browser is a tool to access and retrieve intra-object values.  It can 
work exactly like `lodash`'s `_.get` method and was designed to mimic mongodb's 
ability to access documents nested in an array.  The software was built to work 
with `mongo-query-compiler` utility.

### Examples

```javascript
/* example.js */

import browser from 'object-browser';

let item = { 
  info: {
    type: 'book',
    description: {
      short: 'Some book'
    }
  },
  store: [{ 
    number: '222', 
    qty: 51,
    region: 'NE',
    employees: [{
      name: {
        first: 'John',
        last: 'Doe'
      },
      age: 22
    }, {
      name: {
        first: 'Jack',
        last: 'Smith'
      },
      age: 27
    }]
  }, { 
    number: '212', 
    qty: 11,
    employees: [{
      name: {
        first: 'Kate',
        last: 'Jones'
      }
    }]
  }] 
};
```

**Regular object access and retrieval**

```javascript
let value = browser(item, 'info.type');
//value = 'book'

value = browser(item, 'info.description.full');
//value = undefined

value = browser(item, 'store');
//value = [...array of stores...]
```

**Nested object access and retrieval**

```javascript
let value = browser(item, 'store.number');
//value = ['222', '212']

value = browser(item, 'store.region');
//value = ['NE'] /* only existing values are included */
```


# object-browser

### Introduction

Object browser is a tool to access and retrieve intra-object values.  It can 
work exactly like `lodash`'s `_.get` method and was designed to mimic mongodb's 
ability to access documents nested in an array.  The software was built to work 
with [mongo-query-compiler](https://github.com/aptivator/mongo-query-compiler) 
utility.

### Examples

```javascript
/* sample object to be browsed */

import {browser} from 'object-browser';

let o = { 
  item: {
    type: 'book',
    description: {
      short: 'Some book'
    }
  },
  tags: ['book', 'technical'],
  reviews: undefined,
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

#### Standard object value access

```javascript
let shortDescription = browser(o, 'item.description.short');
//shortDescription = 'Some book'
```

#### Standard array value access

```javascript
let tag = browser(o, 'tags.1')
//tag = 'technical'
```

#### Combined object and array value access

```javascript
let firstName = browser(o, 'store.0.employees.0.name.first');
//firstName = 'John'
```

Additionally, access path may be specified as an array of path parts, rather
than a dot-notated string.

```javascript
let firstName = browser(o, ['store', '0', 'employees', '0', 'name', 'first']);
//firstName = 'John'
```

#### Access of values of objects nested in an array

```javascript
let storeNumbers = browser(o, 'store.number');
//storeNumbers = ['222', '212']
```

#### Access of values of objects nested across multiple arrays

```javascript
let employeeNames = browser(o, 'store.employees.name');
//employeeNames = []
```

`store` and its nested `employees` are both arrays and sometimes it may be 
meaningful to return an array of arrays (e.g., employee records for all stores).
This is why `object-browser`'s default behavior is to return an empty array when 
access is "requested" across several nested arrays.  To allow access across 
multiple nested arrays, the `flatten` configuration flag should be set.

```javascript
let employeeFirstNames = browser(o, 'store.employee.name.first', {flatten: true});
//employeeFirstNames = ['John', 'Jack', 'Kate']
```

#### Access of a browsed object itself

`object-browser` is a dependency for `mongo-query-compiler`.  Sometimes the 
latter has to handle a use-case where an array of primitives is queried against 
a certain criteria.  In that case, `mongo-query-compiler` has to run assessments 
on the "object" itself.  To access the object itself, a path value of `__self`
can be used.

```javascript
let __self = browser(o, '__self');
//__self = o
```

#### Setting meta-data requests

A developer may instruct `object-browser` to indicate whether an accessed value
exists and whether it has been combined into an array by pulling values of 
array-nested documents together.

```javascript
let query = browser(o, 'info.description.full', {combined: true, exists: true});
//query = {value: undefined, combined: false, exists: false}
```

**Note:** existence of an object value is confirmed if an object has property
that is being accessed.  The value itself may be undefined.

```javascript
let query = browser(o, 'reviews', {exists: true});
//query = {value: undefined, exists: true}
```

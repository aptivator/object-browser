let {expect} = require('chai');
let browser = require('../dist/object-browser');
let o = require('./data/object.js');

describe('object-browser', () => {
  it('returns object self if path is __self', () => {
    let __self = browser(o, '__self');
    expect(__self).to.eql(o);
  });
  
  it('accesses value using regular dot notation', () => {
    let shortDescription = browser(o, 'item.description.short');
    expect(shortDescription).to.equal('Some book');
  });
  
  it(`retrieves inner array's indexed value using dot notation`, () => {
    let tag = browser(o, 'tags.1');
    expect(tag).to.equal('technical');
  });
  
  it('fetches values of array-nested documents using dot notation', () => {
    let storeNumbers = browser(o, 'store.number');
    expect(storeNumbers).to.eql(['222', '212']);
  });
  
  it('will return [] when accessing document values across multiple nested arrays', () => {
    let employeeNames = browser(o, 'store.employees.name');
    expect(employeeNames).to.eql([]);
  });
  
  it('has a flatten flag to access document values across multiple nested arrays', () => {
    let employeeFirstNames = browser(o, 'store.employees.name.first', {flatten: true});
    expect(employeeFirstNames).to.eql(['John', 'Jack', 'Kate']);
  });
  
  it('provides meta information if returned values were combined from multiple docs', () => {
    let result = browser(o, 'store.employees.name.first', {flatten: true, combined: true});
    expect(result).to.eql({value: ['John', 'Jack', 'Kate'], combined: true});
  });
  
  it('checks for existence of value by looking at object keys', () => {
    let result = browser(o, 'reviews', {exists: true});
    expect(result).to.eql({value: undefined, exists: true});
  });
  
  it('allows regular value access across nested arrays using dot notation', () => {
    let firstName = browser(o, 'store.0.employees.0.name.first');
    expect(firstName).to.equal('John');
  });
  
  it('allows value access using an array of parts as a path', () => {
    let firstName = browser(o, ['store', '0', 'employees', '0', 'name', 'first']);
    expect(firstName).to.equal('John');
  });
});

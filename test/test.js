let {expect} = require('chai');
let browser = require('../dist/object-browser');
let o = require('./fixtures/object.js');

describe('object-browser', () => {
  it('returns object self if path is __self', () => {
    let value = browser(o, '__self');
    expect(value).to.eql(o);
  });
  
  it('accesses value using regular dot notation', () => {
    let value = browser(o, 'item.description.short');
    expect(value).to.equal('Some book');
  });
  
  it(`retrieves inner array's indexed value using dot notation`, () => {
    let value = browser(o, 'tags.1');
    expect(value).to.equal('technical');
  });
  
  it('fetches values of array-nested documents using dot notation', () => {
    let values = browser(o, 'store.number');
    expect(values).to.eql(['222', '212']);
  });
  
  it('will return [] when accessing document values across multiple nested arrays', () => {
    let values = browser(o, 'store.employees.name');
    expect(values).to.eql([]);
  });
  
  it('has a flatten flag to access document values across multiple nested arrays', () => {
    let values = browser(o, 'store.employees.name.first', {flatten: true});
    expect(values).to.eql(['John', 'Jack', 'Kate']);
  });
  
  it('provides meta information if returned values were combined from multiple docs', () => {
    let result = browser(o, 'store.employees.name.first', {flatten: true, combined: true});
    expect(result).to.eql({value: ['John', 'Jack', 'Kate'], combined: true});
  });
  
  it('checks for existence of value by looking at object keys', () => {
    let result = browser(o, 'item.description.full', {exists: true});
    expect(result).to.eql({value: undefined, exists: false});
  });
  
  it('allows regular value access across nested arrays using dot notation', () => {
    let value = browser(o, 'store.0.employees.0.name.first');
    expect(value).to.equal('John');
  });
});

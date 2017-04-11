import _ from 'lodash';

export default (value_, exists_, combined_, configs) => {
  let results = {};
  let {value = true, exists, combined} = configs;
  
  if(value) {
    results.value = value_;
  }
  
  if(exists) {
    results.exists = exists_;
  }
  
  if(combined) {
    results.combined = combined_;
  }
  
  let keys = _.keys(results);
  
  if(keys.length === 1) {
    return results[keys[0]];
  }
  
  return results;  
};

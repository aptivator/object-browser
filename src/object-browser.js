import _ from 'lodash';

export function browser(o, path, configs = {}) {
  let exists = false;
  let combined = false;
  
  if(path !== '__self') {
    let parts = _.isArray(path) ? path : path.split('.');
    let first = parts.shift();
    
    if(o.hasOwnProperty(first)) {
      exists = true;
    }
    
    if(_.isPlainObject(o)) {
      o = o[first];
    } else if(_.isArray(o)) {
      if(!_.isNaN(+first)) {
        o = o[first];
      } else {
        combined = true;
        
        o = _.reduce(o, (accum, o) => {
          if(o.hasOwnProperty(first)) {
            accum.push(o[first]);
            exists = true;
          }
          return accum;
        }, []);
        
        if(configs.flatten) {
          o = _.flatten(o);
        }
      }
    } else {
      o = undefined;
    }
    
    if(parts.length && o) {
      return browser(o, parts, configs);
    }
  } else {
    exists = true;
  }
  
  if(configs.hasOwnProperty('flatten')) {
    delete configs.flatten;
  }
  
  if(!_.keys(configs).length) {
    return o;
  }
  
  let results = {value: o};
  
  if(configs.hasOwnProperty('exists')) {
    Object.assign(results, {exists});
  }
  
  if(configs.hasOwnProperty('combined')) {
    Object.assign(results, {combined});
  }
  
  return results;
}

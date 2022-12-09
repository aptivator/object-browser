export function browser(o, path, configs = {}) {
  let exists = false;
  let combined = false;
  
  if(path !== '__self') {
    let parts = Array.isArray(path) ? path : path.split('.');
    let first = parts.shift();

    if(o?.hasOwnProperty(first)) {
      exists = true;
    }
    
    if(o?.constructor === Object) {
      o = o[first];
    } else if(Array.isArray(o)) {
      if(!isNaN(first)) {
        o = o[first];
      } else {
        combined = true;
        
        o = o.reduce((accum, o) => {
          if(o.hasOwnProperty(first)) {
            accum.push(o[first]);
            exists = true;
          }
          return accum;
        }, []);
        
        if(configs.flatten) {
          o = o.flat(Infinity);
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
  
  if(!Object.keys(configs).length) {
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

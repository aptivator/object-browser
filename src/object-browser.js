import _        from 'lodash';
import resulter from './lib/resulter';

function browser(o, path, configs = {}) {
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
  
  return resulter(o, exists, combined, configs);
}

export default {
  browser
};

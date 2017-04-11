import _        from 'lodash';
import resulter from './lib/resulter';

export default function browser(o, path, configs = {}) {
  let parts = _.isArray(path) ? path : path.split('.');
  let first = parts.shift();
  let exists = false;
  let combined = false;
  
  if(_.keys(o).includes(first)) {
    exists = true;
  }
  
  if(_.isPlainObject(o)) {
    o = o[first];
  } else if(_.isArray(o)) {
    if(!_.isNaN(+first)) {
      o = o[+first];
    } else {
      combined = true;
      
      if(configs.flatten) {
        o = _.flatten(o);
      }
      
      o = _.reduce(o, (accum, o) => {
        let keys = _.keys(o);
        if(keys.includes(first)) {
          accum.push(o[first]);
          exists = true;
        }
        return accum;
      }, []);
    }
  } else {
    o = undefined;
  }
  
  if(parts.length && o) {
    return browser(o, parts, configs);
  }

  return resulter(o, exists, combined, configs);
}

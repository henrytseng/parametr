'use strict';

/**
 * Module dependencies
 */

/**
 *
 * @param  {[type]} data A data Object
 * @return {Object}      A parameterized data Object
 */
function params(data) {
  let _permittedList = [];

  function parameterize(nextData) {
    let _data = Object.assign({}, nextData);

    /**
     * Throws an error when required parameter is not available
     *
     * @param  {String} name A parameter name
     * @return {Object}      A parameterized data Object
     */
    Object.defineProperty(_data, 'require', {
      enumerable: false,
      value: (name) => {
        _permittedList.push(name);
        if(!data.hasOwnProperty(name)) {
          throw new Error('A required parameter is missing');
        }
        return _data;
      }
    });

    /**
     * Allows a parameter
     *
     * @param  {String} name A parameter name
     * @return {Object}      A parameterized data Object
     */
    Object.defineProperty(_data, 'permit', {
      enumerable: false,
      value: (name) => {
        _permittedList.push(name);
        let permitteData = {};
        _permittedList.forEach((key) => { permitteData[key] = data[key]; });
        return parameterize(permitteData);
      }
    });

    return _data;
  }

  return parameterize(data);
}

module.exports = params;

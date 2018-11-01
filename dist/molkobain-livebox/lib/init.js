var Promise = require('bluebird');
var utils = require('./livebox/utils.js');

module.exports = function() {
  utils.log.info('Init part.');

  return Promise.resolve(true);
};

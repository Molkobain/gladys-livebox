var Promise = require('bluebird');
var utils = require('./livebox/utils.js');

module.exports = function() {
  utils.log.info('Installing...');

  // TODO
  // - Try to discover decoders and router on the network
  // - Add discovered devices
  // - Add corresponding params with IPs

  return Promise.resolve(true);
};

module.exports = function(sails) {
  var install = require('./lib/install.js');
  var setup = require('./lib/setup.js');
  var init = require('./lib/init.js');
  //var exec = require('./lib/exec.js');

  return {
    install,
    setup,
    init,
    //exec,
  };
};

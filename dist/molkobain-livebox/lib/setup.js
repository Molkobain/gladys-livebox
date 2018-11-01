var Promise = require('bluebird');
var utils = require('./livebox/utils.js');

module.exports = function() {
  utils.log.info('Setup');

  // Init default parameters if not existing
  utils.log.info('|- Default parameters');
  utils.getDefaultParams().forEach(function(defaultParam){
    var deviceFamily = utils.getDeviceFamilyFromParamName(defaultParam.name);
    var deviceService = utils.getDeviceServiceFromParamName(defaultParam.name);
    var deviceIdentifier = utils.getDeviceIdentifierFromParamName(defaultParam.name);

    utils.log.info(`|  |- ${defaultParam.name}:`)
    return gladys.param.getValue(defaultParam.name)
      // Param exists, check if device needs to be created
      .then(function(param){
        utils.log.info(`|  |  |- Already existing`);
        return Promise.resolve(param);
      })
      // Param doesn't exists, create it and check if device needs to be created
      .catch(function(error){
        return gladys.param.setValue(defaultParam)
          .then(function(param){
            utils.log.info(`|  |  |- Created`);
            return Promise.resolve(param);
          })
          .catch(function(error){
            utils.log.info(`|  |  |- Failed to create! (Cause: ${error})`);
            return Promise.reject(error);
          });
      })

      // Map to device
      .then(function(param){
        // Create device if not existing
        return gladys.device.getByIdentifier({
            identifier: deviceIdentifier,
            service: deviceService,
          })
          .then((device) => utils.log.info(`|  |  |- Already mapped to existing device "${device.name}"`))
          .catch(function(error) {
            var deviceTemplate = utils.getDeviceTemplate(deviceFamily);
            deviceTemplate.device.identifier = deviceIdentifier;

            return gladys.device.create(deviceTemplate)
              .then((newDevice) => utils.log.info(`|  |  |- Mapped to new device "${newDevice.device.name}"`))
              .catch((error) => utils.log.info(`|  |  |- Could not be mapped to device! (Cause: ${error})`));
          });
      })
      .then(() => utils.log.info(`|  |  |- Done.`))
      .catch((error) => utils.log.info(`|  |  |- Error! (${error})`));
  });

  return Promise.resolve(true);
};

var moduleCode = 'molkobain-livebox';

module.exports = {
  getDefaultParams: function() {
    return [
      {
        name: 'livebox-decoder-ip',
        value: '192.168.x.y',
      },
      // {
      //   name: 'livebox-router-ip',
      //   value: '192.168.x.z',
      // },
    ];
  },

  getDeviceTemplate: function(deviceFamily) {
    var template = null;
    switch (deviceFamily) {
      case 'decoder':
        template = {
          device: {
            name: 'Livebox decoder',
            protocol: 'wifi',
            service: 'livebox-decoder',
            identifier: '',
          },
          types: [],
        };
        break;

      case 'router':
        template = {
          device: {
            name: 'Livebox router',
            protocol: 'wifi',
            service: 'livebox-router',
            identifier: '',
          },
          types: [],
        };
        break;

      default:
        // TODO: Throw exception
        break;
    }

    return template;
  },

  getDeviceFamilyFromParamName: function(paramName = '') {
    var family = 'unknown';
    if (/^livebox-decoder-ip/.test(paramName)) {
      family = 'decoder';
    }
    else if (/^livebox-router-ip/.test(paramName)) {
      family = 'router';
    }

    return family;
  },

  getDeviceServiceFromParamName: function(paramName = '') {
    var family = 'unknown';
    if (/^livebox-decoder-ip/.test(paramName)) {
      family = 'livebox-decoder';
    }
    else if (/^livebox-router-ip/.test(paramName)) {
      family = 'livebox-router';
    }

    return family;
  },

  getDeviceIdentifierFromParamName: function(paramName) {
    return paramName.substr(0, paramName.lastIndexOf('-ip'));
  },

  isValidIP: function(ip, protocol = 'v4') {
    return /^(([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])(\.(?!$)|(?=$))){4}$/.test(ip || "");
  },

  log: {
    info: function(message) {
      sails.log.info(`${moduleCode}: ${message}`);
    },
    debug: function(message) {
      sails.log.debug(`${moduleCode}: ${message}`);
    },
    error: function(message) {
      sails.log.debug(`${moduleCode}: ${message}`);
    },
  },

  // getCurrentValues: function getCurrentValues(onkyo) {
  //   return new Promise(function (resolve, reject) {
  //     onkyo.getDeviceState()
  //       .then(function (deviceState) {
  //         var power = deviceState.PWR;
  //         var muted = deviceState.AMT;
  //         var volume = deviceState.MVL;
  //
  //         sails.log.debug(`Onkyo : Powered ${power}`);
  //         sails.log.debug(`Onkyo : Muted ${muted}`);
  //         sails.log.debug(`Onkyo : Volume ${volume}`);
  //
  //         return resolve({
  //           power: (power === true) ? 1 : 0,
  //           mute: (muted === true) ? 1 : 0,
  //           volume: volume
  //         });
  //       });
  //   });
  // },
  //
  // changeState: function changeState(deviceType, value) {
  //   return gladys.deviceState.create(newState)
  //     .then((state) => {
  //       sails.log.info(`Onkyo : state ${deviceType.identifier} created`);
  //       return state;
  //     })
  //     .catch(function (err) {
  //       sails.log.error(`Onkyo : Error, state ${deviceType.identifier} not created!`);
  //       return Promise.reject(err);
  //     });
  // }
};

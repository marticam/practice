var _ = require('lodash');
var shared_config = require('./shared.conf.js');

exports.config = _.extend(shared_config.config, {

  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    //'browserName': 'firefox'
    //'browserName': 'IE'
    //'browserName': 'safari'
    'browserName': 'chrome'
  }

});

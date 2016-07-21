var nconf = require('nconf');
var HtmlReporter = require('protractor-html-screenshot-reporter');
var path = require('path');

exports.config = {

    // Spec patterns are relative to the current working directly when
    // protractor is called.

    specs: ['specs/ScrumLoginSpec.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        isVerbose: true,
        keepAlive: true,
        //realtimeFailure: true,
        //includeStackTrace: true,
        showColors: true,
        defaultTimeoutInterval: 1000000
    },

    onPrepare: function () {
        nconf.use('memory').env().argv();
        if (browser.params.env == null) {
            nconf.set('NODE_ENV', 'developer');
        } else {
            nconf.set('NODE_ENV', browser.params.env);
        }
        nconf.file({
            file: 'environments/' + nconf.get('NODE_ENV') + '.json'
        });
        console.log('Loading environment: ' + nconf.get('NODE_ENV'));
        console.log(nconf.get('env:URL'));
        // If you need to interact with a non-Angular page, you may access the wrapped webdriver instance
        // directly with browser.driver. This is a an alias.
        global.dv = browser.driver;

        global.isAngularSite = function(flag){
            browser.ignoreSynchronization = !flag;
        };

        global.setWindowSize = function (size) {
            size = size || {
                width: 1600,
                height: 1000
            };

            // browser.driver.manage().window().setSize(size.width, size.height);
            browser.driver.manage().window().maximize();

            browser.manage().timeouts().pageLoadTimeout(10000);
            browser.manage().timeouts().implicitlyWait(5000);

        };

        // require('jasmine-reporters');
        // jasmine.getEnv().addReporter(new jasmine.TeamcityReporter());
        // default window size to this
        global.setWindowSize();

    }
};

'use strict';

/* jshint node: true */
module.exports = function (grunt) {
    var nconf = require('nconf');
    var today = new Date();
    var timeStamp = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear() + '-' + today.getHours() + 'h-' + today.getMinutes() + 'm';
    // Pick a file from environment folder
    nconf.use('memory').env().argv();
    if (nconf.get('NODE_ENV') == null) {
        nconf.set('NODE_ENV', 'developer');
    }
    nconf.file({
        file: 'environments/' + nconf.get('NODE_ENV') + '.json'
    });
    console.log('Loading environment: ' + nconf.get('NODE_ENV'));

    //create file timestamp
    var totalDateString =  nconf.get('NODE_ENV').toUpperCase()+ ' - ' + timeStamp;

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-protractor-webdriver');
    grunt.loadNpmTasks('grunt-mailgun');

    //Teamcity
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-env');

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        clean: {
            "temp": [".tmp"]
        },
        copy: {
            lib: {
                files: [
                    {expand: true, src: ['lib/**'], dest: '.tmp/'},
                ]
            }
        },

        //email testing

        mailgun: {
            screenshots: {
                options: {
                    key: 'key-15028793b4d927142ba582cf7945f7e4',
                    sender: 'no-reply@automationemreport.com',
                    body: 'Hello Guys, ' +
                    'This is a Test email',
                    recipient: ['mail@mail.com', 'mail@mail.com'],
                    subject: 'Test',
                    preventThreading: false
                },


                files: {
                    'screenshots': ['screenshots/'+totalDateString+'/firefox/*.html'],
                },
                src: ['screenshots/'+totalDateString+'/firefox/*.html']
            }
        },

        //Test settings
        protractor: {
            options: {
                configFile: 'protractor.conf.js', // Default config file
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            local: {
                args: {}
            },
            e2e: {

                options: {
                    args: {
                        params: {
                            env: nconf.get('NODE_ENV')
                        }
                    }
                }
            }
        },
        shell: {
            xvfb: {
                command: 'Xvfb :85 -ac -screen 0 1600x1200x24',
                options: {
                    async: true
                }
            }
        },
        env: {
            xvfb: {
                DISPLAY: ':85'
            }
        },
        protractor_webdriver: {
            options: {

            },
            e2e: {
                command: 'webdriver-manager start'
            }
        }
    });

    grunt.registerTask('e2e-test', [
        'protractor:e2e',
        // 'mailgun'
    ]);

    grunt.registerTask('e2e-xvfb', [
        'shell:xvfb',
        'env:xvfb',
        'protractor:e2e',
        //'mailgun',
        'shell:xvfb:kill'
    ]);

};

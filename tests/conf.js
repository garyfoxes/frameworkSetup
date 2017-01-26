var _ = require('lodash');
var env = require('node-env-file');
var SpecReporter = require('jasmine-spec-reporter');
var AllureReporter = require('jasmine-allure-reporter');


/**
 * Protractor Config File
 * Setup so you run multiple browsers in parallel through the command line(done through the getCapabilities option)
 * Sample command to run tests protractor conf.js --params.browsers="chrome,firefox"
 * Jasmine spec reporter is set up for prettier reporting in the command line.
 * @see https://github.com/angular/protractor/blob/master/docs/referenceConf.js
 *
 * @type {{onPrepare: exports.config.onPrepare, baseUrl: string, framework: string, seleniumAddress: string,
 * getMultiCapabilities: exports.config.getMultiCapabilities, specs: string[],
 * jasmineNodeOpts: {showColors: boolean,
 * defaultTimeoutInterval: number,
 * stackTrace: boolean, print:
 * exports.config.jasmineNodeOpts.print}}}
 */

/**
 Shard Tests
 In capabilities for a browser put the following
 'shardTestFiles:true, maxInstances:3'
 In command line specify specs like so
 --specs='tests/integration/web/specs/Voting-Spec.js','tests/integration/web/specs/AskQuestion-spec.js'
 Make sure specs in the conf.js is empty e.g specs:[]
 */

var capabilities = {
    chrome: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--start-maximized']
        }
    },
    chrome_mobile: {
        browserName: 'chrome',
        chromeOptions: {
            mobileEmulation: {
                deviceName: 'Apple iPhone 6 Plus'
            }
        }
    },
    firefox: {
        browserName: 'firefox'
    },

    internet_explorer: {
        browserName: 'internet explorer'
    },
    safari: {
        browserName: 'safari'
    },
    chrome_emulator: {
        browserName: 'chrome',
        platformName: 'Android',
        deviceName: 'emulator-5554',
        applicationName: 'emulator-5554'
    }
};

var setDBDetails = function (params) {
    params.dbDetails = {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    };
    params.apiDetails = {
        apiHost: process.env.API_HOST
    };

};

exports.config = {
    onPrepare: function () {
        if (browser.params.env === undefined) {
            env('dbQA.env');
        }
        else {
            env(browser.params.env);
        }
        require('protractor-http-mock').config = {
            rootDirectory: __dirname + '/', // default value: process.cwd()
            protractorConfig: 'conf.js' // default value: 'protractor-conf.js'
        };
        setDBDetails(browser.params);
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
        //jasmine.getEnv().addReporter(new AllureReporter({resultsDir: 'tests/integration/reports/allure-results'}));
        browser.getCapabilities().then(function (cap) {
            browser.browserName = cap.get('browserName');
            global.EC = protractor.ExpectedConditions;
        });
        /*  jasmine.getEnv().afterEach(function (done) {
         browser.takeScreenshot().then(function (png) {
         allure.createAttachment('Screenshot', function () {
         return new Buffer(png, 'base64');
         }, 'image/png')();
         done();
         });
         });*/
        var wd = require('wd'),
            wdBridge = require('wd-bridge')(protractor, wd);
        wdBridge.initFromProtractor(exports.config);
    },
    /*onComplete: function () {
     console.log('In On Complete');
     },
     onCleanUp:function () {
     console.log('In On Clean Up');
     },
     afterLaunch:function () {
     console.log('In After Launch');
     },*/
    mocks: {
        dir: 'mocks',
        default: []
    },

    //339b5f2f.ngrok.io
    seleniumAddress: 'http://127.0.0.1:4723/wd/hub',
    baseUrl: 'http://redcafe.net',
    framework: 'jasmine2',
    /*
     Using lodash to return array of objects multicapabilities
     Could also use this (Test first) _.toArray(_.pick(capabilities, browsers));
     pick returns an object not an array, hence why toValues().toValue() is used in current solution, returns an array
     */
    getMultiCapabilities: function () {
        var browsers = this.params.browsers.split(',');
        return _(capabilities)
            .pick(browsers)
            .values()
            .value();
    },
    allScriptsTimeout: 20000,
    getPageTimeout: 20000,

    specs: ['where/specs/are'],
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 250000,
        stackTrace: false,
        print: function () {
        }

    },
    params: {
        timestamps: [],
        answerIds: []

    }
};

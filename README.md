# Jasmine, RequireJS, and Karma (a.k.a Testacular)

This project is an attempt to show the changes to be incorporated on a Javascript project with Jasmine (Standalone) and RequireJS libraries,
in order to use Karma for developer productivity in testing.

The Javascript project using Jasmine (standalone) and RequireJS libs are used as base project.

Base project included:
* [Jasmine 1.1.0](https://github.com/pivotal/jasmine/downloads);
* [RequireJS 2.1.9](http://requirejs.org/docs/download.html);
* [RequireJS PageLoad Plugin](http://requirejs.org/docs/api.html#pageload)

We install Karma on top of it:
* [Karma 0.10.8](http://karma-runner.github.io)

## Karma Prerequisite

[NodeJS](http://nodejs.org)

## Installing Karma

Installing is simple. Just run the command below:
```bash
$ npm install -g karma
```

## Writing a new spec

When creating a new spec file, remember to add all of its dependencies.

Example:

```javascript
define([
  //corresponding SUT that is a dependency
  // and other dependencies, if any
],
function (sut, [other_dependencies_if_any]) {
  // spec code
});

```

## The RequireConfig

The earlier RequireJs config named "test-main.js" is well, simplified to
```javascript

/*
* Require Each Test File
*
* Karma includes all the files in window.__karma__.files, so by filtering this array we find all our test files.
*
* Now we can tell Require.js to load our tests,
* which must be done asynchronously as dependencies must be fetched before the tests are run.
*/
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

require.config({
    // Note: It is important to note that Karma uses /base as part of the base URL
    baseUrl: '/base',

    // Important: you can conveniently ignore '/base' when you compute the paths for the libs/modules as below
    paths: {
        'hello': 'src/hello'
        // All source files go here for simpler naming so that it is easier to use these names later
        // instead of using the absolute/relative path where ever these modules are required
    },

    // An array of dependencies to load as soon as RequireJS loader has processed the configuration.
    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start,

    waitSeconds: 15
});
```

## Karma config

The Karma config is the key to most of the magic of simplifying things in the other places.
And the Karma config file - karma.conf.js, file looks as below:

```javascript
// Karma configuration

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
    // This eleminates the need to store the libs locally in the project lib file.
    // Karma makes use of the installation of these respective modules via node plugins.
    // You got to resort to the traditional approach of declaring these in the require config otherwise :P
    frameworks: ['jasmine', 'requirejs'],

    // list of files / patterns to load in the browser
    // karma loads all these files automatically when starting its server under its /base directory automatically,
    // like 'src/abc.js' becomes 'karma/src/abc.js'
    files: [
      {pattern: 'src/**/*.js', included: false},
      {pattern: 'spec/**/*Spec.js', included: false},

      'spec/test-main.js'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // Chrome || ChromeCanary || Firefox || Opera || Safari || PhantomJS || IE
    // Opera (has to be installed with `npm install karma-opera-launcher`)
    // Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    // Choose [] if you like to manually hit the URL (http://localhost:9876/) in a browser of your choice
    browsers: [],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    // report which specs are slower than 500ms
    // CLI --report-slower-than 500
    reportSlowerThan: 500
  });
};

```

## Put together by

[Karthik Sirasanagandla](https://github.com/karthiks)

## My hearty thanks goes to the folks I'm inspired by:

* [Paulo Ragonha](https://github.com/pirelenito)
* [Uzi Kilon](https://github.com/uzikilon)
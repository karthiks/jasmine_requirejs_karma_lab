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
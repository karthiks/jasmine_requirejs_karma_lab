require.config({
    baseUrl: '',
    paths: {
        'domReady': 'lib/domReady', //domReady is a RequireJS plugin
        'jasmine': 'lib/jasmine-1.1.0/jasmine',
        'jasmine-html': 'lib/jasmine-1.1.0/jasmine-html',

        'specRunner': 'spec/specRunner',

        'hello': 'src/hello',
        // add new Subject Under Test here..

        'helloSpec': 'spec/helloSpec'
        // add new specs here
    },

    // An array of dependencies to load as soon as RequireJS loader has processed the configuration.
    deps: ['specRunner'],

    //You'd shim the 3rd party libs that are not AMD compatible
    shim: {
        'jasmine': {
            exports: 'jasmine'
        },
        'jasmine-html': ['jasmine']
    },

    waitSeconds: 15
});
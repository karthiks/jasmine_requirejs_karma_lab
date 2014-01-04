// This is the place to define custom javascripts available in the page..

// Moved the script from Jasmine's SpecRunner.html scriptlet to this file
// Note that the window.onload functionality is replaced with domReady plugin available for RequireJS

require([
    'domReady',
    'jasmine',
    'jasmine-html',
    'helloSpec'
    // add new specs here
],
    function(domReady, jasmine) {
//    console.log("All is well..");
//    console.log(jasmine);
        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;

        var trivialReporter = new jasmine.TrivialReporter();

        jasmineEnv.addReporter(trivialReporter);

        jasmineEnv.specFilter = function(spec) {
            return trivialReporter.specFilter(spec);
        };


        domReady(function () {
            jasmineEnv.execute();
        });
    });
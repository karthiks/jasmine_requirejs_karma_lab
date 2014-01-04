# Jasmine Standalone RequireJS

This is basically the **Jasmine Standalone Release** ported to use RequireJS.

It includes:

* [Jasmine 1.3.1](https://github.com/pivotal/jasmine/downloads);
* [RequireJS 2.1.9](http://requirejs.org/docs/download.html);
* [RequireJS PageLoad Plugin](http://requirejs.org/docs/api.html#pageload)

## Writing a new spec

When creating a new spec file, remember to add all of its dependencies.

Example:

```javascript
define([
  'jasmine'
  //corresponding SUT that is a dependency
  // and other dependencies, if any
],
function (jasmine, sut, [other_dependencies_if_any]) {
  // spec code
});

```

## The RequireConfig

Finally, we setup RequireJS to use [shim](http://requirejs.org/docs/api.html#config-shim) to load Jasmine because as yet Jasmine is not AMD compatible.
And our config file for this purpose is spec/test-main.js

```javascript
require.config({
    baseUrl: '',
    paths: {
        'domReady': 'lib/domReady', //domReady is a RequireJS plugin
        'jasmine': 'lib/jasmine-1.3.1/jasmine',
        'jasmine-html': 'lib/jasmine-1.3.1/jasmine-html',

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
```

## The SpecRunner

And to run the specs, we move the logic to exec the Jasmine runner from the HTML page scriptlet,
to an anonymous function definition, either as part of the test-main.js or
to a separate module like specRunner.js and mark it as dependency in the require.config above.

The re-defined logic to execute the Jasmine the RequireJS way is below for quick perusal:

```javascript
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
// Moved the script from Jasmine's SpecRunner.html scriptlet to this block..
// Note that the window.onload functionality is replaced with domReady plugin available for RequireJS
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
```

The above changes leaves only the RequireJS code back on the SpecRunner.html file, making the HTML file look simpler :)

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
  "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <title>Jasmine Spec Runner</title>
  <link rel="shortcut icon" type="image/png" href="lib/jasmine-1.3.1/jasmine_favicon.png">
  <link rel="stylesheet" type="text/css" href="lib/jasmine-1.3.1/jasmine.css">

  <script type="text/javascript" data-main="spec/test-main" src="lib/require.js"></script>
</head>

<body>
</body>
</html>
```

## Put together by

[Karthik Sirasanagandla](https://github.com/karthiks)

## My hearty thanks goes to the folks I'm inspired by:

* [Paulo Ragonha](https://github.com/pirelenito)
* [Uzi Kilon](https://github.com/uzikilon)
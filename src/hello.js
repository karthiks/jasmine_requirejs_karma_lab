define(function() {
    var Hello = {};
    Hello.helloWorld = function() {
        return 'Hello World';
    };

    Hello.helloX = function(person) {
        return 'Hello ' + person;
    };

    return Hello;
});
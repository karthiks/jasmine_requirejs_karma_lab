define(['jasmine', 'src/hello'], function(jasmine, Hello) {
    describe("helloWorld", function() {
        it("should return hello world", function() {
            expect(Hello.helloWorld()).toEqual('Hello World');
        });


    });

    describe("helloAnyone", function() {
        it("should return hello and any value", function() {
            expect(Hello.helloX('Jeffrey')).toEqual('Hello Jeffrey');
            expect(Hello.helloX('John')).toEqual('Hello John');
        });
    });
});
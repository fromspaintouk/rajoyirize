describe("Initialisation of rajoyirize plugin", function () {
    'use strict';
    var myRajoy;

    beforeEach(function () {
        myRajoy = new Rajoyirize();
    });

    it("should retrieve quotes Json object", function () {
        expect(myRajoy.quotes.length > 0).toBeTruthy();
    });
    
    it("should set default Rajoyirize element container", function () {
        expect(myRajoy.rajoyirizeContainer).toBe('rajoyirize-container');
    });
    
    it("should set autostart off", function () {
        expect(myRajoy.autostart).toBeFalsy();
    });
    
    describe("On start plugin", function () {
        var testContainerId = 'test-container';
        
        beforeEach(function () {
            myRajoy = new Rajoyirize({
                autostart: true,
                containerId: testContainerId
            });
        });
        
        it("should load plugin options into settings", function () {
            expect(myRajoy.autostart).toBeTruthy();
            expect(myRajoy.rajoyirizeContainer).toBe(testContainerId);
        });
        
        it("should create container element and add it to the html", function () {
            expect(document.getElementById(testContainerId)).not.toBeNull();
        });
        
        it("should load a random quote into the container", function () {
            expect(document.getElementById(testContainerId).innerHTML).not.toBe('');
        });
    });

});

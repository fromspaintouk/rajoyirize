describe("Initialisation of rajoyirize plugin", function () {
    'use strict';
    var myRajoy;

    beforeEach(function () {
        myRajoy = new Rajoyirize();
    });

    it("should retrieve quotes Json object", function () {
        expect(myRajoy.quotes.length > 0).toBeTruthy();
    });

});

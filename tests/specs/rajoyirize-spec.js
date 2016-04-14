describe("Initialisation of rajoyirize plugin", function () {
    'use strict';
    var myRajoy;

    beforeEach(function () {
        myRajoy = new Rajoyirize();
    });

    afterEach(function () {
        myRajoy = undefined;
    });

    it("should set default Rajoyirize element container ID", function () {
        expect(myRajoy.rajoyirizeContainerID).toBe('rajoyirize-container');
    });

    it("should set default image source", function () {
        expect(myRajoy.rajoyImageSrc).toBe('/assets/images/rajoy/rajoy.png');
    });

    it("should retrieve quotes JSON object", function () {
        expect(myRajoy.quotes.length > 0).toBeTruthy();
    });

    it("should set autostart off", function () {
        expect(myRajoy.autostart).toBeFalsy();
    });

    describe("On start plugin", function () {
        var testContainerId = 'test-container';
        var testImageSrc = 'path/to/the/image';

        beforeEach(function () {
            myRajoy = new Rajoyirize({
                autostart: true,
                containerId: testContainerId,
                imageSrc: testImageSrc
            });
        });

        afterEach(function () {
            myRajoy = undefined;
        });

        it("should load plugin options into settings", function () {
            expect(myRajoy.autostart).toBeTruthy();
            expect(myRajoy.rajoyirizeContainerID).toBe(testContainerId);
            expect(myRajoy.rajoyImageSrc).toBe(testImageSrc);
        });

        it("should create container element and add it to the html", function () {
            var rajoyirizeContainer = document.getElementById(testContainerId);

            expect(rajoyirizeContainer).not.toBeNull();
            expect(rajoyirizeContainer.id).toEqual(testContainerId);
            expect(rajoyirizeContainer.className).toContain('hidden');
        });

        it("should create an image element and add it to the container", function () {
            var rajoyirizeContainer = document.getElementById(testContainerId);
            var rajoyirizeImage = rajoyirizeContainer.getElementsByTagName('img')[0];

            expect(rajoyirizeImage).not.toBeNull();
            expect(rajoyirizeImage.width).toEqual(250);
            expect(rajoyirizeImage.height).toEqual(250);
            expect(rajoyirizeImage.src).toContain(testImageSrc);
        });

        it("should create a text element and add it to the container", function () {
            var rajoyirizeContainer = document.getElementById(testContainerId);
            var rajoyirizeQuote = rajoyirizeContainer.getElementsByTagName('p')[0];

            expect(rajoyirizeQuote).not.toBeNull();
        });

        it("should load a random quote into the container", function () {
            expect(document.getElementById(testContainerId).innerHTML).not.toBe('');
        });
    });
});

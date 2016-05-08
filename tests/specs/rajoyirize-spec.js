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

    it("should create container element", function () {
        expect(myRajoy.rajoyirizeContainer).not.toBeNull();
        expect(myRajoy.rajoyirizeContainer.id).toEqual('rajoyirize-container');
        expect(myRajoy.rajoyirizeContainer.className).toContain('hidden');
    });

    it("should create an image element and add it to the container", function () {
        var rajoyirizeImage = myRajoy.rajoyirizeContainer.getElementsByTagName('img')[0];

        expect(rajoyirizeImage).not.toBeNull();
        expect(rajoyirizeImage.width).toEqual(250);
        expect(rajoyirizeImage.height).toEqual(250);
        expect(rajoyirizeImage.src).toContain('/assets/images/rajoy/rajoy.png');
    });

    it("should create a text element and add it to the container", function () {
        var rajoyirizeQuote = myRajoy.rajoyirizeContainer.getElementsByTagName('p')[0];

        expect(rajoyirizeQuote).not.toBeNull();
    });

    it("should load the style sheet", function () {
        var links = document.getElementsByTagName('link');
        var link;
        var loadedStyleSheet = false;

        for (var i = 0; i < links.lenght; i ++) {
            link = links[i];

            if (link.type === 'text/css'
                && link.rel === 'stylesheet'
                && link.src.indexOf('/assets/styles.css') > -1 ) {

                loadedStyleSheet = link;
            }
        }

        expect(loadedStyleSheet).not.toBe(null);
    });

    describe("Non default plugin options", function () {
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

        it("should use the container ID passed in the options for the container", function () {
            expect(myRajoy.rajoyirizeContainer.id).toBe(testContainerId);
        });

        it("should use the image source passed in the options", function () {
            var rajoyirizeImage = myRajoy.rajoyirizeContainer.getElementsByTagName('img')[0];

            expect(rajoyirizeImage.src).toContain(testImageSrc);
        });
    });

    describe("On start plugin", function () {
        beforeEach(function () {
            myRajoy = new Rajoyirize({
                autostart: true
            });
        });

        afterEach(function () {
            myRajoy = undefined;
        });

        it("should load a random quote into the container", function () {
            expect(document.getElementById('rajoyirize-container').innerHTML).not.toBe('');
        });
    });
});

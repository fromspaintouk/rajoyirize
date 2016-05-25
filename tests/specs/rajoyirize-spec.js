describe("Initialisation of rajoyirize plugin", function () {
    'use strict';
    var myRajoy;

    beforeEach(function () {
        myRajoy = new Rajoyirize();
    });

    afterEach(function () {
        myRajoy = undefined;
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

    describe("On starting the plugin", function () {
        describe("Using default options", function () {
            beforeEach(function () {
                myRajoy = new Rajoyirize();
            });

            afterEach(function () {
                myRajoy = undefined;
            });

            it("should not add the container unless start is called", function () {
                expect(document.getElementById('rajoyirize-container')).toBeNull();
            });

            it("should create a container element with the default ID", function () {
                var container;

                myRajoy.start();
                container = document.getElementById('rajoyirize-container');

                expect(container).not.toBeNull();

                container.parentElement.removeChild(container);
            });

            it("should load the default image", function () {
                var container;
                var image;

                myRajoy.start();
                container = document.getElementById('rajoyirize-container');
                image = container.getElementsByTagName('img')[0];

                expect(image).not.toBeNull();
                expect(image.src).toContain('/assets/images/rajoy/rajoy.png');

                container.parentElement.removeChild(container);
            });


        });

        describe("Using user settings", function () {
            var testContainerId = 'test-container';
            var testImageSrc = 'path/to/the/image';

            afterEach(function () {
                myRajoy = undefined;
            });

            it("should add the container straight away", function () {
                var container;

                myRajoy = new Rajoyirize({ autostart: true });
                container = document.getElementById('rajoyirize-container');

                expect(container).not.toBeNull();

                container.parentElement.removeChild(container);
            });

            it("should create a container element with the ID passed as parameter", function () {
                var container;

                myRajoy = new Rajoyirize({ containerId: testContainerId });
                myRajoy.start();
                container = document.getElementById(testContainerId);

                expect(document.getElementById('rajoyirize-container')).toBeNull();
                expect(container).not.toBeNull();

                container.parentElement.removeChild(container);
            });

            it("should load the image passed as parameter", function () {
                var container;
                var image;

                myRajoy = new Rajoyirize({ imageSrc: testImageSrc });
                myRajoy.start();
                container = document.getElementById('rajoyirize-container');
                image = container.getElementsByTagName('img')[0];

                expect(image.src).toContain(testImageSrc);

                container.parentElement.removeChild(container);
            });
        });

        it("should load a random quote", function () {
            var container;
            var quote;

            myRajoy.start();
            container = document.getElementById('rajoyirize-container');
            quote = container.getElementsByTagName('p')[0];

            expect(quote.innerHTML).not.toBe('');

            container.parentElement.removeChild(container);
        });
    });
});

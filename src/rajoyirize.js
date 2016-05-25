(function () {
    'use strict';

    var Rajoyirize = function (userSettings) {
        // Private
        var properties = {};

        function getRandomQuote(numberOfQuotes) {
            var randomIndex = Math.floor((Math.random() * numberOfQuotes + 1) - 1);

            return randomIndex;
        }

        function includeStyles() {
            var link = document.createElement("link");

            link.href = "/assets/styles.css";
            link.rel = "stylesheet";
            link.type = "text/css";

            document.getElementsByTagName("head")[0].appendChild(link);
        }

        function initSettings(userSettings) {
            var finalSettings = {};

            userSettings = userSettings || {};

            finalSettings.rajoyirizeContainerID = userSettings.containerId || 'rajoyirize-container';
            finalSettings.rajoyImageSrc = userSettings.imageSrc || '/assets/images/rajoy/rajoy.png';
            finalSettings.autostart = userSettings.autostart || false;

            properties.settings = finalSettings;
        }

        function initQuotes() {
            properties.quotes = getQuotes() || [];
        }

        function initElements() {
            var domElements = {};

            domElements.rajoyirizeContainer = document.createElement('div');
            domElements.rajoyirizeContainer.id = properties.settings.rajoyirizeContainerID;
            
            domElements.rajoyirizeContentWrapper = document.createElement('div');
            domElements.rajoyirizeContentWrapper.className = 'rajoyirize-content-wrapper';

            domElements.rajoy = document.createElement('img');
            domElements.rajoy.src = properties.settings.rajoyImageSrc;
            domElements.rajoy.width = domElements.rajoy.height = 250;

            domElements.quoteContainer = document.createElement('p');
            domElements.quoteContainer.className = 'quote';
            
            domElements.rajoyirizeContainer.appendChild(domElements.rajoyirizeContentWrapper);
            domElements.rajoyirizeContentWrapper.appendChild(domElements.rajoy);
            domElements.rajoyirizeContentWrapper.appendChild(domElements.quoteContainer);

            properties.DOM = domElements;
        }

        function getQuotes() {
            return quotes || [{ quote: 'no quotes file found'}];
        }

        function displayQuote(numberOfQuotes) {
            var randomQuote = properties.quotes[getRandomQuote(numberOfQuotes)].quote;

            properties.DOM.quoteContainer.innerHTML = randomQuote;
        }

        // Public
        this.start = function () {
            var numberOfQuotes = properties.quotes.length;

            document.body.appendChild(properties.DOM.rajoyirizeContainer);
            displayQuote(numberOfQuotes);
        };

        includeStyles();
        initSettings(userSettings);
        initElements();
        initQuotes();

        if (properties.settings.autostart) {
            this.start();
        }
    };

    window.Rajoyirize = Rajoyirize;
}());

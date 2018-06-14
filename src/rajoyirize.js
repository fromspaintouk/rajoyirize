(function (d, w) {
    'use strict';

    var Rajoyirize = function (userSettings) {
        // Private
        var properties = {};
        var konamiKeys = '38,38,40,40,37,39,37,39,66,65';
        var userKeys = [];
        var _self = this;

        function getRandomQuote(numberOfQuotes) {
            var randomIndex = Math.floor((Math.random() * numberOfQuotes + 1) - 1);

            return randomIndex;
        }

        function includeStyles() {
            var link = d.createElement("link");

            link.href = "/assets/styles.css";
            link.rel = "stylesheet";
            link.type = "text/css";

            d.getElementsByTagName("head")[0].appendChild(link);
        }

        function initSettings(userSettings) {
            var finalSettings = {};

            userSettings = userSettings || {};

            finalSettings.rajoyirizeContainerID = userSettings.containerId || 'rajoyirize-container';
            finalSettings.rajoyImageSrc = userSettings.imageSrc || 'assets/images/rajoy/rajoy.png';
            finalSettings.visibleTime = userSettings.visibleTime || 6000;
            finalSettings.autostart = userSettings.autostart || false;

            properties.settings = finalSettings;
        }

        function initElements() {
            var domElements = {};

            domElements.rajoyirizeContainer = d.createElement('div');
            domElements.rajoyirizeContainer.id = properties.settings.rajoyirizeContainerID;

            domElements.rajoyirizeContentWrapper = d.createElement('div');
            domElements.rajoyirizeContentWrapper.className = 'rajoyirize-content-wrapper';

            domElements.rajoy = d.createElement('img');
            domElements.rajoy.src = properties.settings.rajoyImageSrc;
            domElements.rajoy.width = domElements.rajoy.height = 250;

            domElements.quoteContainer = d.createElement('p');
            domElements.quoteContainer.className = 'quote';

            domElements.rajoyirizeContainer.appendChild(domElements.rajoyirizeContentWrapper);
            domElements.rajoyirizeContentWrapper.appendChild(domElements.rajoy);
            domElements.rajoyirizeContentWrapper.appendChild(domElements.quoteContainer);

            properties.DOM = domElements;
        }

        function getQuotes() {
            var request = new XMLHttpRequest();
            var quotesSpreadsheetUrl = 'https://spreadsheets.google.com/feeds/list/1tMu-I25eZX1ojpSnB3W4ww6SB9uAbsSKFEwBLmX81F0/od6/public/values?alt=json';

            request.onreadystatechange = function() {
              if (request.readyState === 4) {
                if (request.status === 200) {
                    properties.quotes = extractQuotesArray(this.responseText) || [{ quote: 'no quotes file found'}];
                    displayQuote();
                } else {
                    console.log('ERROR: Could not load the quotes');
                }
              }
            }

            request.open('Get', quotesSpreadsheetUrl);
            request.send();
        }

        function extractQuotesArray(responseText) {
            var quotesData = JSON.parse(responseText);
            var quotesObjectArray = quotesData.feed.entry || [];
            var quotesArray = quotesObjectArray.map(function(quoteObject) {
                return { 'quote': quoteObject.title.$t };
            });

            return quotesArray;
        }

        function displayQuote() {
            properties.DOM.quoteContainer.innerHTML = getQuote();
            properties.DOM.rajoyirizeContentWrapper.classList.add('active');
            hideQuote();
        }

        function hideQuote() {
            var timer = w.setTimeout(function() {
                properties.DOM.rajoyirizeContentWrapper.classList.remove('active');
                clearTimeout(timer);
            }, properties.settings.visibleTime);
        }

        function getQuote() {
            var numberOfQuotes =  properties.quotes.length;

            return properties.quotes[getRandomQuote(numberOfQuotes)].quote;
        }

        function start() {
            getQuotes();
            d.body.appendChild(properties.DOM.rajoyirizeContainer);
        };

        // Public
        _self.displayQuote = function() {
            displayQuote();
        };

        includeStyles();
        initSettings(userSettings);
        initElements();

        if (properties.settings.autostart) {
            start();
        }

        // Konami code listener
        d.onkeydown = function(event) {
            userKeys.push(event.keyCode)

            if (userKeys.toString().indexOf(konamiKeys) >= 0) {
                _self.displayQuote();
                userKeys = [];
            }
        }
    };

    w.Rajoyirize = Rajoyirize;
}(document, window));


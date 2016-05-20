(function () {
    'use strict';

    function getRandomQuote(numberOfQuotes) {
        var randomIndex = Math.floor((Math.random() * numberOfQuotes + 1) - 1);
        return randomIndex;
    }
    
    function includeStyles() {
        var link = document.createElement( "link" );        
        link.href = "/assets/styles.css";
        link.rel = "stylesheet";
        link.type = "text/css";

        document.getElementsByTagName("head")[0].appendChild(link);
    }

    var Rajoyirize = function (settings) {
        var self = this;
        settings = settings || {};
        
        self.rajoyirizeContainerID = settings.containerId || 'rajoyirize-container';
        self.rajoyImageSrc = settings.imageSrc || '/assets/images/rajoy/rajoy.png';
        self.autostart = settings.autostart || false;

        includeStyles();
        self.initElements();

        if (self.autostart) {
            self.start();
        }
    };

    Rajoyirize.prototype.initElements = function () {
        var self = this;
        
        self.rajoyirizeContainer = document.createElement('div');
        self.rajoyirizeContainer.id = self.rajoyirizeContainerID;
        self.rajoyirizeContentWrapper = document.createElement('div');
        self.rajoyirizeContentWrapper.className = 'rajoyirize-content-wrapper';

        self.rajoy = document.createElement('img');
        self.rajoy.src = self.rajoyImageSrc;
        self.rajoy.width = self.rajoy.height = 250;

        self.quoteContainer = document.createElement('p');

        self.rajoyirizeContentWrapper.appendChild(self.rajoy);
        self.rajoyirizeContentWrapper.appendChild(self.quoteContainer);
        self.rajoyirizeContainer.appendChild(this.rajoyirizeContentWrapper);
    };

    Rajoyirize.prototype.start = function () {
        var self = this;
        self.quotes = self.getQuotes() || [];

        document.body.appendChild(self.rajoyirizeContainer);
        self.displayQuote(self.quotes.length);
    };

    Rajoyirize.prototype.displayQuote = function (numberOfQuotes) {
        var self = this;
        var randomQuote = self.quotes[getRandomQuote(numberOfQuotes)].quote;

        self.quoteContainer.innerHTML = randomQuote;
    };

    Rajoyirize.prototype.getQuotes = function () {
        return quotes || [{ quote: 'no quotes file found'}];
    };

    window.Rajoyirize = Rajoyirize;
}());

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
        settings = settings || {};
        this.rajoyirizeContainerID = settings.containerId || 'rajoyirize-container';
        this.rajoyImageSrc = settings.imageSrc || '/assets/images/rajoy/rajoy.png';
        this.quotes = this.getQuotes() || [];
        this.autostart = settings.autostart || false;

        includeStyles();
        this.initElements();

        if (this.autostart) {
            this.start();
        }
    };

    Rajoyirize.prototype.initElements = function () {
        this.rajoyirizeContainer = document.createElement('div');
        this.rajoyirizeContainer.id = this.rajoyirizeContainerID;
        this.rajoyirizeContainer.className = 'hidden';

        this.rajoy = document.createElement('img');
        this.rajoy.src = this.rajoyImageSrc;
        this.rajoy.width = this.rajoy.height = 250;

        this.quoteContainer = document.createElement('p');

        this.rajoyirizeContainer.appendChild(this.rajoy);
        this.rajoyirizeContainer.appendChild(this.quoteContainer);
    };

    Rajoyirize.prototype.start = function () {
        var numberOfQuotes = this.quotes.length;

        document.body.appendChild(this.rajoyirizeContainer);
        this.displayQuote(numberOfQuotes);
    };

    Rajoyirize.prototype.displayQuote = function (numberOfQuotes) {
        var randomQuote = this.quotes[getRandomQuote(numberOfQuotes)].quote;

        this.quoteContainer.innerHTML = randomQuote;
    };

    Rajoyirize.prototype.getQuotes = function () {
        return quotes || [{ quote: 'no quotes file found'}];
    };

    window.Rajoyirize = Rajoyirize;
}());

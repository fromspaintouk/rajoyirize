(function () {
    'use strict';

    var Rajoyirize = function (settings) {
        settings = settings || {};
        this.autostart = settings.autostart || false;
        this.rajoyirizeContainer = settings.containerId || 'rajoyirize-container';
        this.quotes = this.getQuotes() || [];

        if (this.autostart) {
            this.start();
        }
    };

    function getRandomQuote(numberOfQuotes) {
        var randomIndex = Math.floor((Math.random() * numberOfQuotes + 1) - 1);
        return randomIndex;
    }

    Rajoyirize.prototype.displayQuote = function (numberOfQuotes) {
        var quoteContainer = document.getElementById(this.rajoyirizeContainer);
        var randomQuote = this.quotes[getRandomQuote(numberOfQuotes)].quote;
        quoteContainer.textContent = randomQuote;
    };

    Rajoyirize.prototype.start = function () {
        var numberOfQuotes = this.quotes.length;
        document.body.innerHTML += "<div id='" + this.rajoyirizeContainer + "'></div>";
        this.displayQuote(numberOfQuotes);
    };

    Rajoyirize.prototype.getQuotes = function () {
        return quotes || [{ quote: 'no quotes file found'}];
    };

    window.Rajoyirize = Rajoyirize;
}());

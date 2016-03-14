var Rajoyirize = function (settings) {
    'use strict';
    settings = settings || {};
    this.autostart = settings.autostart || false;
    this.quotes = this.getQuotes() || [];

    if (this.autostart) {
        this.start();
    }
};

function getRandomQuote(numberOfQuotes) {
    'use strict';
    var randomIndex = Math.floor((Math.random() * numberOfQuotes + 1) - 1);
    return randomIndex;
}

Rajoyirize.prototype.displayQuote = function (numberOfQuotes) {
    'use strict';
    var quoteContainer = document.getElementById('quote-container');
    var randomQuote = this.quotes[getRandomQuote(numberOfQuotes)].quote;
    quoteContainer.textContent = randomQuote;
};

Rajoyirize.prototype.start = function () {
    'use strict';
    var numberOfQuotes = this.quotes.length;
    this.displayQuote(numberOfQuotes);
};

Rajoyirize.prototype.getQuotes = function () {
    'use strict';
    return quotes || [{ quote: 'no quotes file found'}];
};

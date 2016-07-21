var Factory = require('../lib/pageObject.js').PageObjectFactory;

module.exports = Factory.create({

    field: function () {
        return element.all(by.css('.TeXtField')).get(0);
        //element.all(by.css('.TeXtField')).get(0);
    },

});

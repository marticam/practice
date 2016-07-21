describe("User Signup", function() {

    var page = require("../pageObjects/ScrumLogin.js");
    var data = require('../lib/data.js').data;
    var nconf = require('nconf');

    beforeEach(function() {
        isAngularSite(false);
        page.go(nconf.get('env:URL'));
        //+"webapps/login"
    });


    it('Test if user is able to login successfully', function () {
        page.field().sendKeys("test");
        browser.driver.sleep(2000);
    });
});

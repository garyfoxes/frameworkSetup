/**
 * Created by garyfox on 09/11/2016.
 */
/*jshint -W089 */
var mock = require('protractor-http-mock');
describe('############', function () {
    var api = require('../../common/api.js')(browser.params.apiDetails.apiHost);
     mock(['test']);

});

afterEach(function () {
    
        var dbSettings = require('../../common/dbqueries.js')(browser.params.dbDetails);

});


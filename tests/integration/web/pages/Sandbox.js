/**
 * Created by garyfox on 12/10/2016.
 */
/*
var api = require('../../common/api.js')('url);
browser.executeScript('return window.localStorage.getItem(\'item\');').then(function (res) {
    var jsonTest = JSON.parse(res);
    console.log(jsonTest.token);
    api.method(jsonTest.token).then(function (res) {
        console.log(res);
    });
browser.sleep(1000).then(function () {
 console.log('hello');
 })
*/


    this.method = function () {
        var time = Math.floor(Date.now() / 1000);
        browser.manage().logs().get('browser').then(function(browserLog) {
            console.log('\n log: ' + require('util').inspect(browserLog));
        });

        return this;
    };


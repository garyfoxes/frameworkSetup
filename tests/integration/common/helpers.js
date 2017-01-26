/**
 * Created by garyfox on 18/08/2016.
 */
var logger = require('./log.js');
var data = require('./data.json');
var _ = require('lodash');

var Helpers = function () {

    this.scrollIntoView = function () {
        arguments[0].scrollIntoView();
    };
    this.checkElementExists = function (by, timeout) {
        var el = element(by);
        return browser.wait(function () {
            logger.log(data.loggingLevel.INFO, 'Waiting For Element ' + by + ' To Appear');
            return el.isPresent().then(function (r) {
                if (r === true) {
                    logger.log(data.loggingLevel.INFO, 'Element Found ' + by);
                    return true;
                }
            });
        }, timeout * 1000, 'Failed!! Element ' + by + ' is not present');
    };


    this.checkElementDoesNotExist = function (by, timeout) {
        var el = element(by);
        return browser.wait(function () {
            logger.log(data.loggingLevel.INFO, 'Waiting For Element ' + by + 'To Not Appear In Dom');
            return EC.not(EC.presenceOf(el));
        }, timeout * 1000, 'Failed!!,Element ' + by + ' is present');

    };

    this.checkElementExistAndClick = function (by1, timeout) {
        var me = this;
        return this.checkElementExists(by1, timeout).then(function () {
            logger.log(data.loggingLevel.INFO, 'Clicking On Element ' + by1);
            return element(by1).click().then(function () {
                logger.log(data.loggingLevel.INFO, 'Element Clicked');
                return true;
            }, function (er) {
                logger.log(data.loggingLevel.INFO, 'ERRRR ' + er);
                logger.log(data.loggingLevel.INFO, 'Couldnt Click On Element, Scrolling Element Into View And Trying To Click');
                return browser.executeScript(me.scrollIntoView, element(by1).getWebElement()).then(element(by1).click());
            });

        });
    };
    this.checkElementExistAndSendKeys = function (value, by, timeout) {
        var me = this;
        return this.checkElementExists(by, timeout).then(function () {
            logger.log(data.loggingLevel.INFO, 'Sending Keys To Element ' + by);
            element(by).clear();
            return element(by).sendKeys(value).then(function () {
                    logger.log(data.loggingLevel.INFO, 'Action/Value ' + value + ' has been sent');
                    return true;
                },
                function () {
                    logger.log(data.loggingLevel.INFO, 'Couldnt Send Keys, Scrolling Element Into View And Trying Again');
                    return browser.executeScript(me.scrollIntoView, element(by).getWebElement()).then(element(by).sendKeys(value));
                });
        });
    };
    this.checkElementExistsAndGetText = function (by, timeout) {
        return this.checkElementExists(by, timeout).then(function () {
            logger.log(data.loggingLevel.INFO, 'Getting Text Of Element ' + by);
            return element(by).getText().then(function (result) {
                return result;
            });
        });
    };
    this.verifyURLContainsSequence = function (sequence, timeout) {
        return browser.wait(function () {
            logger.log(data.loggingLevel.INFO, 'Waiting For URL To Contain ' + sequence);
            return browser.getCurrentUrl().then(function (url) {
                if (url.includes(sequence)) {
                    logger.log(data.loggingLevel.INFO, 'Url ' + url + ' Contains Sequence ' + sequence);
                    return true;
                }
            });
        }, timeout * 1000, 'Failed!! Url Does Not Contain Sequence ' + sequence);
    };
    this.getAllElements = function(by){
      return element.all(by).then(function (items) {
          return items;
      });
    };

    this.getQuestionIDFromUrl = function () {
        return browser.getCurrentUrl().then(function (url) {
            var splitUrl = _.split(url, 'questions/');
            if (splitUrl.length === 2 && !isNaN(parseInt(splitUrl[1]))) {
                return splitUrl[1];
            }
            return 0;

        });
    };
    this.getScreenSize = function () {
        return browser.driver.manage().window().getSize().then(function (size) {
            logger.log(data.loggingLevel.INFO, 'Returning Screen Size With Width ' + size.width + ' And Height ' + size.height);
            return size;
        });
    };
    this.clickAtPointFromObject = function (by, moveByX, moveByY) {
        var el = element(by);
        browser.actions()
            .mouseMove(el, {x: moveByX, y: moveByY})
            .click()
            .perform();
    };



};
module.exports = new Helpers();

/**
 * Created by garyfox on 02/09/2016.
 */
var logger = require('./log.js');
var axios = require('axios');
var data = require('./data.json');
module.exports = function (baseUrl) {


    this.apiMethod = function (email, password) {

        return axios.post('postUrl',
            {
                postParam: value,
                postParam: value
            }
        ).then(function (response) {
          
           
        }).catch(function (error) {
            logger.log(data.loggingLevel.ERROR, 'MESSAGE' + error);
        });
    };

    this.apiMethod = function (parameters) {
        var config = {

            headers: {
                'HeaderField': 'Value'
            },
            timeout: 10000
        };
        return axios.post('url',
            {
                description: description,
                text: text
            }, config
        ).then(function (response) {
            logger.log(data.loggingLevel.INFO, 'Message' + questionID);
            browser.params.varaible = value;
        }).catch(function (error) {
            logger.log(data.loggingLevel.ERROR, 'ERROR' + error);
        });
    };
    this.apiMethod = function (params) {
        var time = Math.floor(Date.now() / 1000) + Math.floor((Math.random() * 1000) + 1);
        var config = {

            headers: {
                'Header': 'Value'
            },
            timeout: 10000
        };
        return axios.post('url',
            {
                text: text + time
            }, config
        ).then(function (response) {
            var answerID = parseInt(response.data.content.id);
            browser.params.timestamps.push(time);
            browser.params.answerIds.push(answerID);
            logger.log(data.loggingLevel.INFO, 'Answer Id Is Now ' + answerID);
            browser.params.answerID = answerID;
        }).catch(function (error) {
            logger.log(data.loggingLevel.ERROR, 'ERROR POSTING ANSWER ' + error);
        });
    };

    this.apiCall = function (parameters) {
        var config = {

            headers: {
                'HeaderField': 'value'
            },
            timeout: 10000
        };
        return axios.post('url',
            {
                postParam: 'value'
            }, config
        ).then(function (response) {
            logger.log(data.loggingLevel.INFO, 'Message');
        }).catch(function (error) {
            logger.log(data.loggingLevel.ERROR, 'Message' + error);
        });
    };

    return this;
};


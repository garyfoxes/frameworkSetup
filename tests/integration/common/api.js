/**
 * Created by garyfox on 02/09/2016.
 */
var logger = require('./log.js');
var axios = require('axios');
var data = require('./data.json');
module.exports = function (baseUrl) {


    this.getLoginToken = function (email, password) {

        return axios.post('postUrl',
            {
                email: email,
                password: password
            }
        ).then(function (response) {
            var loginToken = response.data.token;
            logger.log(data.loggingLevel.INFO, 'Logged In With Email ' + email);
            logger.log(data.loggingLevel.INFO, 'Login Token Is Now ' + loginToken);
            browser.params.loginToken = loginToken;
        }).catch(function (error) {
            logger.log(data.loggingLevel.ERROR, 'ERROR GETTING LOGIN TOKEN' + error);
        });
    };

    this.postQuestion = function (token, text, description) {
        var config = {

            headers: {
                'Authorization': 'Bearer ' + token
            },
            timeout: 10000
        };
        return axios.post(baseUrl + '/questions',
            {
                description: description,
                text: text
            }, config
        ).then(function (response) {
            var questionID = parseInt(response.data.content.id);
            logger.log(data.loggingLevel.INFO, 'Question Id Is Now ' + questionID);
            browser.params.questionID = questionID;
        }).catch(function (error) {
            browser.params.questionID = 0;
            logger.log(data.loggingLevel.ERROR, 'ERROR POSTING QUESTION ' + error);
        });
    };
    this.postAnswerApi = function (token, questionID, text) {
        var time = Math.floor(Date.now() / 1000) + Math.floor((Math.random() * 1000) + 1);
        var config = {

            headers: {
                'Authorization': 'Bearer ' + token
            },
            timeout: 10000
        };
        return axios.post(baseUrl + '/questions/' + questionID + '/answers',
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

    this.postVoteUpApi = function (token, questionID, answerID) {
        var config = {

            headers: {
                'Authorization': 'Bearer ' + token
            },
            timeout: 10000
        };
        return axios.post(baseUrl + '/questions/' + questionID + '/answers/' + answerID + '/vote',
            {
                state: '+1'
            }, config
        ).then(function (response) {
            logger.log(data.loggingLevel.INFO, 'Successfully Voted Up');
        }).catch(function (error) {
            logger.log(data.loggingLevel.ERROR, 'ERROR Voting UP ' + error);
        });
    };

    this.postMultipleAnswersApi = function () {
        var me = this;
        var counter = 0;
        var testParams = [data.users.userA, data.users.userB, data.users.userC];
        me.getLoginToken(testParams[0].email, testParams[0].password).then(function () {
            me.postQuestion(browser.params.loginToken, data.successfulQuestionTitle, data.successfulQuestionDetail).then(function () {
                for (var currentParam = 0; currentParam < testParams.length; currentParam++) {
                    me.getLoginToken(testParams[currentParam].email, testParams[currentParam].password)
                        .then(function () {
                            me.postAnswerApi(browser.params.loginToken, browser.params.questionID, data.successfulAnswer);
                        });
                }
            });
        });
    };

    return this;
};


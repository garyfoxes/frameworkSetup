/**
 */
/*jshint -W109 */
var mysql = require('mysql');
var data = require('./data.json');
var logger = require('./log.js');
module.exports = function (dbDetails) {
    this.connection = mysql.createConnection({
        host: dbDetails.host,
        user: dbDetails.username,
        password: dbDetails.password,
        port: dbDetails.port,
        database: dbDetails.database,
        multipleStatements: true
    });
    this.connect = function () {
        var me = this;
        me.connection.connect(function (err) {
            if (err) {
                logger.log(data.loggingLevel.ERROR, 'Error Connecting: ' + err.stack);
                return;
            }

            logger.log(data.loggingLevel.INFO, 'Connected As Id ' + me.connection.threadId);
        });
        return this;
    };
    this.getAllQuestions = function (callback) {
        var sql = 'select * from questions';
        this.connection.query(sql, function (err, results, fields) {
            if (!err) {
                callback(results);

            }
        });
    };
    this.removeQuestionById = function (questionId) {
        var sql = 'DELETE FROM forum_questions WHERE id=' + questionId;
        this.connection.query(sql, function (err, results) {
            if (err) {
                logger.log(data.loggingLevel.ERROR, 'Error Deleting Row With Question Id  ' + questionId + '' + err.stack);
                return;
            }
            logger.log(data.loggingLevel.INFO, 'Successfully Deleted Row With Question Id ' + questionId);

        });
    };
    this.removeQuestionFromQuestionsTagsById = function (questionId) {
        var sql = 'DELETE FROM forum_questions_tags WHERE question_id =' + questionId;
        this.connection.query(sql, function (err, results) {
            if (err) {
                logger.log(data.loggingLevel.ERROR, 'Error Deleting Row From Questions_Tags Table With Id  ' + questionId + '' + err.stack);
                return;
            }
            logger.log(data.loggingLevel.INFO, 'Successfully Deleted Row From Questions_Tags Table With Id ' + questionId);

        });
    };

    this.removeAnswerById = function (id) {
        var sql = "DELETE FROM forum_answers WHERE id =" + id;
        this.connection.query(sql, function (err, results) {
            if (err) {
                logger.log(data.loggingLevel.ERROR, 'Error Deleting Row From Answers Table With id  ' + id + '' + err.stack);
                return;
            }
            logger.log(data.loggingLevel.INFO, 'Successfully Deleted Row From Answers Table With id ' + id);

        });
    };
    this.getAnswerIdFromTimeStamp = function (timestamp, callback) {
        var sql = "Select id FROM forum_answers WHERE text like '%" + timestamp + "%'";
        console.log(sql);
        this.connection.query(sql, function (err, results) {
            if (err) {
                logger.log(data.loggingLevel.ERROR, 'Error Selecting Id From Answers Table With Timestamp  ' + timestamp + '' + err.stack);
            }
            else{
                logger.log(data.loggingLevel.INFO, 'Found Answer Id From Timestamp ' + timestamp);
                callback(results[0].id);
            }

        });
    };
    this.removeAnswersTagsById = function (id, callback) {

        var sql = "DELETE FROM forum_answers_tags WHERE answer_id=" + id;
        this.connection.query(sql, function (err, results) {
            if (err) {
                logger.log(data.loggingLevel.ERROR, 'Error Deleting Row From Answers_Tags Table With id  ' + id + '' + err.stack);
                return;
            }
            logger.log(data.loggingLevel.INFO, 'Successfully Deleted Row From Answers_Tags Table With id ' + id);
        });
    };


    this.end = function () {
        this.connection.end(function (err) {
            if (err) {
                logger.log(data.loggingLevel.ERROR, 'Error Closing Connection ' + err.stack);
                return;
            }
            logger.log(data.loggingLevel.INFO, 'Connection Closed');
        });
    };
    return this;
};


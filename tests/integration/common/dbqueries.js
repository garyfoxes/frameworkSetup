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
    this.sqlMethod = function (callback) {
        var sql = 'SQL STATEMENT';
        this.connection.query(sql, function (err, results, fields) {
            if (!err) {
                callback(results);

            }
        });
    };
    this.sqlMethod = function (questionId) {
        var sql = 'SQL STATEMENT;
        this.connection.query(sql, function (err, results) {
            if (err) {
                logger.log(data.loggingLevel.ERROR, 'ERROR ' + questionId + '' + err.stack);
                return;
            }
            logger.log(data.loggingLevel.INFO, 'ERROR' + questionId);

        });
    };
    this.sqlMethod = function (questionId) {
        var sql = 'SQL STATEMENT' + questionId;
        this.connection.query(sql, function (err, results) {
            if (err) {
                logger.log(data.loggingLevel.ERROR, 'ERROR' + questionId + '' + err.stack);
                return;
            }
            logger.log(data.loggingLevel.INFO, 'ERROR' + questionId);

        });
    };

    this.sqlMethod = function (id) {
        var sql = "SQL STATEMENT" + id;
        this.connection.query(sql, function (err, results) {
            if (err) {
                logger.log(data.loggingLevel.ERROR, 'ERROR' + id + '' + err.stack);
                return;
            }
            logger.log(data.loggingLevel.INFO, 'ERROR + id);

        });
    };
    this.sqlMethod = function (timestamp, callback) {
        var sql = "SQL STATEMENT '%" + timestamp + "%'";
        console.log(sql);
        this.connection.query(sql, function (err, results) {
            if (err) {
                logger.log(data.loggingLevel.ERROR, 'ERROR' + timestamp + '' + err.stack);
            }
            else{
                logger.log(data.loggingLevel.INFO, 'ERROR' + timestamp);
                callback(results[0].id);
            }

        });
    };
    this.sqlMethod = function (id, callback) {

        var sql = "SQL STATEMENT" + id;
        this.connection.query(sql, function (err, results) {
            if (err) {
                logger.log(data.loggingLevel.ERROR, 'ERROR ' + id + '' + err.stack);
                return;
            }
            logger.log(data.loggingLevel.INFO, 'ERROR' + id);
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


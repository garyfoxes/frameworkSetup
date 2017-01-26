/**
 * Created by garyfox on 23/08/2016.
 */
var winston = require('winston');
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {timestamp: true});
winston.cli();
module.exports = winston;

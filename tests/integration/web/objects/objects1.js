/**
 */
/*jshint -W109 */
var className = function () {

   
    this.object = function (timestamp) {
        return by.xpath("//span[@class='ng-scope' and contains(.,'" + timestamp + "')]");
    };
    };
};
module.exports = new object();
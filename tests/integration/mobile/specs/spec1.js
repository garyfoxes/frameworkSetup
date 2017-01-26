/**
 * Created by garyfox on 12/10/2016.
 */
/*jshint -W089 */
describe('Ask A Question Functionality', function () {
    var testParams = [data.users.userA, data.users.userB];

    for (var currentParam = 0; currentParam < testParams.length; currentParam++) {
        (function (testSpec) {
            it('##########', function () {
                method.selectUser(testSpec);
            });
        })(testParams[currentParam]);
    }

    afterEach(function () {

    });
});


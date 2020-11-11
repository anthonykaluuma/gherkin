var should = require('should');
var gherkin = require('..');

describe('gherkin()', function() {
    var test;
    var feature = [
        'Feature: Logging into Instagram',
        '  As a Instagram user',
        '  I want to login to my account',
        '  So that I can see my friends posts',
        '',
        '  Scenario: Can follow friends',
        '    Given I am logged into my Instagram account',
        '    And I navigate to the explore feed',
        '    When I tap on a users profile name',
        '    Then I can follow them'
    ].join('\r\n');

    beforeEach(function() {
        test = gherkin();
    });

    it('should call the handler functions for each line', function() {
        test.given(/I am logged into my Instagram account/, function() {
        });

        test.given(/I navigate to the explore feed/, function() {

        });

        test.when(/I tap on a users profile name'/, function() {
        });


        test.then(/I can follow them/, function() {
        });

        test.run(feature);
    });
});

var should = require('should');
var gherkin = require('..');

describe('gherkin.parser(text)', function() {
  it('should return an empty list when text is undefined', function() {
    should(gherkin.parser()).eql([ ]);
  });

  it('should parse a buffer', function() {
    var feature = [
      'Feature: Logging into Instagram',
      '  As a Instagram user',
      '  I want to login to my account',
      '  So that I can see my friends posts',
      '',
      '  Scenario: Can see posts',
      '    Given I visit Instagram',
      '    When I enter "incong_catalog_qa1" into the username text field',
      '    And I enter "Test123456" into the password text field',
      '    Then verify the page',
      '',
      '  Scenario: Can like posts',
      '    Given I am logged into my Instagram account',
      '    When I see a post in my explore feed',
      '    Then I can like it ',
      '',
      '  Scenario: Can follow friends',
      '    Given I am logged into my Instagram account',
      '    And I navigate to the explore feed',
      '    When I tap on a users profile name',
      '    Then  I can follow them'
    ].join('\r\n');


    should(gherkin.parser(new Buffer(feature))).eql([
      {
        feature: 'Logging into Instagram',
        perspective: 'a Instagram user',
        desire: 'to login to my account',
        reason: 'I can see my friends posts',
        scenarios: [
          {
            scenario: 'Can see posts',
            given: [
              'I visit Instagram'
            ],
            when: [
              'I enter "incong_catalog_qa1" into the username text field',
              'I enter "Test123456" into the password text field'
            ],
            then: [
              'verify the page'
            ]
          },
          {
            scenario: 'Can like posts',
            given: [
              'I am logged into my Instagram account'
            ],
            when: [
              'I see a post in my explore feed'
            ],
            then: [
              'I can like it'
            ]
          },
          {
            scenario: 'Can follow friends',
            given: [
              'I am logged into my Instagram account',
              'I navigate to the explore feed'
            ],
            when: [
              'I tap on a users profile name'
            ],
            then: [
              'I can follow them'
            ]
          }
        ]
      }
    ]);
  });
});


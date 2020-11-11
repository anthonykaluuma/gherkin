# Gherkin Parser

![Work In Progress](https://www.repostatus.org/badges/latest/wip.svg)

## About

This repo is a learning ground for Gherkin:

- Gherkin - a syntax for writing BDD features (Feature, Background, Example/Scenario, Given/When/Then, etc.)

## Installation

`npm install`

`npm test`

## How to use

Given a feature file named **instagram.feature** with the contents:

``` Gherkin
Feature: Using Instagram

      Feature: Logging into Instagram
      As a Instagram user
      I want to login to my account
      So that I can see my friends posts
      
      Scenario: Can see posts
      Given I visit Instagram
      When I enter "incong_catalog_qa1" into the username text field
      And I enter "Test123456" into the password text field
      Then verify the page
      
      Scenario: Can like posts
      Given I am logged into my Instagram account
      When I see a post in my explore feed
      Then I can like it 
     
      Scenario: Can follow friends
      Given I am logged into my Instagram account
      And I navigate to the explore feed
      When I tap on a users profile name
      Then  I can follow them
```

When calling the `parser` function:

``` javascript
var fs = require('fs');
var gherkin = require('gherkin');
var file = fs.readFileSync('Instagram.feature');

console.log(gherkin.parser(file));
```

Then the following JSON object is returned:

``` javascript
[
   [
    Object {
      desire: 'to login to my account',
      feature: 'Logging into Instagram',
      perspective: 'a Instagram user',
      reason: 'I can see my friends posts',
      scenarios: Array [
        Object {
          given: Array [ 'I visit Instagram' ],
          scenario: 'Can see posts',
          then: Array [ 'verify the page' ],
          when: Array [
            'I enter "incong_catalog_qa1" into the username text field',
            'I enter "Test123456" into the password text field'
          ]
        },
        Object {
          given: Array [ 'I am logged into my Instagram account' ],
          scenario: 'Can like posts',
          then: Array [ 'I can like it' ],
          when: Array [ 'I see a post in my explore feed' ]
        },
        Object {
          given: Array [
            'I am logged into my Instagram account',
            'I navigate to the explore feed'
          ],
          scenario: 'Can follow friends7',
          then: Array [ 'I can follow them' ],
          when: Array [ 'I tap on a users profile name' ]
        }
      ]
    }
  ] to equal Array [
    Object {
      desire: 'to login to my account',
      feature: 'Logging into Instagram',
      perspective: 'a Instagram user',
      reason: 'I can see my friends posts',
      scenarios: Array [
        Object {
          given: Array [ 'I visit Instagram' ],
          scenario: 'Can see posts',
          then: Array [ 'verify the page' ],
          when: Array [
            'I enter "incong_catalog_qa1" into the username text field',
            'I enter "Test123456" into the password text field'
          ]
        },
        Object {
          given: Array [ 'I am logged into my Instagram account' ],
          scenario: 'Can like posts',
          then: Array [ 'I can like it' ],
          when: Array [ 'I see a post in my explore feed' ]
        },
        Object {
          given: Array [
            'I am logged into my Instagram account',
            'I navigate to the explore feed'
          ],
          scenario: 'Can follow friends',
          then: Array [ 'I can follow them' ],
          when: Array [ 'I tap on a users profile name' ]
        }
      ]
    }
  ] 
```



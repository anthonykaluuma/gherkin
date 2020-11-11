var R_NEWLINE = /\r?\n/g;
var R_FEATURE = /^\s*Feature:(.*)$/;
var R_AS = /^\s*As (.*)$/;
var R_I_WANT = /^\s*I want (.*)$/;
var R_SO_THAT = /^\s*So that (.*)$/;
var R_IN_ORDER = /^\s*In order (.*)$/;
var R_SCENARIO = /^\s*Scenario:(.*)$/;
var R_GIVEN = /^\s*Given (.*)$/;
var R_WHEN = /^\s*When(.*)$/;
var R_THEN = /^\s*Then (.*)$/;
var R_AND = /^\s*And (.*)$/;
var R_BUT = /^\s*But (.*)$/;

function extract(line, regex, index) {
  return line.match(regex)[index].trim();
}

module.exports = function(text) {
  var feature;
  var scenario;
  var previous;
  var features = [];
  var lines = (text || '').toString().split(R_NEWLINE);

  lines.forEach(function(line) {
    if (R_FEATURE.test(line)) {
      feature = {
        feature: extract(line, R_FEATURE, 1),
        scenarios: []
      };

      features.push(feature);
    }
    else if (R_AS.test(line)) {
      feature.perspective = extract(line, R_AS, 1);
    }
    else if (R_I_WANT.test(line)) {
      feature.desire = extract(line, R_I_WANT, 1);
    }
    else if (R_SO_THAT.test(line)) {
      feature.reason = extract(line, R_SO_THAT, 1);
    }
    else if (R_IN_ORDER.test(line)) {
      feature.reason = extract(line, R_IN_ORDER, 1);
    }
    else if (R_SCENARIO.test(line)) {
      scenario = {
        scenario: extract(line, R_SCENARIO, 1),
        given: [],
        when: [],
        then: []
        // and: []
      };

      feature.scenarios.push(scenario);
    }
    else if (R_GIVEN.test(line)) {
      previous = scenario.given;
      scenario.given.push(extract(line, R_GIVEN, 1));
    }
    else if (R_WHEN.test(line)) {
      previous = scenario.when;
      scenario.when.push(extract(line, R_WHEN, 1));
    }
    else if (R_THEN.test(line)) {
      previous = scenario.then;
      scenario.then.push(extract(line, R_THEN, 1));
    }
    // else if (R_AND.test(line)) {
    //   previous = scenario.and;
    //   scenario.and.push(extract(line, R_AND, 1));
    // }
    else if (R_AND.test(line)) {
      previous.push(extract(line, R_AND, 1));
    }
    else if (R_BUT.test(line)) {
      previous.push(extract(line, R_BUT, 1));
    }
    else if (line.trim().length > 0) {
      throw new SyntaxError(line.trim());
    }
  });

  return features;
};


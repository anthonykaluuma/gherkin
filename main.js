var parser = require('./parser');

module.exports = function(world) {
  return new Suite(world);
};

function Suite(world) {
  this._world = world || { };
  this._given = [];
  this._when = [];
  this._then = [];
  // this._and = [];
}

Suite.prototype.resolve = function(list, text) {
  for (var i = 0; i < list.length; i++) {
    var match = text.match(list[i].r);

    if (match) {
      match[0] = this._world;
      return Function.prototype.bind.apply(list[i].f, match);
    }
  }

  throw new ReferenceError(text);
};

Suite.prototype.given = function(r, f) {
  this._given.push({
    r: r,
    f: f
  });
};

Suite.prototype.resolveGiven = function(text) {
  return this.resolve(this._given, text);
};

Suite.prototype.when = function(r, f) {
  this._when.push({
    r: r,
    f: f
  });
};

Suite.prototype.resolveWhen = function(text) {
  return this.resolve(this._when, text);
};

Suite.prototype.then = function(r, f) {
  this._then.push({
    r: r,
    f: f
  });
};

Suite.prototype.resolveThen = function(text) {
  return this.resolve(this._then, text);
};

// Suite.prototype.and = function(r, f) {
//   this._and.push({
//     r: r,
//     f: f
//   });
// };
//
// Suite.prototype.resolveAnd = function(text) {
//   return this.resolve(this._and, text);
// };

Suite.prototype.run = function(text) {
  var features = parser(text);
  var suite = this;

  features.forEach(function(feature) {
    describe('Feature: ' + feature.feature, function() {
      feature.scenarios.forEach(function(scenario) {
        describe('Scenario: ' + scenario.scenario, function() {
          scenario.given.forEach(function(g) {
            it('Given ' + g, suite.resolveGiven(g));
          });

          scenario.when.forEach(function(w) {
            it('When ' + w, suite.resolveWhen(w));
          });

          scenario.then.forEach(function(t) {
            it('Then ' + t, suite.resolveThen(t));
          });

          // scenario.and.forEach(function(a) {
          //   it('And ' + a, suite.resolveAnd(a));
          // });
        });
      });
    });
  });
};

'use strict';
var extrasController = require('../../src/controllers/hello-controller');
var expect = require('chai').expect;

describe('Hello Controller', function() {
  describe('hello from the Controller', function() {
    it('should return Hellooo', function(done) {
      extrasController.run().then(function(data) {
        expect(data).to.equal('Hello');
        done();
      });
    });
  });
});

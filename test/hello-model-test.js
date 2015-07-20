'use strict';
var expect = require('chai').expect;

var hello = require('../src/model/hello-model');

describe('Hello Model', function () {
  it('should have a greet method', function () {
    expect(hello.greet).not.to.be.undefined;
  });
  describe('when greet method is called', function () {
    it('should greet with a friendly Hellooo', function () {
      expect(hello.greet()).eql('Hello');
    });
  });
});

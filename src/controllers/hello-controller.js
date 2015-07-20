'use strict';

var Promise = require('bluebird');
var hello = require('../model/hello-model');


function helloGreeting(callback) {
  callback(null, hello.greet());
}


module.exports = {
  run: function run(qs, id) {
    var greeter = Promise.promisify(helloGreeting);
    return greeter();
  }
};

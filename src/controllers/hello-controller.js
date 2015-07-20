'use strict';

var Promise = require('bluebird');


function helloGreeting(callback) {
  callback(null, "Hellooo");
}


module.exports = {
  run: function run(qs, id) {
    var greeter = Promise.promisify(helloGreeting);
    return greeter();
  }
};

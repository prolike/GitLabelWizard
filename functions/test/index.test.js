const test = require('firebase-functions-test')();
const myFunctions = require('../index.js');
var expect = require('chai').expect
var request = require('request')
var sinon = require('sinon');
const req = {"text": 'input'};

describe('Test', function(done) {
 it('should return 200 and test', function (done) {
      // Invoke addMessage with our fake request and response objects. This will cause the
      // assertions in the response object to be evaluated.
      var object = { status: function(){}};

      const resMock = {"send":sinon.spy(),"status":sinon.spy(object,"status")} //Format af response ja, vi skal enten mocke eller stubb response det finder vi nok ud af snart, 
      myFunctions.callMe(req,resMock)
      sinon.assert.calledOnce(resMock["send"])
      expect
      console.log(resMock["send"])
      console.log(resMock["send"]["args"])
      console.log(resMock["status"]["args"])
      done();
    });

 
  });






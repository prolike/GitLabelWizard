const test = require('firebase-functions-test')();
const myFunctions = require('../index.js');
var assert = require("assert");
var expect = require('chai').expect
var request = require('request')

const req = { query: {text: 'input'} };

describe('Test', function(done) {

 it('should return 403', function (done) {
      var getinfo = myFunctions.getInfo("test");
      expect(getinfo.to.equal("test");
      done();
    });
  });


  it('should return 200', function (done) {
    request.post('http://localhost:5000/gitlabelwizard-8a56d/us-central1/callMe', function (err, res, body){
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('test');
      done();
    });
  });

});




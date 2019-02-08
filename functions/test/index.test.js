const myFunctions = require('../index.js');
var expect = require('chai').expect
var sinon = require('sinon');
const httpMocks       = require('node-mocks-http');
const eventEmitter    = require('events').EventEmitter;

describe('Test', function(done) {
 
// https://stackoverflow.com/questions/49352060/how-do-you-unit-test-a-firebase-function-wrapped-with-express
  it('Method = GET, Should return 403', function (done) {
      let options = {
      method: 'GET'
      };
      var req = httpMocks.createRequest(options);
      var res = httpMocks.createResponse({eventEmitter:eventEmitter});
      myFunctions.callMe(req,res);
      expect(res.statusCode).to.equal(403)
      console.log(res)
      done();
    });

   it('Method = POST, Should return 200', function (done) {
      let options = {
      method: 'POST',
      body: '{"test":"test"}'
      };
      var req = httpMocks.createRequest(options);
      var res = httpMocks.createResponse({eventEmitter:eventEmitter});
      myFunctions.callMe(req,res);
      expect(res.statusCode).to.equal(200)
      console.log(res)
      done();
    });

  });






const myFunctions = require('../index.js');
const test = require('firebase-functions-test')();
var expect = require('chai').expect
var sinon = require('sinon');
const httpMocks       = require('node-mocks-http');
const eventEmitter    = require('events').EventEmitter;
const nock = require('nock')
var request = require('request');

var apiKey = "itsatest"

// https://stackoverflow.com/questions/49352060/how-do-you-unit-test-a-firebase-function-wrapped-with-express
describe('API TEST', function(done) {
  it('Invalid request(GET) - no APIkey, it should return 403 - missing api key', function (done) {
    let options = {
      method: 'GET'};
    var req = httpMocks.createRequest(options);
    var res = httpMocks.createResponse({eventEmitter:eventEmitter});
    myFunctions.callMe(req,res);
    expect(res.statusCode).to.equal(403)
    //console.log(res)
    //console.log(res)
    done();
  });

  it('Invalid request(GET) - Invalid Apikey, it should return 403 - invalid api key', function (done) {
    let options = {
      method: 'GET',
      params: {api_key:"asd"}};
    var req = httpMocks.createRequest(options);
    var res = httpMocks.createResponse({eventEmitter:eventEmitter});
    myFunctions.callMe(req,res);
    expect(res.statusCode).to.equal(403)
    //console.log(res)
    done();
  });

it('Invalid request(GET) - Valid ApiKey - it should return 403 - Forbidden! Invalid request method', function (done) {
    let options = {
      method: 'GET',
      params: {api_key:apiKey}};
    var req = httpMocks.createRequest(options);
    var res = httpMocks.createResponse({eventEmitter:eventEmitter});
    myFunctions.callMe(req,res);
    expect(res.statusCode).to.equal(403)
    //console.log(res)
    done();
  });

  it('Valid request(POST) - Missing API KEY, it should return 402 - missing api key', function (done) {
    let options = {
      method: 'POST'};
    var req = httpMocks.createRequest(options);
    var res = httpMocks.createResponse({eventEmitter:eventEmitter});
    myFunctions.callMe(req,res);
    expect(res.statusCode).to.equal(403)
    //console.log(res)
    done();
  });
  it('Valid request(POST) - Invalid API KEY, it should return 402 - invalid api key', function (done) {
    let options = {
      method: 'POST',
      params: {api_key:"invalidKey"}};
    var req = httpMocks.createRequest(options);
    var res = httpMocks.createResponse({eventEmitter:eventEmitter});
    myFunctions.callMe(req,res);
    expect(res.statusCode).to.equal(403)
    //console.log(res)
    done();
  }); 
   it('Valid request(POST) - valid API KEY, it should return 202 - Success', function (done) {
    let options = {
      method: 'POST',
      params: {api_key:apiKey}};
    var req = httpMocks.createRequest(options);
    var res = httpMocks.createResponse({eventEmitter:eventEmitter});
    myFunctions.callMe(req,res);
    expect(res.statusCode).to.equal(202)
    done();
  });

});

describe('Github Label HTTP operations test - Mock server (Nock)', function(done) {
it('labelAdd', function (done) {

     const scope = nock('https://api.github.com') //Api url
    .post('/repos/prolike/gitlabelwizard/labels') //The url-oath we going to recieve HTTP request
    .reply(function(uri, requestBody) { // The reply function
     // console.log('path:', this.req)
     // console.log('headers:', requestBody)
      expect(requestBody).to.equal(labelObject)
    }) 
    .log(console.log)
    var repoOwner = "prolike"
    var repoName = "gitlabelwizard"
    var token = "tokenasdasdasd"
    var labelObject = "{'name': 'test label', 'color': 'ffffff'}"
    myFunctions.labelAdd(repoOwner,repoName,labelObject,token);
    done();
  });

it('labelRemove', function (done) {
     const scope = nock('https://api.github.com')
    .post('/repos/prolike/gitlabelwizard/labels')
    .reply(function(uri, requestBody) {
      //console.log('path:', this.req.path)
     // console.log('headers:', this.req.headers)
      //console.log('headers:', requestBody)
      expect(requestBody).to.equal("{'Test':'asd'}")
    })
    .log(console.log)
    var repoOwner = "prolike"
    var repoName = "gitlabelwizard"
    var token = "tokenasdasdasd"
    var labelName = "Action - awaiting feedback"
    myFunctions.labelRemove(repoOwner,repoName,labelName,token);
    done();
  });
});






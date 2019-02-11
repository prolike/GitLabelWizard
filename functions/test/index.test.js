const myFunctions = require('../index.js');
const test = require('firebase-functions-test')();
var expect = require('chai').expect
var sinon = require('sinon');
const httpMocks       = require('node-mocks-http');
const eventEmitter    = require('events').EventEmitter;
const nock = require('nock')
var request = require('request');
describe('Test', function(done) {
 
// https://stackoverflow.com/questions/49352060/how-do-you-unit-test-a-firebase-function-wrapped-with-express
  it('Method = GET, Should return 403', function (done) {
    let options = {
      method: 'GET'};
    var req = httpMocks.createRequest(options);
    var res = httpMocks.createResponse({eventEmitter:eventEmitter});
    myFunctions.callMe(req,res);
    expect(res.statusCode).to.equal(403)
    //console.log(res)
    done();
  });

  it('Method = POST, Should return 200', function (done) {
    let options = {
      method: 'POST',
      body: '{"test":"test"}'};
    var req = httpMocks.createRequest(options);
    var res = httpMocks.createResponse({eventEmitter:eventEmitter});
    myFunctions.callMe(req,res);
    expect(res.statusCode).to.equal(200)
    //console.log(res)
    done();
  });

 
});

describe('Label HTTP operations test - Mock server (Nock)', function(done) {
it('labelAdd', function (done) {

     const scope = nock('https://api.github.com') //Api url
    .post('/repos/prolike/gitlabelwizard/labels') //The url-path we are going to recieve HTTP request on
    .reply(function(uri, requestBody) { // The reply function
      console.log('path:', this.req)
      console.log('headers:', requestBody)
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
    var repoOwner = "prolike"
    var repoName = "gitlabelwizard"
    var token = "tokenasdasdasd"
    var labelName = "Action%20-%20awaiting%20feed-back"

    const scope = nock('https://api.github.com')
    .delete('/repos/prolike/gitlabelwizard/labels/'+labelName)
    .reply(204, function(uri, requestBody) {
      console.log('path:', this.req.path)
      console.log('headers:', this.req.headers)
      //console.log('headers:', )
      expect(requestBody).to.equal("")
      //expect(statusCode).to.equal(204)
    })
    .log(console.log);
    myFunctions.labelRemove(repoOwner,repoName,labelName,token);
    done();
  });
});



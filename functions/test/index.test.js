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
    var repoOwner = "prolike"
    var repoName = "gitlabelwizard"
    var token = "token"
    var labelObject = "{'name': 'test label', 'color': 'ffffff'}"

    //Mock server 
    const scope = nock('https://api.github.com') //Api url
    .post('/repos/prolike/gitlabelwizard/labels') //The url-path we are going to recieve HTTP request on
    .reply(function(uri, requestBody) { // The reply function
      //console.log('path:', this.req)
      // console.log('headers:', this.req.headers)
     // console.log('headers:', requestBody)
      expect(requestBody).to.equal(labelObject)
    }) 
    //.log(console.log)
    myFunctions.labelAdd(repoOwner,repoName,labelObject,token);
    done();
  });

it('labelRemove', function (done) {
    var repoOwner = "prolike"
    var repoName = "gitlabelwizard"
    var token = "token"
    var labelNameParsed = "Action%20-%20awaiting%20feed-back"
    var labelName = "Action - awaiting feed-back"

    //Mock server
    const scope = nock('https://api.github.com')
    .delete('/repos/prolike/gitlabelwizard/labels/'+labelNameParsed)
    .reply(204, function(uri, requestBody) {
<<<<<<< HEAD
      //console.log('path:', this.req.path)
      //console.log('headers:', this.req.headers)
      //expect()
    })
    //.log(console.log);
    myFunctions.labelRemove(repoOwner,repoName,labelName,token);
    //console.log(scope)
=======
    })
    //.log(console.log);
    myFunctions.labelRemove(repoOwner,repoName,labelName,token);
    //console.log(scope.interceptors[0])
    done();
  });
it('labelAdd check header', function (done) {
    var repoOwner = "prolike"
    var repoName = "gitlabelwizard"
    var token = "token"
    var labelObject = "{'name': 'test label', 'color': 'ffffff'}"

    //Mock server
   const scope = nock('https://api.github.com') //Api url
    .post('/repos/prolike/gitlabelwizard/labels') //The url-path we are going to recieve HTTP request on
    .reply(204, function(uri, requestBody) {
      var loctoken = this.req.headers.authorization;
      expect(loctoken).to.equal('Basic '+token)
      expect(requestBody).to.equal(labelObject)
    })
    //.log(console.log);
    myFunctions.labelAdd(repoOwner,repoName,labelObject,token);
    //console.log(scope.interceptors[0])
    done();
  });

it('labelRemove check header', function (done) {
    var repoOwner = "prolike"
    var repoName = "gitlabelwizard"
    var token = "token"
    var labelNameParsed = "Action%20-%20awaiting%20feed-back"
    var labelName = "Action - awaiting feed-back"

    //Mock server
   const scope = nock('https://api.github.com') //Api url
    .delete('/repos/prolike/gitlabelwizard/labels/'+labelNameParsed)
    .reply(204, function(uri, requestBody) {
      var loctoken = this.req.headers.authorization;
      expect(loctoken).to.equal('Basic '+token)
    })
    //.log(console.log);
    myFunctions.labelRemove(repoOwner,repoName,labelName,token);
    //console.log(scope.interceptors[0])
>>>>>>> 13f98459db3a933bc471586d3d1e86b48e0a06a2
    done();
  });
});


describe('Unit test', function(done) {
it('labelremove Parsing 1', function (done) {
    var labelName = "Its a test" 
    var expectedOutput = "Its%20a%20test"
    var result = myFunctions.labelParseRemove(labelName);
    expect(expectedOutput).to.equal(result);
    done();
  });

it('labelremove Parsing 2', function (done) {
    var labelName = " Its a  test with multiple spaces " 
    var expectedOutput = "%20Its%20a%20%20test%20with%20multiple%20spaces%20"
    var result = myFunctions.labelParseRemove(labelName);
    expect(expectedOutput).to.equal(result);
    done();
  });

it('labelremove Parsing 3', function (done) {
    var labelName = "Action - awaiting feed-back" 
    var expectedOutput = "Action%20-%20awaiting%20feed-back"
    var result = myFunctions.labelParseRemove(labelName);
    expect(expectedOutput).to.equal(result);
    done();
  });

it('getToken test', function (done) {
    var token = "xxx123" 
    var expectedOutput = "xxx123"
    process.env.TOKENPROLIKE = token
    var result = myFunctions.getTokenFromEnv();
    expect(expectedOutput).to.equal(result);
    done();
  });


});







const myFunctions = require('../index.js');
var expect = require('chai').expect
var sinon = require('sinon');
const httpMocks       = require('node-mocks-http');
const eventEmitter    = require('events').EventEmitter;
const nock = require('nock')
var request = require('request');
var apiKey = "itsatest"

// https://stackoverflow.com/questions/49352060/how-do-you-unit-test-a-firebase-function-wrapped-with-express
describe('API TEST - Testing our API entrypoint', function(done) {

  it('should return 403 (Missing api key) with a invalid request(GET) & no APIkey', function (done) {
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

  it('should return 403 (Invalid api key) with a invalid request(GET) & invalid APIkey', function (done) {
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

  it('should return 403 (Forbidden!) with a invalid request(GET) & valid APIkey', function (done) {
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

  it('should return 402 (Missing APIkey) with a valid request(POST) & no APIkey', function (done) {
    let options = {
      method: 'POST'};
    var req = httpMocks.createRequest(options);
    var res = httpMocks.createResponse({eventEmitter:eventEmitter});
    myFunctions.callMe(req,res);
    expect(res.statusCode).to.equal(403)
    //console.log(res)
    done();
  });

  it('should return 402 (Invalid APIkey) with a valid request(POST) & invalid api key', function (done) {
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

  it(' should return 202(OK) with a valid request(POST) & valid APIKey', function (done) {
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


// https://developer.github.com/v3/issues/labels/
describe('Github api HTTP operations test using Mock server (Nock)', function(done) {

  // Static variables
    var repoOwner = "prolike"
    var repoName = "gitlabelwizard"
    var token = "token"
    var labelObject = "{'name': 'test label', 'color': '#ffffff'}"

    
  it('should add a single label', function (done) {

     
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

  it('should remove a single label', function (done) {
      var labelNameParsed = "Action%20-%20awaiting%20feed-back"
      var labelName = "Action - awaiting feed-back"

      //Mock server
      const scope = nock('https://api.github.com')
      .delete('/repos/prolike/gitlabelwizard/labels/'+labelNameParsed)
      .reply(204, function(uri, requestBody) {
      })
      //.log(console.log);
      myFunctions.labelRemove(repoOwner,repoName,labelName,token);
      //console.log(scope.interceptors[0])
      done();
    });

  it('should add a single label with token authentication in request header', function (done) {
      
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
    
it('should remove a single label with token authentication in request header', function (done) {

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
    done();
  });
  
    //Testing labelAddAll() method with mocked server
  it('should add all labels from a array', function (done) {

    //Test arguments
    var repoOwner = "prolike"
    var repoName = "gitlabelwizard"
    var token = "tokenasdasdasd"
    var labelArray = [ {'name': 'test label', 'color': 'ffffff'}, {'name': 'test label2', 'color': 'ffffff'}, {'name': 'test label3', 'color': 'ffffff'} ]

    //Mock server
    const scope = nock('https://api.github.com') //Api url
    .post('/repos/prolike/gitlabelwizard/labels') //The url-path we are going to recieve HTTP request on
    .reply(function(uri, requestBody) { // The reply function
      //console.log('path:', this.req)
      //console.log('headers:', requestBody)
      expect(requestBody.name).to.equal(labelArray[0].name) //Expected input - we check on name instead of the whole object
    }) 
    //.log(console.log)
    myFunctions.labelsAddAll(repoOwner,repoName,labelArray,token); //Calling the labelsAddAll() method with the test arguments
    done();
  });
});


describe('Unit testing functions', function(done) {

it('should parse the removing labelName - Parsing empty spaces with %20', function (done) {
    var labelName = "Its a test" 
    var expectedOutput = "Its%20a%20test"
    var result = myFunctions.labelParseRemove(labelName);
    expect(expectedOutput).to.equal(result);
    done();
  });

it('(2) should parse the label - Parsing empty spaces with %20', function (done) {
    var labelName = " Its a  test with multiple spaces " 
    var expectedOutput = "%20Its%20a%20%20test%20with%20multiple%20spaces%20"
    var result = myFunctions.labelParseRemove(labelName);
    expect(expectedOutput).to.equal(result);
    done();
  });

it('(3) should parse the label - Parsing empty spaces with %20', function (done) {
    var labelName = "Action - awaiting feed-back" 
    var expectedOutput = "Action%20-%20awaiting%20feed-back"
    var result = myFunctions.labelParseRemove(labelName);
    expect(expectedOutput).to.equal(result);
    done();
  });

it('should loads token from environment variable', function (done) {
    var token = "xxx123" 
    var expectedOutput = "xxx123"
    process.env.TOKENPROLIKE = token
    var result = myFunctions.getTokenFromEnv();
    expect(expectedOutput).to.equal(result);
    done();
  });

it('should parse the adding labelColor - Parsing # with a empty space', function (done) {
    var labelObject = {"name": "test label", "color": "#ffffff"}
    var expectedOutput = {"name": "test label", "color": "ffffff"}
    var result = myFunctions.labelParseAdd(labelObject);
    expect(expectedOutput.color).to.equal(result.color);
    done();
  });

});







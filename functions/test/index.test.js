const myFunctions = require('../index.js');
var expect = require('chai').expect
var sinon = require('sinon');
const httpMocks       = require('node-mocks-http');
const eventEmitter    = require('events').EventEmitter;
const nock = require('nock')
var request = require('request');



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
  it('should parse the adding labelColor - Parsing # with a empty space', function (done) {
      var labelObject = {"name": "test label", "color": "#ffffff"}
      var expectedOutput = {"name": "test label", "color": "ffffff"}
      var result = myFunctions.labelParseAdd(labelObject.color);
      expect(expectedOutput.color).to.equal(result);
      done();
    });

  it('should loads api token from environment variable', function (done) {
      var expectedOutput = "itsatest"
      var result = myFunctions.getApiKeyFromEnv();
      expect(expectedOutput).to.equal(result);
      done();
    });

// it('(2)should loads token from environment variable', function (done) { //TODO
//     var token = "xxxasdasd123" 
//     var expectedOutput = "xxxasdasd123"
//     var token = "GITHUB_BASIC_AUTHENTICATION_TOKEN"
//     //var result = myFunctions.getBasicAuthTokenFromEnv();
//     //expect(expectedOutput).to.equal(result);

//     done();
//   });



  it('should parse the array of adding labelColor - Parsing # with a empty space', function (done) {
      var labelArr = [{"name": "test label", "color": "#f"},{"name": "test label", "color": "#xxxx"},{"name": "test label", "color": "#asdasd"}]
      var expectedOutputArr= [{"name": "test label", "color": "f"},{"name": "test label", "color": "xxxx"},{"name": "test label", "color": "asdasd"}]
      var result = myFunctions.labelAddFormatter(labelArr);
      expect(result[0].color).to.equal(expectedOutputArr[0].color);
      expect(result[1].color).to.equal(expectedOutputArr[1].color);
      expect(result[2].color).to.equal(expectedOutputArr[2].color);
      done();
    });

    it('should parse the array of removing labelColor - Parsing empty spaces with %20', function (done) {
      var labelArr = [{"name":" bu g"},{"name":"asd bug"},{"name":"b - asd -asdug"}]
      var expectedOutputArr= [{"name":"%20bu%20g"},{"name":"asd%20bug"},{"name":"b%20-%20asd%20-asdug"}]
      var result = myFunctions.labelRemoveFormatter(labelArr);
      expect(result[0].name).to.equal(expectedOutputArr[0].name);
      expect(result[1].name).to.equal(expectedOutputArr[1].name);
      expect(result[2].name).to.equal(expectedOutputArr[2].name);
      done();
    });


  it('should return a hardcoded labels for addition', function (done) {
      var expectedOutput1 = {"name":"Action - awaiting feed-back","color": "6EB82C","description":""}
      var expectedOutput2 = {"name":"Action - needs grooming","color": "009800","description":""}
      
      var result = myFunctions.getLabelsAddHardcoded();
      expect(expectedOutput1.name).to.equal(result[0].name);
      expect(expectedOutput2.name).to.equal(result[1].name);
      done();
    });

  it('should return a hardcoded labels for deletion', function (done) {
      var expectedOutput = {"name":"bug"}
      var result = myFunctions.getLabelsRemoveHardcoded();
      expect(expectedOutput.name).to.equal(result[0].name);
      done();
    });

// it('test', function (done) {
      
//       myFunctions.main("internshipprolike","xa","YW5zdHk5MzpTb2x2ZTk5R0g=");
//       done();
//     });

});




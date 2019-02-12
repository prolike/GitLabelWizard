const functions = require('firebase-functions');
const request = require('request');

apiKey = "itsatest"
apiUrl = "https://api.github.com";
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.callMe = functions.https.onRequest((request, response) => {
		var apiKey_param = request.params['api_key']
		//console.log(apiKey_param)
		if(apiKey_param === "undefined"){
			response.status(403);
			response.statusMessage = "Missing APIKEY!!"
			return response.send();
		}
		else if(apiKey_param !== apiKey){
			response.status(403);
			response.statusMessage = "INVALID APIKEY!!"
			return response.send();
		}
		else if (request.method !== 'POST'){
			 response.status(403);
			 return response.send('Forbidden request method!');
		}
		else{
			response.status(202)
			return response.send('OK'); 
		}
		response.status(200)
		return response.send('OK'); 
});

// Github HTTP label handler
exports.labelAdd = function(repoOwner,repoName, labelObject, token) {
	var urlLabel = apiUrl+'/repos/'+repoOwner+"/"+repoName+"/labels";
	const options = {
		method: 'POST',
	  url: urlLabel,
	  body: labelObject,
		json: true,
	  headers: {'Authorization':'Basic '+token}
	};

	request(options, function (error, response, body) {
	  //console.log('error:', error); // Print the error if one occurred
	  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  //console.log('body:', body); // Print the HTML for the Google homepage.
	});
} 

exports.labelRemove = function(repoOwner,repoName, labelName, token) {

    var labelNameParsed = this.labelParseRemove(labelName);
    var urlLabel = apiUrl+'/repos/'+repoOwner+"/"+repoName+"/labels/"+labelNameParsed;
    const options = {
      method: 'DELETE',
      url: urlLabel,
      headers: {'Authorization':'Basic '+token}
    };
	request(options, function (error, response, body) {
	  //console.log('error:', error); // Print the error if one occurred
	  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  //console.log('body:', body); // Print the HTML for the Google homepage.

	});
} 

// Local functions
exports.getTokenFromEnvDev = function() {
	var token = process.env.TOKENDEV;
	return token;
} 

exports.getTokenFromEnv = function() {
	var token = process.env.TOKENPROLIKE;
	return token
} 



exports.getApiKeyFromEnv = function() {
	return null;
} 

//Adds an array of labels to a GitHub repository
exports.labelsAddAll = function(repoOwner,repoName, labelArray, token) {
	//Loops through the given array of labels and uses each lable in the labelAdd() method
	//console.log(labelArray);
	for(var label of labelArray){
		//console.log(label);
		exports.labelAdd(repoOwner, repoName, label, token);
	}
	/*labelArray.forEach(function(label){
		console.log(label);
		exports.labelAdd(repoOwner, repoName, label, token);
	});*/
} 

exports.labelsRemoveAll = function(repoOwner,repoName, labelArray, token) {
	return null;
} 

exports.labelParseRemove = function(labelName) {
    return labelName.replace(/ /g, "%20");

} 


exports.labelParseAdd = function(jsonObject) {
	jsonObject.color = jsonObject.color.replace("#", "");
    return jsonObject
} 
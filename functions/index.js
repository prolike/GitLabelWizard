const functions = require('firebase-functions');
const request = require('request');

apiUrl = "https://api.github.com";
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.callMe = functions.https.onRequest((request, response) => {
		//console.log(request)
		//console.log(response)
		if (request.method !== 'POST'){
			 response.status(403);
			 return response.send('Forbidden!');
		}
		response.status(200)
		return response.send('OK'); 
});

exports.labelAdd = function(repoOwner,repoName, labelObject, token) {
	var urlLabel = apiUrl+'/repos/'+repoOwner+"/"+repoName+"/labels";
	const options = {
	  method: 'POST',
	  url: urlLabel,
	  body: labelObject
	};

	request(options, function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log('body:', body); // Print the HTML for the Google homepage.
	});
} 

exports.labelRemove = function(repoOwner,repoName, labelName, token) {
	var urlLabel = apiUrl+'/repos/'+repoOwner+"/"+repoName+"/labels/"+labelName;
	const options = {
	  method: 'DELETE',
	  url: urlLabel
	};

	request(options, function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	});
} 

exports.getTokenFromEnv = function() {
	return null;
} 
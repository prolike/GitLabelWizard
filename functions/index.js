const functions = require('firebase-functions');
const request = require('request');


apiUrl = "https://api.github.com";
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.callMe = functions.https.onRequest((request, response) => {
		var apiKey_param = request.query['api_key']
		var apiKey = "itsatest"
		console.log(request.query) 
		try{
			test = getApiKeyFromEnv()
			apiKey = test
		}
		catch(error){
			console.error(error);
		}
		finally{
		//console.log(apiKey_param)
		if(apiKey_param === "undefined"){
			response.status(403);
			response.statusMessage = "Missing APIKEY!!"
			return response.send("Missing APIKEY!!");
		}
		else if(apiKey_param !== apiKey){
			response.status(403);
			response.statusMessage = "INVALID APIKEY!!"
			return response.send("INVALID APIKEY");
		}
		else if (request.method !== 'POST'){
			 response.status(403);
			 response.statusMessage = "INVALID APIKEY!!"
			 return response.send('Forbidden request method!');
		}
		else if(request.method === 'POST' && apiKey_param === apiKey){
			var body = request.body
			var repoOwner = body.repository.owner.login
			var repoName = body.repository.name
			var token = "tokenasd"
			//main(repoOwner,repoName,token)
			response.status(202)
			return response.send('OK'); 
		}
		}
});

// Main
exports.main = function(repoOwner, repoName,token) {
	var arrLabelsAdd = getLabelsRemoveHardcoded()
	var arrLabelsRemove = getLabelsAddHardcoded()
	for(labelObject in arrLabelsRemove){
		labelRemove(repoOwner,repoName,labelObject.name,token)
	}
	for(labelObject in arrLabelsAdd){
		labelAdd(repoOwner,repoName,labelObject,token)
	}
}

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

    var urlLabel = apiUrl+'/repos/'+repoOwner+"/"+repoName+"/labels/"+labelName;
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

exports.getBasicAuthTokenFromEnv = function() {
	var token = functions.config().github.authkey; //https://firebase.google.com/docs/functions/config-env
	return token
} 

exports.getApiKeyFromEnv = function() {
	var token = functions.config().firebase.apikey; //https://firebase.google.com/docs/functions/config-env
	return token
} 

//Adds an array of labels to a GitHub repository
exports.labelsAddAll = function(repoOwner,repoName, labelArray, token) {
	//Loops through the given array of labels and uses each lable in the labelAdd() method
	//console.log(labelArray);
	for(var label of labelArray){
		//console.log(label);
		this.labelAdd(repoOwner, repoName, label, token);
	}
	/*labelArray.forEach(function(label){
		console.log(label);
		exports.labelAdd(repoOwner, repoName, label, token);
	});*/
} 

exports.labelsRemoveAll = function(repoOwner,repoName, labelArray, token) {
	//Loops through the given array of labels and uses each in the labelRemove() method
	for(var label of labelArray){
		this.labelRemove(repoOwner, repoName, label.name, token);
	}
} 



exports.labelAddFormatter = function(arrLabels) {
    for(var label of arrLabels){
    	label.color = exports.labelParseAdd(label.color)
    }
    return arrLabels
} 

exports.labelRemoveFormatter = function(arrLabels) {
    for(var label of arrLabels){
    	label.name = exports.labelParseRemove(label.name)
    }
    return arrLabels
} 


exports.labelParseRemove = function(labelName) {
    return labelName.replace(/ /g, "%20");
} 


exports.labelParseAdd = function(labelColor) {
    return labelColor.replace("#", "");
} 



exports.getLabelsAddHardcoded = function() {
	var addLabels = [{"name":"Action - awaiting feed-back","color": "6EB82C","description":""},
					 {"name":"Action - needs grooming","color": "009800","description":""},
					 {"name":"Briefing","color": "C7DEF8","description":""},
					 {"name":"Prio 1 - must have","color": "E83D0F","description":""},
					 {"name":"Prio 2 - should have","color": "EB6420","description":""},
					 {"name":"Prio 3 - could have","color": "E8850F","description":""},
					 {"name":"Prio 4 - won't have","color": "E8A80F","description":""},
					 {"name":"Size 1 - small","color": "20B4E5","description":""},
					 {"name":"Size 2 - medium","color": "208FE5","description":""},
					 {"name":"Size 3 - large","color": "0052CC","description":""},
					 {"name":"Size 4 - too big","color": "100B6B","description":""},
					 {"name":"Status - duplicate","color": "111111","description":""},
					 {"name":"Status - to do","color": "EDEDED","description":""},
					 {"name":"Status - in progress","color": "EDEDED","description":""},
					 {"name":"Status - up next","color": "EEEEEE","description":""},
					 {"name":"Tech-challenge","color": "5319E7","description":""}]
 return addLabels
} 

exports.getLabelsRemoveHardcoded = function() {
	var removeLabels = [{"name":"bug"},
						{"name":"duplicate"},
						{"name":"enhancement"},
						{"name":"good first issue"},
						{"name":"help wanted"},
						{"name":"invalid"},
						{"name":"question"},
						{"name":"wontfix"}]
	return removeLabels
} 
const functions = require('firebase-functions');
const request = require('request');

// Local variables
apiUrl = "https://api.github.com";


// HTTP ENTRY POINT
// REQUEST METHOD : POST
// REQUIRE VALID API KEY
exports.callMe = functions.https.onRequest((request, response) => {
        var apiKey_param = request.query['api_key']
        var apiKey = exports.getApiKeyFromEnv()
        var token = exports.getBasicAuthTokenFromEnv()
        
        if (request.method !== 'POST'){
             response.status(401);
             response.statusMessage = "Forbidden request method"
             return response.send('Forbidden request method');
        }
        else if(apiKey_param === undefined || apiKey_param === ""){
            response.status(401);
            response.statusMessage = "Missing API key"
            return response.send("Missing API key");
        }
        else if(apiKey_param !== apiKey){
            response.status(401);
            response.statusMessage = "Invalid API key"
            return response.send("Invalid API key");
        }
        
        else if(request.method === 'POST' && apiKey_param === apiKey){
            var body = JSON.parse(request.body.payload)
            if(exports.validRequest(body)){
                var repoOwner = body.repository.owner.login
                var repoName = body.repository.name
                exports.main(repoOwner,repoName,token)
                response.status(201)
                return response.send('OK'); 
            }
            else{
              if(exports.firstRequest(body))
              response.status(200)
              return response.send('READY!');
            }
           
        }
        response.status(500)
        return response.send('?'); 
});

// Main
exports.main = function(repoOwner, repoName,token) {

    var arrLabelsRemoveParsed = exports.labelRemoveFormatter(exports.getLabelsRemoveHardcoded())
    var arrLabelsAddParsed = exports.labelAddFormatter(exports.getLabelsAddHardcoded())
    for(var labelObject2 of arrLabelsAddParsed){
        exports.labelAdd(repoOwner,repoName,labelObject2,token)
    }
    for(var labelObject of arrLabelsRemoveParsed){
        exports.labelRemove(repoOwner,repoName,labelObject.name,token)
    }

}

exports.firstRequest = function(body){
  try{
    var zen = body.zen
    return true
  }
  catch(exp){
    console.log(exp)
    return false
  }
}

exports.validRequest = function(body){
  try{
    var repoOwner = body.repository.owner.login
    return true
  }
  catch(exp){
    console.log(exp)
    return false
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
      headers: {'Content-type': 'application/vnd.github.symmetra-preview+json','user-agent':'node-js2','authorization':'Basic '+token}
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
      headers: {'Content-type': 'application/vnd.github.symmetra-preview+json','user-agent':'node-js2','authorization':'Basic '+token}
    };
    request(options, function (error, response, body) {
  //  console.log('error:', error); // Print the error if one occurred
   // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
   // console.log('body:', body); // Print the HTML for the Google homepage.

    });
} 


exports.getBasicAuthTokenFromEnv = function() {
    var token = "AUTH" 
    try{
    token = functions.config().github.authkey; //https://firebase.google.com/docs/functions/config-env
    }
    catch(e){
          console.error("TOKEN CANT BE LOADED FROM FIREBASE ENV")
    }
    return token
} 


exports.getApiKeyFromEnv = function() {
    var token = "itsatest"
    try{
    token = functions.config().fb.apikey; //https://firebase.google.com/docs/functions/config-env
    }
    catch (e) {
           console.error("API KEY CANT BE LOADED FROM FIREBASE ENV")
    }
    return token
} 

//Adds an array of labels to a GitHub repository
exports.labelsAddAll = function(repoOwner,repoName, labelArray, token) {
    //Loops through the given array of labels and uses each lable in the labelAdd() method
    for(var label of labelArray){
        this.labelAdd(repoOwner, repoName, label, token);
    }
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
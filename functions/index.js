const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.callMe = functions.https.onRequest((request, response) => {
	console.log(request)
	console.log(response)
		
		var body_json = getInfo(request.body)
		response.status(200)
		return response.send('test'); //det vi skal ha løst er at finde ud af hvordan vi kan få de ttil at fungere
	});



function getInfo(body){
	return body
}


function makeUppercase(data){
	return data
}

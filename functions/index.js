const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.callMe = functions.https.onRequest((request, response) => {
	console.log(request)
		if (request.method != 'POST'){
			return response.status(403).send('Forbidden!');
		}
		var body_json = getInfo(request.body)
		return response.status(200).send('test');
	});



function getInfo(body){
	return body
}


function makeUppercase(data){
	return data
}
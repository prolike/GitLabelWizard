const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.callMe = functions.https.onRequest((request, response) => {
		//console.log(request)
		//console.log(response)

		if (request.method !== 'POST'){
			 response.status(403);
			 return response.send('Forbidden!');
		}
		response.status(200)
		return response.send('test'); 
	});



function getInfo(body){
	return body
}


function makeUppercase(data){
	return data
}

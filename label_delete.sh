#!/bin/bash

function delete_labels() {
	url = $1
	token = $2

	echo $url
	echo $token

	# Deleting standard labels in github via cURL using http://api.github.com v3
	for label in "bug" "duplicate" "enhancement" "good%20first%20issue" "help%20wanted" "invalid" "question" "wontfix"
	do
		echo Label: \""$label"\"
		label_url="$url/$label"
		echo label_url

		curl -X DELETE \
		  -H 'authorization: Basic "'"$token"'"' \
		  $label_url
	done
}
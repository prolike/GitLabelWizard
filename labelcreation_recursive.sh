#!/bin/bash

# include parse_yaml function
. parse_yaml.sh

# read yaml file
eval $(parse_yaml .label.yml "file_")

for i in 1 2 3
do

	yml_name=$file_label1_name
	yml_color=£file_label1_color
	yml_description=file_label1_description


	echo $yml_name
	echo $yml_color
	echo $yml_description
	# access yaml content
	name=$yml_name
	color=$yml_color
	description=$yml_description
	echo $name
	echo $color
	echo $description

	read -p 'Username ' usrname
	read -p 'Reposotirty name: ' repo
	read -p 'Basic: ' token

	url='https://api.github.com/repos/'$usrname'/'$repo'/labels'

	echo $url
	#Do curl POST with json data
	curl -X POST \
	-H 'authorization: Basic "'"$token"'"' \
	-H 'content-type: application/vnd.github.symmetra-preview+json' \
	-d '{"name":"'"$name"'","color":"'"$color"'","description":"'"$description"'"}' $url
done
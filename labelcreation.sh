#!/bin/bash


# include parse_yaml function
. parse_yaml.sh

# include delete_label function
. label_delete.sh

# read yaml file
eval $(parse_yaml .label.yml "config_")

# access yaml content
name=$config_label1_name
color=$config_label1_color
description=$config_label1_description

read -p 'Username ' usrname
read -p 'Reposotirty name: ' repo
read -p 'Basic: ' token

url='https://api.github.com/repos/'$usrname'/'$repo'/labels'
 
echo $url
delete_labels usrname repo token

# Deleting standard labels in github via cURL using http://api.github.com v3



# Inserting labels in github with cURL  using http://api.github.com v3
curl -X POST \
  -H 'authorization: Basic "'"$token"'"' \
  -H 'content-type: application/vnd.github.symmetra-preview+json' \
  -d '{"name":"'"$name"'","color":"'"$color"'","description":"'"$description"'"}' $url


#!/bin/bash

# include parse_yaml function
. parse_yaml.sh

# read yaml file
eval $(parse_yaml .label.yml "config_")

# access yaml content
name=$config_label1_name
color=$config_label1_color
description=$config_label1_description

#Doing curl POST with json data
curl -X POST \
  -H 'authorization: Basic YW5zdHk5MzpTb2x2ZTk5R0g=' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{"name":"'"$name"'","color":"'"$color"'","description":"'"$description"'"}' https://api.github.com/repos/prolike/gitlabelwizard/labels

read -rn1
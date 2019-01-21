#!/bin/bash

# include parse_yaml function
. parse_yaml.sh

# read yaml file
eval $(parse_yaml zconfig.yml "config_")

# access yaml content
name=$config_label1_name
color=$config_label1_color
description=$config_label1_description

curl --request POST \
  --url https://api.github.com/repos/prolike/dilly-dally/labels \
   -u Ansty93
  --header 'cache-control: no-cache' \
  --header 'content-type: application/json' \
  --header 'postman-token: 78c3500f-1286-bdbd-ab8f-0ba65bd5378f' \
  --data '{"name":'$name',"color":'$color',"description":'$description'}'

read -rn1
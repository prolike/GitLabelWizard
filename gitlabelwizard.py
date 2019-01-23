import json
import os
from botocore.vendored import requests

## TODO
## 1. Replace repoowner with "prolike"
repo_owner = "ansty93"

token = os.environ['basic_token']

# Deletion labels 
## Empty space replaced with %20, since we will use these labels to do http 
## request, and we cant have empty space in url 
arr_labels_deletion = ["bug","duplicate","enhancement","good%20first%20issue",
"help%20wanted","invalid","question","wontfix"]

# Creation labels
arr_labels_creation =  
[{"name":"Action - awaiting feed-back","color": "6EB82C","description":""},
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

def label_deletion(repo_name,label,token):
    url = "https://api.github.com/repos/"+repo_owner+"/"+repo_name+"/labels/"+label
    headers = {'Authorization':'Basic '+token}
    r = requests.delete(url,headers=headers)
    return r

def label_creation(repo_name,label,token):
    url = "https://api.github.com/repos/"+repo_owner+"/"+repo_name+"/labels"
    #label = {"name":"pythonboy3222asd222222","color":"ffffff","description":"Its a test"}
    headers = {'Content-type': 'application/vnd.github.symmetra-preview+json',
                'Authorization':'Basic '+token}
    r = requests.post(url, json=label,headers=headers)
    return r
    
# The main func
def lambda_handler(event, context):
    
    #repo_name = event['queryStringParameters']['repo_name']
    repo_name = event['repo_name']
    print(token)
    try:
        for label in arr_labels_deletion:
            r = label_deletion(repo_name,label,token)
        for label in arr_labels_creation:
            r = label_creation(repo_name,label,token)
    except Exception as e:
         return {
        'statusCode': 400,
        'body': json.dumps(e)
        }
    finally:
        return {
            'statusCode': 200,
            'body': json.dumps("200 OK - Label smoothly created and deleted")
        }

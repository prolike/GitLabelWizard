import json
import os
from botocore.vendored import requests

## TODO
## 1. Replace repoowner with "prolike"
repo_owner = "internshipprolike"

# Authentication token in environment variables (BASIC)
token = os.environ['basic_token']

filename_label_creation = "labels_creation.json"
filename_label_deletion = "labels_deletion.json"

def load_labels_from_json(filename):
    with open(filename) as f:
        arr_json = json.load(f)
    return arr_json
    
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
    repo_name = ""
    try:
        body = json.loads(event['body'])
        repo_name = body["repository"]["name"]
        action = str(body["action"])
        if action != "created":
            raise Exception("ACTION IS NOT CREATED")
        else:
            
            arr_labels_creation = load_labels_from_json(filename_label_creation)
            arr_labels_deletion = load_labels_from_json(filename_label_deletion)
            
            for label in arr_labels_deletion:
                label["name"] = label["name"].replace(" ","%20")
                
            for label in arr_labels_deletion:
                r = label_deletion(repo_name,label["name"],token)
                
            for label in arr_labels_creation:
                r = label_creation(repo_name,label,token)
    except Exception as e:
        return {
            'statusCode': 400,
            'body': json.dumps(str(e))
        }
    else:
        return {
            'statusCode': 200,
            'body': json.dumps("OK")
        }

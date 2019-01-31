import json
import os
#from botocore.vendored import requests
from ruamel.yaml import YAML
import requests 

api_url = "https://api.github.com"
api_url_raw = "https://raw.githubusercontent.com"
label_filename = ".labels.yml"
#Prevents execution of arbitary code from YAML file - might not be needed
yaml = YAML(typ="safe")
token = os.environ["BASIC_TOKEN_ANSTY93"]
headers = {'Content-type': 'application/vnd.github.symmetra-preview+json',
                'Authorization':'Basic '+token}

def does_labels_exist(repo_owner,repo_name):
    r = requests.get(api_url+"/repos"+"/"+repo_owner+"/"+repo_name+"/commits?path="+label_filename,headers=headers)
    if r.json() != []:
        return True
    else:
        return False

def get_latest_sha_for_label(repo_owner,repo_name):
    r = requests.get(api_url+"/repos"+"/"+repo_owner+"/"+repo_name+"/commits?path="+label_filename,headers=headers)
    return r.json()



# Gets a list of all labels currently in the repository, returns a JSON dict
def get_all_labels_for_repo(repo_owner,repo_name):
    r = requests.get(api_url+"/repos"+"/"+repo_owner+"/"+repo_name+"/labels",headers=headers)
    return r.json()
    
# Gets a list of all labels currently in the repository, returns a JSON dict
def get_all_issues_for_repo(repo_owner,repo_name):
    r = requests.get(api_url+"/repos"+"/"+repo_owner+"/"+repo_name+"/issues",headers=headers)
    return r.json()

def get_latest_yml_as_json(repo_owner,repo_name,sha):
    r = requests.get(api_url_raw+"/"+repo_owner+"/"+repo_name+"/"+sha+"/"+label_filename,headers=headers)
    json = parse_yml_to_json(r.text)
    arr_labels = []
    for key in json:
        for label in json[key]:
            arr_labels.append(label["label"])
    return arr_labels

def parse_yml_to_json(string):
    return yaml.load(string)

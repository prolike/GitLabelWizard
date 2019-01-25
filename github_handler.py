# github_handler.py

import label_handler
#from botocore.vendored import requests
import requests
import os
import json

api_url = "https://api.github.com"
file_url = "https://raw.githubusercontent.com"
os.environ["BASIC_TOKEN"] = "YW5zdHk5MzpTb2x2ZTk5R0g"
# Authentication token in environment variables (BASIC)
token = os.environ['BASIC_TOKEN']
label_config_filename = ".labels.yml"


# Load the sha hash from the latest commit for a given file
def get_latest_sha_for_file(url,filename):
    r = requests.get(url+"/commits?"+filename)
    sha = r.json()[0]["sha"]
    return sha

def get_all_repos_in_organization(organization_name):
    url = api_url+"/orgs/"+organization_name+"/repos"
    r = requests.get(url)
    return r


def insert_labels_repo(repo_owner,repo_name,arr_labels):
    for label in arr_labels:
        label_handler.label_insert(api_url,repo_owner,repo_name,label,token)

def delete_labels_repo(repo_owner,repo_name,arr_labels):
    for label in arr_labels:
        label_handler.label_remove(api_url,repo_owner,repo_name,label,token)

def read_yml_from_repo(repo_owner,repo_name):
    r = requests.get(file_url+"/"+repo_owner+"/"+repo_name+"/master/"+label_config_filename)
    return r

# def update_single_repo(repo_owner,repo_name,arr_labels):
#     for label in arr_labels["label_creation"]:
#         label_handler.label_insert(repo_name,label["name"],token)

#     for label in arr_labels["label_deletion"]:
#         r = githublabel_deletion(repo_name,label["name"],token)
#     
# github_handler.py

import label_handler
#from botocore.vendored import requests
import requests
import os
import json

api_url = "https://api.github.com"
raw_url = "https://raw.githubusercontent.com"
# Authentication token in environment variables (BASIC)
token = os.environ['BASIC_TOKEN']

# Gets the commits for a given file, returns a JSON dict
def get_commits_for_file(repo_owner,repo_name,filename):
    r = requests.get(api_url+"/repos"+"/"+repo_owner+"/"+repo_name+"/commits?path="+filename)
    return r.json()

# Gets a list of all labels currently in the repository, returns a JSON dict
def get_all_labels_for_repo(repo_owner,repo_name):
    r = requests.get(api_url+"/repos"+"/"+repo_owner+"/"+repo_name+"/labels")
    return r.json()

# Gets a list of all labels currently in the repository, returns a JSON dict
def get_all_issues_for_repo(repo_owner,repo_name):
    r = requests.get(api_url+"/repos"+"/"+repo_owner+"/"+repo_name+"/issues")
    return r.json()

# Load the sha hash from the latest commit for a given file
def get_latest_sha(json):
    sha = json[0]["sha"]
    return sha

# Inserts desired labels into the repository
def insert_labels_repo(repo_owner,repo_name,arr_labels):
    for label in arr_labels:
        label_handler.label_insert(api_url,repo_owner,repo_name,label,token)

# Deletes undesired labels from the repository
def delete_labels_repo(repo_owner,repo_name,arr_labels):
    for label in arr_labels:
        formatted_label = format_deletion_labels(label)
        print(formatted_label)
        label_handler.label_remove(api_url,repo_owner,repo_name,formatted_label,token)

# Replaces space with '%20' to make it URL friendly 
def format_deletion_labels(label):
     formatted_label = label.replace(" ","%20")
     return formatted_label

# Reads the raw content of a given file, returns it as text
def read_yml_from_repo(repo_owner,repo_name,filename):
    r = requests.get(raw_url+"/"+repo_owner+"/"+repo_name+"/master/"+filename)
    return r.text

# def update_single_repo(repo_owner,repo_name,arr_labels):
#     for label in arr_labels["label_creation"]:
#         label_handler.label_insert(repo_name,label["name"],token)

#     for label in arr_labels["label_deletion"]:
#         r = githublabel_deletion(repo_name,label["name"],token)
#     

# def get_all_repos_in_organization(organization_name):
#     url = api_url+"/orgs/"+organization_name+"/repos"
#     r = requests.get(url)
#     return r
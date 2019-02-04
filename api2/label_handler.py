# label_handler.py
# Author : Ansty93 - Ansty93@gmail.com
import json
import os
from botocore.vendored import requests

api_url = "https://api.github.com"
token = os.environ["BASIC_TOKEN_ANSTY93"]
token2 = os.environ["BASIC_TOKEN_PROLIKE"]


def insert_all_labels(repo_owner,repo_name,arr_label):
    for label in arr_label:
        label = format_insterting_labels(label)
        label_insert(repo_owner,repo_name,label)

def remove_all_labels(repo_owner,repo_name,arr_label):
    for label in arr_label:
        label = format_deletion_labels(label)
        label_remove(repo_owner,repo_name,label)

def label_remove(repo_owner,repo_name,label):
    url = api_url+"/repos/"+repo_owner+"/"+repo_name+"/labels/"+label
    headers = {'Authorization':'Basic '+token}
    r = requests.delete(url,headers=headers)
    return r

def label_insert(repo_owner,repo_name,label):
    url = api_url+"/repos/"+repo_owner+"/"+repo_name+"/labels"
    #print(url)
    #label = {"name":"pythonboy3222asd222222","color":"ffffff","description":"Its a test"}
    headers = {'Content-type': 'application/vnd.github.symmetra-preview+json',
                'Authorization':'Basic '+token}
    r = requests.post(url, json=label,headers=headers)
    return r


# Replaces space with '%20' to make it URL friendly 
def format_deletion_labels(label):
     formatted_label = label.replace(" ","%20")
     return formatted_label

# Replaces space with '%20' to make it URL friendly 
def format_insterting_labels(label):
     label["color"] = label["color"].replace("#","")
     return label

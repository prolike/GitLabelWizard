# label_handler.py
# Author : Ansty93 - Ansty93@gmail.com
import json
#from botocore.vendored import requests
import requests

# Label handler - deletes and inserts labels for a GitHub repository

def label_remove(api_url,repo_owner,repo_name,label,token):
    url = api_url+"/repos/"+repo_owner+"/"+repo_name+"/labels/"+label
    headers = {'Authorization':'Basic '+token}
    r = requests.delete(url,headers=headers)
    return r

def label_insert(api_url,repo_owner,repo_name,label,token):
    url = api_url+"/repos/"+repo_owner+"/"+repo_name+"/labels"
    #print(url)
    #label = {"name":"pythonboy3222asd222222","color":"ffffff","description":"Its a test"}
    headers = {'Content-type': 'application/vnd.github.symmetra-preview+json',
                'Authorization':'Basic '+token}
    r = requests.post(url, json=label,headers=headers)
    return r



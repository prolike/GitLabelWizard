# file_handler.py
# Author: Ansty93 - ansty93@gmail.com
# Author: cph-lh
import json
from ruamel.yaml import YAML
# Handling the files, saving and loading

#Prevents execution of arbitary code from YAML file - might not be needed though
yaml = YAML(typ="safe")

def load_sha():
    try:
        f = open("commitid.txt","r")
        sha=f.read()
    except FileNotFoundError:
        f = open("commitid.txt","w+")
        f.close()
        return None
    else:
        return sha

def save_sha(sha):
    f = open("commitid.txt","w+")
    f.write(sha)
    f.close()


def load_labels_from_json_file(filename):
    with open(filename) as f:
        arr_json = json.load(f)
    return arr_json

#TODO    
def format_deletion_labels(arr_json):
     label["name"] = label["name"].replace(" ","%20")

#Reads a YAML file and returns a JSON string
def yml_to_json(yml):
    with open(yml) as f:
        json_string = json.dumps(yaml.load(f))
#        print("SUCCESS")
    return json_string

def save_yml(yml):
    f = open(".labels.yml","w+")
    f.write(yml)
    f.close()

        
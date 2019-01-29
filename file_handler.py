# file_handler.py
# Author: Ansty93 - ansty93@gmail.com
import json
from ruamel.yaml import YAML

# Handling the files, saving and loading
sha_filename = "SHA.txt"
yml_filename = ".labels.yml"

#Prevents execution of arbitary code from YAML file - might not be needed
yaml = YAML(typ="safe")

def load_sha():
    try:
        f = open(sha_filename,"r")
        sha=f.read()
    except FileNotFoundError:
        f = open(sha_filename,"w+")
        f.close()
        return None
    else:
        return sha

def save_sha(sha):
    f = open(sha_filename,"w+")
    f.write(sha)
    f.close()

# Replaces space with '%20' to make it URL friendly 
def format_deletion_labels(arr_json):
     label["name"] = label["name"].replace(" ","%20")

#Converts YML text into JSON
def parse_yml_to_json(string):
    return yaml.load(string)

#def load_labels_from_json_file(filename):
#    with open(filename) as f:
#        arr_json = json.load(f)
#    return arr_json

#Reads a YAML file and returns a JSON string
#def load_json_from_yml_file():
#    with open(yml_filename) as f:
#        json_string = json.dumps(yaml.load(f))
#        print("SUCCESS")
#    return json_string


#def save_yml(yml):
#    f = open(".labels.yml","w+")
#    f.write(yml)
#    f.close()

        
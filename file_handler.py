# file_handler.py
# Author: Ansty93 - ansty93@gmail.com
import json
# Handling the files, saving and loading

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


        
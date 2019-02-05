import json
import os
import label_handler
from botocore.vendored import requests

api_key_local = os.environ['API_KEY']

# The main func
def lambda_handler(event, context):
        body = event['body']
        repo_owner = body["repo_owner"]
        repo_name = body["repo_name"]
        arr_label = body["labels"]
        label_handler.insert_all_labels(repo_owner,repo_name,arr_label)
    

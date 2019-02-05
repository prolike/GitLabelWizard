import json
import os

# Local files import
import github_handler as gh
import safe_delete as sf
import api_service

label_name = ".labels.yml"
#api_key_github = os.environ['API_KEY_GITHUB']
#api_key_2 = os.environ['API_KEY_2']
repo_name = "zz9"
repo_owner = "internshipprolike"
        

def format_labels(arr):
    arr_formatted = []
    for label in arr:
        arr_formatted.append(label["name"])
    return arr_formatted
    
def get_labels_from_issues(arr):
    arr_formatted = []
    for item in arr:
        for label in item["labels"]:
            arr_formatted.append(label["name"])
    return arr_formatted
    

    
# The main func
def lambda_handler(event, context):
    try:
        #body = json.loads(event['body'])
        #repo_name = body["repository"]["name"]
        #repo_owner = body["repository"]["owner"]["login"]
        commit = gh.get_latest_sha_for_label(repo_owner,repo_name)
        sha = commit[0]["sha"]
        arr_labels_insert = gh.get_latest_yml_as_json(repo_owner,repo_name,sha)
        arr_labels_insert_formatted = format_labels(arr_labels_insert)
        all_labels = gh.get_all_labels_for_repo(repo_owner,repo_name)
        arr_labels_insert_formatted = format_labels(arr_labels_insert)
        all_labels_formatted = format_labels(all_labels)
        all_issues = gh.get_all_issues_for_repo(repo_owner,repo_name)
        all_issues_labels_formatted = get_labels_from_issues(all_issues)
        safe_delete_labels = sf.get_safe_delete(arr_labels_insert_formatted,all_labels_formatted,all_issues_labels_formatted)
        api_service.api_post(repo_owner,repo_name,arr_labels_insert)
    except Exception as e:
        print(e)
        return {
            'statusCode': 404,
            'body': json.dumps(str(e))
        }
    else:
        return {
            'statusCode': 200,
            'body': json.dumps(arr_labels_insert)
        }


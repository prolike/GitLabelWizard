import json
import os

# Local files import
import file_handler
import github_handler

repo_owner = "internshipprolike"
repo_name = "test13"

def is_modified(sha):
    local_sha = file_handler.load_sha()
    return sha != local_sha

# The main func
def lambda_handler(event, context):
    repo_name = ""
    try:
        body = json.loads(event['body'])
        repo_name = body["repository"]["name"]
        repo_owner = body["repository"]["owner"]["login"]
        action = body["action"]
        if action != "created":
            raise Exception("ACTION IS NOT *CREATED* - ABORTING MISSION")
        else:
        	#arr_labels = file_handler.
            github_handler.update_single_repo(repo_owner,repo_name)
    except Exception as e:
        return {
            'statusCode': 400,
            'body': json.dumps(str(e))
        }
    else:
        return {
            'statusCode': 200,
            'body': json.dumps("OK")
        }

def test():
    arr_labels = file_handler.load_labels_from_json_file("labels_creation.json")
    arr_labels_delete = file_handler.load_labels_from_json_file("labels_deletion.json")
    github_handler.insert_labels_repo(repo_owner,repo_name,arr_labels)
    github_handler.delete_labels_repo(repo_owner,repo_name,arr_labels_delete)

def test_yml():
    yml = github_handler.read_yml_from_repo(repo_owner,repo_name)
    print(yml.text)
    file_handler.save_yml(yml.text)
    print(file_handler.yml_to_json(".labels.yml"))

test_yml()



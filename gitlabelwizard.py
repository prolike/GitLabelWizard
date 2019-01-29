import json
import os

# Local files import
import file_handler
import github_handler

label_name = ".labels.yml"

#Dev variable
repo_owner = "internshipprolike"
repo_name = "asdx"


def is_modified(sha):
    local_sha = file_handler.load_sha()
    return sha != local_sha


# The main func
def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        repo_name = body["repository"]["name"]
        repo_owner = body["repository"]["owner"]["login"]
        label_json = get_commits_for_file(repo_owner,repo_name,label_name)
        if not label_json:
            raise Exception("ERROR: .labels.yml missing")
        else:
            text = github_handler.read_yml_from_repo(repo_owner,repo_name,label_name)
            json = file_handler.parse_yml_to_json(text)
            arr_labels = []
            for key in json:
                if key != "behavior":
                    for val in json[key]:
                        val["label"]["color"] = val["label"]["color"].replace("#","")
                        arr_labels.append(val["label"])

    except Exception as e:
        return {
            'statusCode': 404,
            'body': json.dumps(str(e))
        }
    else:
        return {
            'statusCode': 200,
            'body': json.dumps("OK")
        }


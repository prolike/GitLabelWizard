import json
import os

# Local files import
import file_handler
import github_handler


label_name = ".labels.yml"
#api_key_local = os.environ['API_KEY']

repo_name = "zz9"
repo_owner = "internshipprolike"

def is_modified(sha):
    local_sha = file_handler.load_sha()
    return sha != local_sha

def get_all_labels(repo_owner,repo_name):
    labels_json = github_handler.get_all_labels_for_repo(repo_owner,repo_name)
    label_list = []
    for label in labels_json:
        label_list.append(label["name"])
    return label_list

def get_all_labels_for_all_issues(repo_owner,repo_name):
    issues = github_handler.get_all_issues_for_repo(repo_owner,repo_name)
    arr_labels = []
    for issue in issues:
        for label in issue["labels"]:
            arr_labels.append(label["name"])
    return list(set(arr_labels)) # removing duplicates

def parse_from_yml(repo_owner,repo_name):
    text = github_handler.read_yml_from_repo(repo_owner,repo_name,label_name)
    json = file_handler.parse_yml_to_json(text)
    return json

def get_inserting_from_json(json):
    arr_labels = []
    for key in json:
        if key != "behavior":
            for val in json[key]:
                val["label"]["color"] = val["label"]["color"].replace("#","")
                arr_labels.append(val["label"])
    return arr_labels

def get_labels_from_yml_name(repo_owner,repo_name):
    text = github_handler.read_yml_from_repo(repo_owner,repo_name,label_name)
    json = file_handler.parse_yml_to_json(text)
    arr_labels = []
    for key in json:
        if key != "behavior":
            for val in json[key]:
                val["label"]["color"] = val["label"]["color"].replace("#","")
                arr_labels.append(val["label"]["name"])
    return arr_labels


def diff_between_2_lists(label1,label2):
    diff_list = [ii for ii in label1 if ii not in label2]
    return diff_list

def get_safe_delete_labels(repo_owner,repo_name):
    yml_labels = get_labels_from_yml_name(repo_owner,repo_name)
    all_labels = get_all_labels(repo_owner,repo_name)
    issues_labels = get_all_labels_for_all_issues(repo_owner,repo_name)
    remove_labels = diff_between_2_lists(all_labels,yml_labels)
    remove_labels_safe = diff_between_2_lists(remove_labels,issues_labels)
    return remove_labels_safe

def main(repo_owner,repo_name):
    yml_json = parse_from_yml(repo_owner,repo_name)
    arr_labels_insert = get_inserting_from_json(yml_json)
    github_handler.insert_labels_repo(repo_owner,repo_name,arr_labels_insert)
    if yml_json["behavior"][0]["labels"]["undefined"] == "safe-delete":
        arr_labels_remove_safe = get_safe_delete_labels(repo_owner,repo_name)
        github_handler.delete_labels_repo(repo_owner,repo_name,arr_labels_remove_safe)
    
# The main func
def lambda_handler(event, context):
    try:
        repo_name = "zz5"
        repo_owner = "internshipprolike"
        #body = json.loads(event['body'])
        #repo_name = body["repository"]["name"]
        #repo_owner = body["repository"]["owner"]["login"]
        label_json = github_handler.get_commits_for_file(repo_owner,repo_name,label_name)
        if not label_json:
            raise Exception("ERROR: .labels.yml missing")
        else:
            main(repo_owner,repo_name)
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


main(repo_owner,repo_name)
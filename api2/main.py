import json
import os
# Local files import
import file_handler
import github_handler

# Local variables
label_name = ".labels.yml"
#api_key_github = os.environ['API_KEY_GITHUB']
#api_key_2 = os.environ['API_KEY_2']


# The main func
def lambda_handler(event, context):
    try:
        label_json = "asd"
        api_key = event["queryStringParameters"]["api-key"]
        if api_key != api_key_github:
            raise Exception("ERROR: API KEY INVALID")
        body = json.loads(event['body'])
        repo_name = body["repository"]["name"]
        repo_owner = body["repository"]["owner"]["login"]
        if not label_json:
            raise Exception("ERROR: .labels.yml missing")
        else:
            json = parse_from_yml(repo_owner,repo_name)
            array_insert = format_inserting(json)
            if json["behavior"][0]["labels"]["undefined"] == "safe-delete":
                array_remove_safe = format_removing(json)
            
            print("hello")
    except Exception as e:
        return {
            'statusCode': 404,
            'body': json.dumps(str(e))
        }
    else:
        return {
            'statusCode': 200,
            'body': json.dumps(event)
        }

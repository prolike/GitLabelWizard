import json
import os
#from botocore.vendored import requests
from requests_futures.sessions import FuturesSession

api_key = os.environ["API_KEY_2"]
#api_key = os.environ["API_KEY_2"]
#api_url = os.environ["API_GITLABWIZARD_URL"]+"?api-key"+api_key
#api_url = "https://webhook.site/46d8b99c-0b9f-4411-b342-52a6b3adb5d1"
api_url = "https://tz5wp2lh0m.execute-api.eu-central-1.amazonaws.com/v1/GitLabelWizard?api-key="+api_key


def api_post(repo_owner,repo_name,arr_labels):
    with FuturesSession(max_workers=1) as session:
        newjson = {}
        newjson["labels"] = arr_labels
        newjson["repo_name"] = repo_name
        newjson["repo_owner"] = repo_owner
        try:
            session.post(api_url,json=newjson)
        except Exception as e:
            print(e)

def api_delete(repo_owner,repo_name,arr_remove):
    with FuturesSession(max_workers=1) as session:
        session.delete(api_url,data=arr_labels)


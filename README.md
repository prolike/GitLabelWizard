![](https://i.gyazo.com/0839e2c4186caee4f3ba67227bf2f5ea.png)

# GitLabelWizard

### Status
- **21/01/2019**

We have been working on a bash script that reads a yml file and do a HTTP POST request(cURL) to www.api.github.com to excute creation of labels in a repo

- **22/01/2019**

The script is now updated and works very well locally and manually. We need to figure out the next step for implementation of automation excution of the script with CircleCI.  

- **23/01/2019**
Major changement of architecture

**24/01/2019**
Instead of using CircleCI to automate the label process, we have experimented with GitHub webhooks. By combining it with our AWS Lambda API, we can make it trigger when a new repository is created, archived, unarchived and deleted. The point is to limit it to only trigger on creation, but we are still not sure how to do this exactly. At the same time, we could also only get the webhook to function with an open API aka without authorization, which is not an ideal solution.

### Amazon API

- API endpoint: https://mybq6qm6ig.execute-api.us-east-2.amazonaws.com/default/helloworld
- API key: ***SECRET***
- **Input**
  - **Parameter:** "?repo_name=<your_repo_name>"
- Method: GET

### Features
* Delete standard labels
* Inserting labels

### Todo
* CircleCI triggers the label script

### Ideas/architecture/workflow
- Using CircleCI to perform a request to a **Amazon AWS API gatway** that excutes the label script within **Amazon AWS lambda**

![](https://i.gyazo.com/668723561263c5f100b028a003f9a2d7.png)


### Labels

```json

# LABELS IN JSON 

# Deletion labels empty space replaced with %20
arr_labels_deletion = ["bug","duplicate","enhancement","good%20first%20issue","help%20wanted","invalid","question","wontfix"]

# Creation labels
arr_labels_creation =  [{"name":"Action - awaiting feed-back","color": "6EB82C","description":""},
 {"name":"Action - needs grooming","color": "009800","description":""},
 {"name":"Briefing","color": "C7DEF8","description":""},
 {"name":"Prio 1 - must have","color": "E83D0F","description":""},
 {"name":"Prio 2 - should have","color": "EB6420","description":""},
 {"name":"Prio 3 - could have","color": "E8850F","description":""},
 {"name":"Prio 4 - won't have","color": "E8A80F","description":""},
 {"name":"Size 1 - small","color": "20B4E5","description":""},
 {"name":"Size 2 - medium","color": "208FE5","description":""},
 {"name":"Size 3 - large","color": "0052CC","description":""},
 {"name":"Size 4 - too big","color": "100B6B","description":""},
 {"name":"Status - duplicate","color": "111111","description":""},
 {"name":"Status - to do","color": "EDEDED","description":""},
 {"name":"Status - in progress","color": "EDEDED","description":""},
 {"name":"Status - up next","color": "EEEEEE","description":""},
 {"name":"Tech-challenge","color": "5319E7","description":""}]

```

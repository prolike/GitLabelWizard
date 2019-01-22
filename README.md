![](https://i.gyazo.com/0839e2c4186caee4f3ba67227bf2f5ea.png)

# GitLabelWizard

### Status
- 21/01/2019

We have been working on a bash script that reads a yml file and do a HTTP POST request(cURL) to www.api.github.com to excute creation of labels in a repo

- 22/01/2019

The script is now updated and works very well locally and manually. We need to figure out the next step for implementation of automation excution of the script with CircleCI.  

### Features
* Delete standard labels
* Read a single label from '.labels.yml' file
* Recieve user input variables
  * Input: repo-owner, repo-name, basic authentication token
* Insert a single label with cURL

### Todo
* Adding recursively reading and inserting from a yml file
* CircleCI integration
* Alot more features upcoming

### Ideas
(Need more details. will be written later)
- Using CircleCI to excute the script
- Using CircleCI to perform a request to a serverless(server) that excutes the label creation


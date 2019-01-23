![](https://i.gyazo.com/0839e2c4186caee4f3ba67227bf2f5ea.png)

# GitLabelWizard

### Status
- **21/01/2019**

We have been working on a bash script that reads a yml file and do a HTTP POST request(cURL) to www.api.github.com to excute creation of labels in a repo

- **22/01/2019**

The script is now updated and works very well locally and manually. We need to figure out the next step for implementation of automation excution of the script with CircleCI.  

- **23/01/2019**

Major changement of architecture

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

### Ideas/architecture/workflow
- Using CircleCI to perform a request to a **Amazon AWS API gatway** that excutes the label script within **Amazon AWS lambda**
![](https://i.gyazo.com/39595f9cf05bdbaec1aa273319197e7d.png)


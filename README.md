![](https://i.gyazo.com/0839e2c4186caee4f3ba67227bf2f5ea.png)

# GitLabelWizard

### Status
- **21/01/2019**

We have been working on a bash script that reads a yml file and do a HTTP POST request(cURL) to www.api.github.com to excute creation of labels in a repo

- **22/01/2019**

The script is now updated and works very well locally and manually. We need to figure out the next step for implementation of automation excution of the script with CircleCI.  

- **23/01/2019**

Major change in architecture: The script has been rewritten to Python and is now up and running on AWS Lambda. The goal is then to automate it with CircleCI by making it run on build (in the config.yml file), but only the first time it is build or when the script has been altered. We are still in doubt how this should be done right, but an idea could be to use YML key attributes like ``when``, ``unless``or ``condition``. Our flowchart has also been updated.

- **24/01/2019**

Instead of using CircleCI to automate the label process, we have experimented with GitHub webhooks. By combining it with our AWS Lambda API, we can make it trigger when a new repository is ``created``, ``archived``, ``unarchived`` and ``deleted``. The point is to limit this to only trigger on repository creation, but we are still not sure how to do this. At the same time, we could only get the webhook to function with an open API without authorization, which is not an ideal solution.



### Labels

#### JSON
https://github.com/prolike/GitLabelWizard/blob/master/labels_creation.json
https://github.com/prolike/GitLabelWizard/blob/master/labels_deletion.json
#### YML
https://github.com/prolike/GitLabelWizard/blob/master/.label.yml

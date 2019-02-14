![](https://i.gyazo.com/0839e2c4186caee4f3ba67227bf2f5ea.png)


# GitLabelWizardBot 1.0.0 [![CircleCI](https://circleci.com/gh/prolike/GitLabelWizard/tree/master.svg?style=svg)](https://circleci.com/gh/prolike/GitLabelWizard/tree/master) [![GitHub issues open](https://img.shields.io/github/issues/Prolike/gitlabelwizard.svg?maxAge=2592000)](https://github.com/prolike/GitLabelWizard/issues)
---



## GitLabelWizardBot Github App
https://github.com/apps/gitlabelwizardbot


## Prerequisites
```
1. Firebase account with a Blaze plan (Will most likely be free anyway)
2. CircleCI account (optionial)
3. Nodejs installed
``` 
## Installation

## Deployment
In order to deploy the project into a firebase functions, you need to gain following tokens:
- A random generated token
- Your authentication token for github project (Basic)
- Your authentication token for firebase

The deployment commands: 
```
$ firebase functions:config:set github.authkey={YOUR_GITHUB_BASIC_AUTHENTICATION_TOKEN} --token={YOUR_FIREBASE_TOKEN_HERE}
$ firebase functions:config:set fb.apikey={YOUR_RANDOM_GENERATED_API_KEY} --token={YOUR_FIREBASE_TOKEN_HERE}
$ firebase deploy --only functions --token={YOUR_FIREBASE_TOKEN_HERE}
```

## Run the bot


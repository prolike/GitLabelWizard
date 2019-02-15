![](https://i.gyazo.com/0839e2c4186caee4f3ba67227bf2f5ea.png)


# GitLabelWizard 1.0.0 [![CircleCI](https://circleci.com/gh/prolike/GitLabelWizard/tree/master.svg?style=svg)](https://circleci.com/gh/prolike/GitLabelWizard/tree/master) [![GitHub issues open](https://img.shields.io/github/issues/Prolike/gitlabelwizard.svg?maxAge=2592000)](https://github.com/prolike/GitLabelWizard/issues)

GitLabelWizard is a tool designed to automatically create and delete GitHub issue labels upon the creation of a new GitHub repository. This is done by using a GitHub app ([GitLabelWizardBot](https://github.com/apps/gitlabelwizardbot)) and [Firebase](https://firebase.google.com/docs/functions/) Cloud Functions.


## GitLabelWizardBot Github App
https://github.com/apps/gitlabelwizardbot


## Prerequisites
```
1. A Firebase account with a Blaze plan* 
* You need a account with blaze plan to be have any outbound connection but no worries it will be almost free anyway.
2. A Firebase project created
3. CircleCI account (optionial)
4. Git & Node.js installed
``` 
## Firebase setup

1. Create a project
https://firebase.google.com/



## Installation

#### 1. Clone github repo

Clone the repository
```
$ git clone https://github.com/prolike/gitlabelwizard.git
```

#### 2. Install Node.js (Skip if you have already Node.js preinstalled)

Download and install your Node.js
https://nodejs.org/en/download/

#### 3. Configure firebase file

Open `.firebasesrc` and change the default value to your **projectID**.
You can find your projectID from your firebase console.
- Enter your firebase project
- Click project settings
- There you have your project ID

```
{
  "projects": {
    "default": "gitlabelwizard-8a56d"
  }
}

```


#### 4. Install firebase tools

```
npm install -g firebase-tools
```

#### 5. Install npm modules


```
$ cd GitLabelWizard/functions
$ cd npm install
```


```
$ cd GitLabelWizard/functions
$ cd npm install
```
## Deployment guideline 

In order to deploy the project into a firebase functions, you need to gain following tokens:
#### 1. A random generated API key
Write following in your terminal/commandline
```bash
$ date +%s | sha256sum | base64 | head -c 32 ; echo 
```
You will get something likely: 
`$ nGNiMDYzMWVjMmE2ZGYxNGZkNTJmMjYz`
This is your secret **RANDOM_GENERATED_API_KEY** for the project, save the api key and dont expose it someplace!
#### 2. Your basic authentication token for github project (Base64)
Write following in your terminal/

```bash
$ echo username:password | base64
```

You will get something likely
`$ eGF4YW5zdHhheGFzOnNhc2RICg==`

This is your secret **GITHUB_BASIC_AUTHENTICATION_TOKEN** for the project, save the key and dont expose it someplace!

#### 3. Your authentication token for firebase

Write following in your terminal/commandline

```
firebase login:ci
```

You will get prompted and redirected to a login screen for firebase, sign yourself in and then the token will be showed in terminal.

```
Waiting for authentication...

✔  Success! Use this token to login on a CI server:

1/_4hiNWKtrhWNmxIbM10PXH779BkRIvS5pn50JNtoNst

Example: firebase deploy --token "$FIREBASE_TOKEN"
```

This is your secret **FIREBASE_TOKEN** for the project, save the key and dont expose it someplace!

## Deployment

```
$ firebase functions:config:set github.authkey={YOUR_GITHUB_BASIC_AUTHENTICATION_TOKEN} --token={YOUR_FIREBASE_TOKEN_HERE}
$ firebase functions:config:set fb.apikey={YOUR_RANDOM_GENERATED_API_KEY} --token={YOUR_FIREBASE_TOKEN_HERE}
$ firebase deploy --only functions --token={YOUR_FIREBASE_TOKEN_HERE}
```

## Run the bot


## Running the tests
To run the automated tests you need to be in the folder `/functions`.
In your terminal from the project folder run
```
$ cd functions
```
Here you have to make sure you have the `/node_modules` folder installed.
For this run
```
$ sudo npm install
```
You should now have the requirements to run the tests.
Make sure you're still inside `/functions` and run
```
$ npm test
```

## Background
Originally we started this project on AWS Lambda, where we actually almost finished a working product written in Python 3. Though, due to complications with local testing of Lambda and CircleCI implementation we decided to move to Firebase, which meant that we had to rewrite our codebase to Javascript (Nodejs). We have included the old codebase [here](https://github.com/prolike/GitLabelWizard/tree/master/backup).

## Future development
To expand this service, we would like to add the following features in the future:
- Instead of having the labels stored locally, we would want the labels to be in a YML-file, which the wizard then reads to create labels.
- To delete labels, we would then match the labels in the file to the existing labels on the repository and delete any labels not mentioned in the file. Here we would also ensure that the wizard only deletes labels that are not in use on any issue.
- When the YML-file is edited by the repository owner, the wizard will read the file again and then create or delete any labels added to or removed from the file.

Some of these features were actually already developed in the first part of the project when we were still running on AWS Lambda. The codebase (written in Python 3) for this can be found [here](https://github.com/prolike/GitLabelWizard/tree/master/backup).

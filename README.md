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

## Deployment guideline 

In order to deploy the project into a firebase functions, you need to gain following tokens:
##### 1. A random generated API key
Write following in your terminal/commandline
```bash
$ date +%s | sha256sum | base64 | head -c 32 ; echo 
```
You will get something likely: 
`$ nGNiMDYzMWVjMmE2ZGYxNGZkNTJmMjYz`
This is your secret **RANDOM_GENERATED_API_KEY** for the project, save the api key and dont expose it someplace!
##### 2. Your basic authentication token for github project (Base64)
Write following in your terminal/commandline
```bash
$ echo username:password | base64
```
You will get something likely
`$ eGF4YW5zdHhheGFzOnNhc2RICg==`
This is your secret **GITHUB_BASIC_AUTHENTICATION_TOKEN** for the project, save the key and dont expose it someplace!

##### 3. Your authentication token for firebase
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


# Ember-dnf-blueprints
A set of blueprints and helpers for rapid web app development.

## Installation
`ember install ember-dnf-blueprints`

## Generate a navbar
`ember g dnf-navbar main`

## Inculde bootstrap files
`ember g dnf-bootstrap install`

## Add Google Analytics to your ember app
`ember g dnf-google-anlaytics UA-111111-11`

## Add a favicon to your app
`ember g dnf-favicon install`

## Add firebase to your app
`ember g dnf-firebase your-app-name`

if your app url is mywebapp.firebaseio.com then you would run `ember g dnf-firebase mywebapp`

## Add user accounts to your app
`ember g dnf-accounts install`
visit your app at http://localhost:4200/account and you should be able to signup/login/logout

Important: You should add firebase to your app first using the above instructions

Note: You might want to add this to your application route
```
  beforeModel: function() {
    return this.get("session").fetch().catch(function() {});
  },
```

## Todos

* blueprint for generating a footer
* blueprint for adding google anlaytics
* blueprint for generating a login form
* blueprint for generating a signup form
* get rid of ~un files (git will ignore them, it's only a problem in dev)

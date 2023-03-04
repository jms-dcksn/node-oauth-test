# node-oauth-test

A simple app based on Express with EJS views for a single, dynamic page that walks through the OAuth dance with Jira. Intended for tests and educational purposes only.

This is currently configured to run a test to authenticate with Jira, but can be customized to other apps. 

To run a quick test with Jira OAuth 2.0 (3LO):

* Create an app in the Jira Developer Portal to obtain your Client ID and Secret. 
* Enter 'http://localhost:8080/authorize' as the redirect URI in the app you create with Jira
* Clone this git rep
* Update the client ID and secret values in the app.js file as well as the index.ejs file

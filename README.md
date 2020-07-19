# NodeLogger

## Introduction

> Goal of project is to practice using NodeJS as a language while following best practices and experimenting with multiple npm packages. RESTful API endpoint of ``` /api/v1/logger ``` takes JSON input and appends values to a logging file.
Project currently only supports POST request to /api/v1/logger, GET coming soon.

## Code Samples

> Example Input - POST
```
{
	"title": "Foo Log",
	"msg":"Bar Log Message",
	"flag":"--foo"
}
```
Example Output
```
{
    "message": "Log Saved Sucessfully",
    "logInfo": {
        "id": "672bc743-e3c0-4db9-8575-3751b969a67e",
        "title": "Foo Log",
        "msg": "Bar Log Message",
        "flag": "--foo"
    },
    "res_code": "201"
}
```
Note** Logs are saved to local /logs directory under /nodelogger/api/logs/log.txt
## Installation

> Basic Startup
``` 
npm install
```
Json Endpoint Requirements
```
"title": { "type": "string" },
"msg": { "type": "string" },
"flag": { "type": "string" }
```
All fields are mandatory however only types are enforced in terms on input acceptation
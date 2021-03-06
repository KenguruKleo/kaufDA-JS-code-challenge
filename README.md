# Code Challenge for kauf DA

## challenge
* [JS_code_challenge.pdf](https://github.com/KenguruKleo/kaufDA-JS-code-challenge/blob/master/challange/JS_code_challenge.pdf)
* [parent.json](https://github.com/KenguruKleo/kaufDA-JS-code-challenge/blob/master/challange/parent.json)
* [child.json](https://github.com/KenguruKleo/kaufDA-JS-code-challenge/blob/master/challange/child.json)

## prepare
At first you should install `node` and `npm`
Tested on Node 6.9.1

## for prod mode
* `npm install`
* `npm run build`
* `npm run start` or `npm run start-with-mongo` (mongodb should be started before and serve requests on port 27017)
* go to [localhost:8080](http://localhost:8080)

## for dev mode
* `npm install`
* `npm run start-dev` or `npm run start-dev-with-mongo` (mongodb should be started before and serve requests on port 27017)
* go to [localhost:8080](http://localhost:8080)

## Database
DB Server will serve requests on port 3000
* JSON-Server: currently is used JSON-Server for store data. To manual start - `npm run start-json-server`
* MongoDB:
* 1. Pull mongo docker image from DockerHUB `docker pull mongo`
* 2. Start mongo server `npm run mongo`
* 3. Start server to work with mongo server `npm run start-mongo-server` and serve requests on port 3000

## docker
* build `docker build -t kengurukleo/kaufda-js-code-challenge .`
* or you can just pull latest image from docker hub `docker pull kengurukleo/kaufda-js-code-challenge` and than run it 
* run `docker run -p <port-to-expose>:8080 -d kengurukleo/kaufda-js-code-challenge`

## unit tests
* for unit tests run `npm run tests`

## coverage
* go to [codecov.io/gh/KenguruKleo/kaufDA-JS-code-challenge/](https://codecov.io/gh/KenguruKleo/kaufDA-JS-code-challenge/tree/master/app)

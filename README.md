# Code Challenge for kauf DA

## challenge
* [JS_code_challenge.pdf](https://github.com/KenguruKleo/kaufDA-JS-code-challenge/blob/master/challange/JS_code_challenge.pdf)
* [parent.json](https://github.com/KenguruKleo/kaufDA-JS-code-challenge/blob/master/challange/parent.json)
* [child.json](https://github.com/KenguruKleo/kaufDA-JS-code-challenge/blob/master/challange/child.json)

At first you should install `webpack` and `npm`

## for prod mode
* npm install
* npm run build
* npm run start
* go to [localhost:8080](http://localhost:8080)

## for dev mode
* npm install
* npm run start-dev
* go to [localhost:8080](http://localhost:8080)

DB Server will serve requests on port 3000

Tested on Node 6.9.1

## docker
* build `docker build -t kengurukleo/kaufda-js-code-challenge .`
* or you can just pull latest image from docker hub `docker pull kengurukleo/kaufda-js-code-challenge` and than run it 
* run `docker run -p <port-to-expose>:8080 -d kengurukleo/kaufda-js-code-challenge`

## unit tests
* for unit tests run `npm run tests`

## coverage
* go to [codecov.io/gh/KenguruKleo/kaufDA-JS-code-challenge/](https://codecov.io/gh/KenguruKleo/kaufDA-JS-code-challenge/tree/master/app)
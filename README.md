Code Challenge for kauf DA

At first you should install webpack and npm

# For prod mode
* npm install
* npm run build
* npm run start
* go to [localhost:8080](http://localhost:8080)

# For dev mode
* npm install
* npm run start-dev
* go to [localhost:8080](http://localhost:8080)

DB Server will serve requests on port 3000

Tested on Node 6.9.1

# docker
* build `docker build -t kengurukleo/kaufda-js-code-challenge .`
* run `docker run -p <port-to-expose>:8080 -d kengurukleo/kaufda-js-code-challenge`

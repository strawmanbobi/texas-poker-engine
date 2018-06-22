## Dummy Texas Poker Front-end Service

### Prerequisites

install node.js (above version 6.0)
    
    npm install -g bower
    npm install
    
    cd to web/js/public
    bower install

***
### Configuration for your own run-time environment
To configure the engine for your own run-time environment, you need to edit the configuration file in configuration/system_configs.js

Following are key config parameters:

**LISTEN_PORT** - Master instance listen port, master instance takes care of all HTTP requests in multiple instance mode and as well as game client connection in single instance mode

**APP_SERVER_ADDRESS** - The access URL or address of dummy-engine

**APP_SERVER_PORT** - The listen port of dummy-engine **master instance**
***

### Start the engine

node dummy-the.js

***
To start the engine service, please refer to the README of dummy-engine project





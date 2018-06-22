## Dummy Engine

### Prerequisites

install node.js (above version 6.0)

    npm install

install mongo DB (above version 3.4)

Run mongo client, create admin, grant permission and initialize poker game
    
    > use the_game;
    switched to db the_game
    > db.createUser(
      {
          user: "admin",
          pwd: "123456",
          roles: [
             { role: "readWrite", db: "the_game" }
          ]
      });
    > db.game.insertOne(
	  {
	      "name" : "texas_holdem",
	      "minPlayer" : 3,
	      "maxPlayer" : 10
	  });
***
### Configuration for your own run-time environment
To configure the engine for your own run-time environment, you need to edit the configuration file in configuration/system_configs.js

Following are key config parameters:

**LISTEN_PORT** - Master instance listen port, master instance takes care of all HTTP requests in multiple instance mode and as well as game client connection in single instance mode

**MONGO_DB_SERVER_ADDRESS** - MongoDB server address

**MONGO_DB_SERVER_PORT** - MongoDB server port

**MONGO_DB_NAME** - Database name

**MONGO_DB_USER** - Database user

**MONGO_DB_PASSWORD** - Database password

**REDIS_HOST** - Redis server address

**REDIS_PORT** - Redis server port

**REDIS_PASSWORD** - Redis password

**SMS_ACCESSKEY_ID** - SMS service access ID (compatible with Aliyun SMS service)

**SMS_ACCESSKEY_SEC** - SMS service secret (compatible with Aliyun SMS service)

**SMS_SIGN_NAME** - SMS service sign name (compatible with Aliyun SMS service)

**MULTIPLE_INSTANCE** - Multiple instance (slave instance) count (must be matched with the multiple instance parameter when start dummy-engine)

**BASE_PORT** - Base port for multiple instance (slave instance) deployment, engine instances would be listen on the port of BASE_PORT, BASE_PORT+1, BASE_PORT+2 ... BASE_PORT+MULTIPLE_INSTANCE

***

### Start the engine
* Single instance

    ./startup.sh
* Multiple instance

    ./multi-run.sh <instance-count>
    
    // instance count must be matched with MULTIPLE_INSTANCE definition in the last part

***
### Prepare Dummies
Players may need dummies (A very very naive poker decision maker intelligence) during the training. You need to create enough (say 1000) dummies at the beginning.
***
To start the front-end service, please refer to the README of dummy-the project




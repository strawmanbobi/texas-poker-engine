## Dummy Engine

#### prerequisites

install node.js (version above 6.0)
    
    npm install -g bower
    npm install
    
    cd to web/js/public
    bower install

install mongo DB (version above 3.4)

run mongo client and grant permission to user
    
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


#### to start

    node dummy.js



var PassportLocalStrategy = require('passport-local').Strategy;
var bcrypt   = require('bcrypt-nodejs');

'use strict';

/*
  sequelize CLI command to define book model 
  node_modules/.bin/sequelize model:create --name=Book 
  --attributes 
  name:string,
  isbn:integer,
  publication_date:date,
  description:text,
  author_id:integer 
  --underscored
  
  to persist table in db:
  node_modules/.bin/sequelize db:migrate
*/

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isadmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: false
  },{
    classMethods: {
      // timestamps: false,
      // underscored: false,
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  sequelize
    .sync({
      force: false,
      // logging: console.log
    })
    .then(function(){
      console.log("User Model Synced")
    })
    .catch(function(error){
      console.log(error);
    });

  return User;
};


module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newUser.password, salt, function(err, hash){
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.find({ where: { username: req.body.username }}, callback);
}
module.exports.comparePassword = function(pass, hash, callback){
  bcrypt.compare(pass, hash, function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  })
}

module.exportsgetUserById = function(id, callback){
  User.findById(id, callback);
}



var config = require('../../server/config/config.js');
var User = require('../../server/models/').User;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var secretKey = config.secretKey;
// var superSecret = config.secretKey;

// var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

function createToken(user, company){
	var token = jsonwebtoken.sign({
		id: user.id,
		name: user.name,
		username: user.username,
		isadmin: user.isadmin,
		company: company
	},
	secretKey );
	// {
	// 	expiresInMinute: 1440
	// });
	return token;
}

module.exports = function(app, express) {

	var api = express.Router();

	api.get('/signup', function(req,res){
		res.status(200).json('this is get request for sign.');
	});

	api.post('/signup', function(req, res){
		  	var token = 
		    User.create(req.body)
		      .then(function (newUser) {
		        res.status(200).json({
		        	newUser,
		        	success:true,
		        	token:token });
		      })
		      .catch(function (error){
		        res.status(500).json(error);
		      });
		  // }
	});

	api.put('/updateuser', function(req, res){
		// update(req, res) {
		    User.update(req.body, {
		      where: {
		        id: req.params.id
		      }
		    })
		    .then(function (updatedRecords) {
		      res.status(200).json(updatedRecords);
		    })
		    .catch(function (error){
		      res.status(500).json(error);
		    });
		  // }
	});

	api.delete('/deleteuser', function(req,res){
		// delete(req, res) {
		    User.destroy({
		      where: {
		        id: req.params.id
		      }
		    })
		    .then(function (deletedRecords) {
		      res.status(200).json(deletedRecords);
		    })
		    .catch(function (error){
		      res.status(500).json(error);
		    });
		  // };
	});

    api.post('/login', function(req, res){
			User.find({
				where: { username: req.body.username }})
				.then(function(user){
					if (!user){
						res.json({ message: "Username doesn't exist"}); }
						// return done(null, false, { message: 'Username doesnt exist'});	}
					else{
						User.find({
						where: { username: req.body.username, password: req.body.password }})
						.then(function(user){
							if(!user){
								res.json({ message: "Password doesn't match the username" }); }
							if(user.isadmin == true){ 
								var token = createToken(user);
								res.json({
									isadmin: true,
									success: true,
									message: "successful login admin",
									token: token
								})}
							else {
								var token = createToken(user);
								res.json({
									isadmin: false,
									success: true,
									message: "successful login user",
									token: token
								})
							}
						})
					};
			});

	});

    passport.use(new LocalStrategy(
    	function(username, password, done){

    		User.getUserByUsername(username, function(err, user){
    			if(err){return done(err); }
    			if(!user){ return done(null, false, {message: 'Incorrect username'}); }

    			User.comparePassword(password, user.password, function(err, isMatch){
    				if(err) throw error;
    				if(isMatch){
    					return done(null, user);
    				} else {
    					return done(null, false, {message: 'Invalid Password'});
    				}
    			})
    		})
    	}));

    passport.serializeUser(function(user, done){
    	done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
    	User.getUserById(id, function(err, user){
    		done(err, user);
    	});
    });

	api.post('/loginn',
		passport.authenticate('local',{ successRedirect: '/', failureRedirect: '/loginn', failureFlash: true }),
			function(req,res){
				res.redirect('/');
			})

    api.use(function(req, res, next){
    	console.log("Somebody Came to Access App");
    	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    	if(token){
    		jsonwebtoken.verify(token, superSecret, function(err, decoded){
    			if(err){
    				res.status(403).send({ success: false, message: "Failed to authenticate user" });
    			}else{
    				req.decoded = decoded;
    			}
    		});
    	}
    	else{
    		res.status(403).send({ success: false, message: " No token provided" })
    	}
    });

    api.get('/', function(req, res){
    	res.json("hello");
    });

	// get User details for self
	api.get('/me', function(req, res){
		res.json(req.decode);
	});


return api;

}
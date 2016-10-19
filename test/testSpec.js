var app = require('../index')(app);
var should = require('should');
var supertest = require('supertest');
var assert = require('assert');
var rewire= require('rewire');
var expect = require('chai').expect;
var sinon = require('sinon');

// var company = require('../data');
// var app = require('./helper/app');

// istanbul cover node_modules/mocha/bin/_mocha

describe('Main Test Suite', function(){
	this.timeout(30000);

	describe('Page Routes', function(){

		it('TEST 1 >> Should return Status 200 for Home Page Route \n', function(done){
	    	supertest(app).get("/").expect(200).end(done);
	  	});
	});

	describe('User Authentication', function(){

   		var token = null;
  		// var isadmin = false;

		before(function(done){
			this.console = {
				log: sinon.spy()
			};
		// app.__set__("console", this.console);

		// 	supertest(url)
		// 		.post('/login')
		// 		.send({ username: "nikhil12", password: "1234" })
		// 		.end(function(err, res) {
		// 			token = res.body.token;
		// 			done();
  		//		});

      		this.user = {
				isadmin: true,
				success: true,
				message: "successful login admin",
				token: token
			};
			done();
		});

		it('TEST 11 >> Should Return Status 200 for valid username and password \n', function(done){
			var user = this.user;
			supertest(app)
				.post('/api/login')
				.set('Accept','application/json')
				.send({"username": "nikhil12", "password": "1234"})
				// .expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res){
					var temp = JSON.parse(res.text);
					expect(temp.message).to.equal(user.message);
					// res.status.should.equal(200);
					done();
				});
		});

		it('TEST 12 >> Should Return 404 Error for invalid username \n', function(done){
			supertest(app)
				.post('/api/login')
				.set('Accept','application/json')
				.send({"username": "XXX", "password": "123"})
				.expect('Content-Type', /json/)
	      // .expect(message).to.equal("Password doesn't match the username")
				.end(function(err, res){
					res.status.should.equal(404);
					var temp = JSON.parse(res.text);
					expect(temp.message).to.equal("Username doesn't exist");
					done();
				});
		});

		it('TEST 13 >> Should Return 404 Error for valid username but invalid password \n', function(done){
			supertest(app)
				.post('/api/login')
				.set('Accept','application/json')
				.send({"username": "nikhil12", "password": "123"})
				.expect('Content-Type', /json/)
	      // .expect(message).to.equal("Password doesn't match the username")
				.end(function(err, res){
					res.status.should.equal(404);
					var temp = JSON.parse(res.text);
					expect(temp.message).to.equal("Password doesn't match the username");
					done();
				});
		});
	});

	describe('Company Web APIs', function(){

		it('TEST 21 >> Should Return Company with ID=58 \n', function(done){
			supertest(app)
				.get('/api/companydetail/58')
				// .expect(200)
				.end(function(err, res){
					res.status.should.equal(200);
					var temp = JSON.parse(res.text);
					expect(temp.message).to.equal("company found");
					done();
				});
		});
		it('TEST 22 >> Should Not Return Any Company with PostGreSQL ID=0 \n', function(done){
			supertest(app)
				.get('/api/companydetail/0')
				// .expect(404)
				.end(function(err, res){
					res.status.should.equal(404);
					var temp = JSON.parse(res.text);
					expect(temp.message).to.equal("No company found");
					done();
				});
		});
		it.skip('TEST 23 >> Should Persist New Vendor in PostGreSQL \n', function(done){
			supertest(app)
				.post('/api/companycreate')
				.send({
					"name": "Colt Fusion Technologies", 
					"abrev": "colt",
					"weekendmax": "3",
					"terms": "private",
					"url": "www.coltfusiontech.com",
					"store": "San Diego"
				})
				.expect(200)
				.end(function(err, res){
					res.status.should.equal(200);
					done();
				});
		});

	});


});

/*

	it('TEST1 >> dummy test should pass \n', function(done){
		done();
	});
	it('should not pass', function(done){
		throw "don't pass";
		done();
	});


var request = require('supertest'),
  should = require('should'),
  app = require('../server');
 
var Cookies;
 
describe('Functional Test <Sessions>:', function () {
  it('should create user session for valid user', function (done) {
    request(app)
      .post('/v1/sessions')
      .set('Accept','application/json')
      .send({"email": "user_test@example.com", "password": "123"})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.id.should.equal('1');
        res.body.short_name.should.equal('Test user');
        res.body.email.should.equal('user_test@example.com');
        // Save the cookie to use it later to retrieve the session
        Cookies = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });
  it('should get user session for current user', function (done) {
    var req = request(app).get('/v1/sessions');
    // Set cookie to get saved user session
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.id.should.equal('1');
        res.body.short_name.should.equal('Test user');
        res.body.email.should.equal('user_test@example.com');
        done();
      });
  });
});
*/
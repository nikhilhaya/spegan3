var app = require('../index')(app);
// var company = require('../data');
// var app = require('./helper/app');
var should = require('should');
var supertest = require('supertest');

describe('company', function(){
	
	it('TEST1 >> dummy test should pass \n', function(done){
		done();
	});

	// it('should not pass', function(done){
	// 	throw "don't pass";
	// 	done();
	// });

	it('TEST 7 >> Should Return Company with ID=1 \n', function(done){
		supertest(app)
			.get('/api/companydetail/1')
			.expect(200)
			.end(function(err, res){
				res.status.should.equal(200);
				done();
			})
	});

	it('TEST 8 >> Should Not Return Any Company with PostGreSQL ID=xyz \n', function(done){
		supertest(app)
			.get('/api/companydetail/xyz')
			.expect(404)
			.end(function(err, res){
				res.status.should.equal(404);
				done();
			})
	});
});
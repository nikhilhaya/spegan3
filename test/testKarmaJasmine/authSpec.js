describe('authFactory Service', function(){
	var authFactory;

// karma start karma.conf.js

	var userList = [
	    {
	      id: '4',
	      name: 'mary jane',
	      username: 'mary12',
	      password: '1234',
	      isadmin: true
	    },
	    {
	      id: '1',
	      name: 'aa',
	      username: 'aa',
	      password: 'aa',
	      isadmin: false
	    }
    ];

	beforeEach(angular.mock.module('authService'));

  	beforeEach(angular.mock.inject(function(_Auth_) {
    	authFactory = _Auth_;
  	}));

		it('TEST 1 >> Should Check If Auth Factory is Defined \n', function() {
			expect(authFactory).toBeDefined();
		});

		describe('authFactory Service functions', function(){

		    // A simple test to verify the method all exists
	    	it('TEST 2 >> Should Check if Login Function is Defined', function() {
	      		expect(authFactory.login).toBeDefined();
	      		expect(authFactory.logout).toBeDefined();
	      		expect(authFactory.isLoggedIn).toBeDefined();
	      		expect(authFactory.getUser).toBeDefined();
	  		});
	  	});

		it('TEST 3 >> Should Check if Admin can Login with proper Credentials \n', function() {
			expect(authFactory.login).toBeDefined();
			expect(authFactory.login('nikhil12','1234').status).toEqual(200);
		});

		xit('TEST 4 >> Should Check if Admin can Login with proper Credentials \n', function() {
			expect(authFactory.login).toBeDefined();
			expect(authFactory.login('nikhil','1234').status).toEqual(200);
		});
});
describe('authFactory Service', function(){
	var authFactory;

// karma start karma.conf.js

	var dummySuccessLogin = {
  						"isadmin": true,
  						"success": true,
  						"message": "successful login admin",
  						// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsIm5hbWUiOiJuaWtoaWwgc2hhcm1hIiwidXNlcm5hbWUiOiJuaWtoaWwxMiIsImlzYWRtaW4iOnRydWUsImlhdCI6MTQ3NjgyMzU2MX0.cMRBNPO2nkeaBJhhCsloID0Sux8PLrR_r6F1cKrJjr8"
					};

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

		 //  	before(function () {
			//     httpBackend.expectGET('/foos/1').respond(myFooObject);
			//     httpBackend.expectGET('/bars').respond(myBarsArray);
			//     httpBackend.flush();
			// });

		it('TEST 3 >> Should Check if Admin can Login with proper Credentials \n', function() {
			expect(authFactory.login()).toBeDefined();
			expect(authFactory.login('nikhil','1234')).toEqual(dummySuccessLogin);
			// expect(angular.equals(authFactory.login('nikhil','1234'), dummySuccessLogin)).toBe(true);
		});

});
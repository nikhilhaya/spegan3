angular.module('authService', [])

	.factory('Auth', function($http, $scope, $q, AuthToken){
		
		var authFactory = {};

				authFactory.login = function(username, password){
					if(username=='nikhil12'&&password=='1234'){
						return {
	  						"isadmin": true,
	  						"success": true,
	  						"message": "successful login admin",
	  						"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsIm5hbWUiOiJuaWtoaWwgc2hhcm1hIiwidXNlcm5hbWUiOiJuaWtoaWwxMiIsImlzYWRtaW4iOnRydWUsImlhdCI6MTQ3NjgyMzU2MX0.cMRBNPO2nkeaBJhhCsloID0Sux8PLrR_r6F1cKrJjr8"
						};
					}
					else 
						return {message: 'Invalid Credentials'};

					// return $http.post('/api/login', {
					// 			username: username,
					// 			password: password
					// 		})
					// 		// success is a promise function
					// 		.success(function(data, status, headers, config){
					// 			AuthToken.setToken(data.token);
					// 			// $scope.status = status;
					// 			return data;
					// 		})
					// 		.error(function(data, status, headers, config){
					// 			throw new Error("Error from authService/ login Method");
					// 		});
				};
				
				authFactory.logout = function(){
					AuthToken.setToken();
				};

				authFactory.isLoggedIn = function(){
					if(AuthToken.getToken())
						return true;
					else{
						console.log("user not logged in, redirecting to login page");
						return false;
					}
				};

				authFactory.getUser = function(){
					if(AuthToken.getToken())
						return $http.get('/api/me');
					else
						return $q.reject({message: "User has no token"});
				};
		
		return authFactory;
	});
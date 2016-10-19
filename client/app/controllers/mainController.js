angular.module('mainController', ['authService'])

.controller('MainController', function($rootScope, $location, Auth){

	var vm = this;

	vm.loggedIn = Auth.isLoggedIn();

	$rootScope.$on('$routeChangeStart', function(){
		vm.loggedIn = Auth.isLoggedIn();
		Auth.getUser()
			.then(function(data){
				vm.user = data.data;
			});
		if(!vm.loggedIn){$location.path('/login');}
	});

	vm.doLogin = function(){
		vm.processing = true;
		vm.error = '';
		// vm.isadmin = false;
		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data){
				vm.processing = false;

			Auth.getUser()
				.then(function(data){
					vm.user = data.data;
				});

			if(data.success){
				if(data.isadmin)
					$location.path('/');
				else
					$location.path('/homeuser');
			}
			else
				vm.error = data.message;				
		
			});
	};

	vm.doLogout = function(){
		Auth.logout();
		$location.path('/login');
	};
});
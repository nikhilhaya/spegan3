describe('mainController', function(){
	var $rootScope,
		$scope,
		controllers;

	beforeEach(function(){
		module['mainController'];

		inject(function($injector){
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			controller = $injector.get('$controller')('mainController', {$scope: scope});
		});
	});
});
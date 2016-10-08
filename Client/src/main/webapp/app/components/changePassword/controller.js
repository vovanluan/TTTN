app.controller('changePasswordModalController', 
	function($rootScope, $scope, $localStorage, $uibModalInstance, userUrl, AuthService, jwtHelper, Modal, SweetAlert){

	$scope.cancel = function(){
		console.log('edit');
		$uibModalInstance.dismiss('cancel');

	};

	$scope.edit = function(){
		console.log('edit');
	};
)}

app.controller('changePasswordModalController',  function($rootScope, $scope, $localStorage, $uibModalInstance, userUrl, AuthService, jwtHelper, Modal, SweetAlert){
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');

	};

	$scope.changePassword = function(){
		console.log('sdfsdfds');
		var data = {
			oldPassword: $scope.oldPassword,
			newPassword: $scope.newPassword
		}
		AuthService.changePassword(data, $rootScope.user.id);
	};

	$scope.checkPassword = function(){
		$scope.$error = $scope.newPassword !== $scope.confirmPassword;
	};
});

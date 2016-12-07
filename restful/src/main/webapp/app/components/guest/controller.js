app.controller('logInAsGuestModalController', 
	function($rootScope, $scope, $http, $uibModalInstance, $timeout, baseUrl, Modal){
	$scope.showSpinner = false;		
	$scope.logIn = function(){
		$scope.showSpinner = true;
		var guest = new Object();
		guest.name = $scope.name;
		guest.email = $scope.email;
		$http.post(baseUrl + "/entity.guestuser", guest).then(
			function successCallBack(response){
				$scope.showSpinner = false;
				$uibModalInstance.close();
				$rootScope.user = response.data;
				$rootScope.userRole = 'guest';
			},
			function errorCallBack(response){
				$scope.showSpinner = false;
				$scope.error = "Xảy ra lỗi";
			});
	};
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}
	
	$scope.signUpModal = function () {
		$uibModalInstance.close();
		Modal.signUpModal();
	}

	$scope.logInModal = function() {
		$uibModalInstance.close();
		Modal.logInModal();		
	}

});
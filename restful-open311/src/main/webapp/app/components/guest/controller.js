app.controller('logInAsGuestModalController', ['$scope', '$http', '$uibModalInstance', 'guestUrl', function($scope, $http, $uibModalInstance, guestUrl){
	$scope.logIn = function(){
		var guest = new Object();
		guest.guestName = $scope.name;
		guest.guestEmail = $scope.email;
		$http.post(guestUrl, guest).then(
			function successCallBack(response){
				$uibModalInstance.close(guest);
			},
			function errorCallBack(response){
				$scope.error = "Xảy ra lỗi";
			});
	};
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}
}]);
app.controller('logInModalController', ['$scope', '$http', '$uibModalInstance', 'userUrl', function($scope, $http, $uibModalInstance, userUrl){
	$scope.logIn = function(){
		var url = userUrl + "/checkLogin";
		console.log(url);
		$http.get(url, {
			params: {
				email: $scope.userEmail,
				password: $scope.passWord
			},
			responseType: "json"
		}).then(
			function success(response){
		        if(!angular.isObject(response.data)){
		            $scope.error = "Email hoặc mật khẩu không đúng!";
		            $('#email').focus();
		            console.log("HERE");
		        }
		        else {
		        	$uibModalInstance.close(response.data);
		        }				
			},
			function error(err){

			}
			);
	};
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}
}]);
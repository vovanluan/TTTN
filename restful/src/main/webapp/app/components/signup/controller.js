app.controller('signUpModalController',
	function($rootScope, $scope, $http, $uibModalInstance, $localStorage, userUrl, 
		AuthService, jwtHelper, Modal){
	$scope.showSpinner = false;		
	$scope.signUp = function(){
		$scope.showSpinner = true;
		if(!($scope.password === $scope.confirmPassword)) {
			$scope.error = "Mật khẩu không khớp!";
			$('#passwordInputSignup').focus();
		}
		else {
			var user = new Object();
			user.name = $scope.name;
			user.email = $scope.email;
			user.identifyCard = $scope.id;
			user.phoneNumber = $scope.phone;
			user.passWord = $scope.password;
			console.log(JSON.stringify(user));
            AuthService.signup(user, function(res) {
            	$scope.showSpinner = false;
                if (res.type == false) {
                    alert(res.data)
                } else {
		        	$rootScope.user = res;
		            $localStorage.token = res.token;
		            console.log(res);
		            var tokenPayload = jwtHelper.decodeToken($localStorage.token);
		            $rootScope.userRole = tokenPayload.rol;
		            console.log(tokenPayload);
		            $uibModalInstance.close(res);
                }
            }, function() {
            	$scope.showSpinner = false;
                $scope.error = 'Failed to signup';
            });
		}
	};
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}

	$scope.logInModal = function(){
		$uibModalInstance.close();
		Modal.logInModal();
	}

	$scope.logInAsGuestModal = function (){
		$uibModalInstance.close();
		Modal.logInAsGuestModal();
	}
});
app.controller('logInModalController',
	function($rootScope, $scope, $localStorage, $uibModalInstance, userUrl, AuthService, jwtHelper, Modal, SweetAlert){
	$scope.showSpinner = false;
	$scope.logIn = function(){
		$scope.showSpinner = true;
	    var data = {
	        email: $scope.email,
	        password: $scope.password
	    }
	    AuthService.signin(data, function(res) {
	    	$scope.showSpinner = false;
        	// Get user information from db and update user role
        	$rootScope.user = res;
            $localStorage.token = res.token;
            var tokenPayload = jwtHelper.decodeToken($localStorage.token);
            $rootScope.userRole = tokenPayload.rol;
            $uibModalInstance.close();
	        SweetAlert.swal({
	        	title: "OK",
	        	text: "Đăng nhập thành công!",
	        	type: "success",
	        	timer: 1000,
	        	showConfirmButton: false
	        });            
	    }, function() {
	    	$scope.showSpinner = false;
	        $scope.error = 'Email hoặc mật khẩu không đúng!';
            $('#email').focus();        
	    });
	};
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	};

	$scope.logInAsGuestModal = function(){
		$uibModalInstance.close();
		Modal.logInAsGuestModal();
  	};

  	$scope.signUpModal = function(){
  		$uibModalInstance.close();
  		Modal.signUpModal();
  	};
});
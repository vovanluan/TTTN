app.controller('signUpModalController',
	function($rootScope, $scope, $http, $uibModalInstance, $localStorage, userUrl, 
		AuthService, jwtHelper, Modal, SweetAlert){
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
	        	$rootScope.user = res;
	            $localStorage.token = res.token;
	            console.log(res);
	            var tokenPayload = jwtHelper.decodeToken($localStorage.token);
	            $rootScope.userRole = tokenPayload.rol;
	            console.log(tokenPayload);
	            $uibModalInstance.close(res);
		        SweetAlert.swal({
		        	title: "OK",
		        	text: "Bạn đã đăng ký thành công!",
		        	type: "success",
		        	timer: 1000,
		        	showConfirmButton: false
		        });
            }, function(data, status, header, config) {
            	$scope.showSpinner = false;
            	if(status == 409) {
            		if(data == "email"){
						$scope.error = "Email này đã được dùng để đăng ký một tài khoản khác. Nếu bạn đã có tài khoản, vui lòng đăng nhập!";
						$scope.email = "";            			
            		}
            		else if (data == "id"){
            			$scope.error = 'CMND này đã được dùng để đăng ký một tài khoản khác!';
            			$scope.id = "";
            		}
            		else {	
            			$scope.error ="Có lỗi khi đăng ký!";
            		}
            	}
            	else{
            		$scope.error = "Có lỗi khi đăng ký!";
            	} 

                
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
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
  		AuthService.changePassword(data, $rootScope.user.id).then(
  			function success(){
				$scope.showSpinner = false;
				SweetAlert.swal({
		        	title: "OK",
		        	text: "Bạn đã cập nhật mật khẩu thành công!",
		        	type: "success",
		        	timer: 1000,
		        	showConfirmButton: false
		        });
			},
			function error(err){
				$scope.showSpinner = false;
				SweetAlert.swal("Error!", "Xảy ra lỗi khi gửi yêu cầu!", "error");
			});	
	};

	$scope.checkPassword = function(){
		$scope.$error = $scope.newPassword !== $scope.confirmPassword;
	};
});

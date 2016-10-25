app.controller('changePasswordModalController',  function($rootScope, $scope, $localStorage, $uibModalInstance, $http, userUrl, AuthService, jwtHelper, Modal, SweetAlert){
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');

	};

	$scope.changePassword = function(){
  		console.log('sdfsdfds');
  		var data = {
   			oldPassword: $scope.oldPassword,
   			newPassword: $scope.newPassword
  		}
  		console.log(data);
  		
  				
  		var req = {
		    method: 'POST',
		    url: 'http://localhost:8080/restful/webresources/entity.normaluser/changePassword/' + $rootScope.user.id,
		    data: data
		}

		$http(req).then(function success(){
				$scope.showSpinner = false;
				SweetAlert.swal({
		        	title: "OK",
		        	text: "Bạn đã cập nhật mật khẩu thành công!",
		        	type: "success",
		        	timer: 1000,
		        	showConfirmButton: false
		        });
		        $uibModalInstance.dismiss('cancel');
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

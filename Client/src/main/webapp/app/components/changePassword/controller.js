app.controller('changePasswordModalController',  function($rootScope, $scope, $localStorage, $uibModalInstance, $http, userUrl, AuthService, jwtHelper, Modal, SweetAlert, AuthService){
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');

	};

	var url;

	if($rootScope.user.type == 'vice_president') 
		url = 'http://localhost:8080/restful/webresources/entity.vicepresidentuser/changePassword/' + $rootScope.user.id;
	else 
		url = 'http://localhost:8080/restful/webresources/entity.' + $rootScope.user.type + 'user/changePassword/' + $rootScope.user.id;

	$scope.changePassword = function(){
  		var data = {
   			oldPassword: $scope.oldPassword,
   			newPassword: $scope.newPassword
  		}
  				
  		var req = {
		    method: 'POST',
		    url: url,
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
		        AuthService.logout();
		        $uibModalInstance.dismiss('cancel');
			},
			function error(err){
				$scope.showSpinner = false;
				SweetAlert.swal("Error!", "Mật khẩu cũ không đúng!", "error");
			});
	};

	$scope.checkPassword = function(){
		$scope.$error = $scope.newPassword !== $scope.confirmPassword;
	};
});

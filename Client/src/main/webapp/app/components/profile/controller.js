app.controller('profileController', function($rootScope, $scope, Modal, userManager, SweetAlert, normalUserUrl){
	$scope.isEditAccountInfo = false;
	var editedUser = $rootScope.user;

	$scope.changePasswordModal = function(){
		Modal.changePasswordModal();
	}

	$scope.editAccountInfo = function(){		
		$scope.isEditAccountInfo = !$scope.isEditAccountInfo;
	}

	$scope.editAccountInfoSubmit = function(){
		$rootScope.user.name = $scope.user.name;
		$rootScope.user.identyfyCard = $scope.user.identyfyCard;
		$rootScope.user.phoneNumber = $scope.user.phoneNumber;

		userManager.updateUser($rootScope.user.id,$rootScope.user,normalUserUrl);

		SweetAlert.swal({
        	title: "OK",
        	text: "Bạn đã thay đổi thông tin thành công!",
        	type: "success",
        	timer: 1000,
        	showConfirmButton: false
        });
        $scope.isEditAccountInfo = !$scope.isEditAccountInfo;
	}
});

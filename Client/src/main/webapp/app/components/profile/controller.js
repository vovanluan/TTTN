app.controller('profileController', function($rootScope, $scope, $http, Modal, userManager, SweetAlert, normalUserUrl, officialUserUrl, vicePresidentUserUrl, divisionUserUrl, adminUserUrl, AuthService, NORMALUSER_ACCESS, Upload, clientId) {
	$scope.isEditAccountInfo = false;
	var editedUser = $rootScope.user;
	console.log($rootScope.user);

	$scope.isNormalUser = function () {
        return AuthService.isAuthorized(NORMALUSER_ACCESS);
    }

	$scope.changePasswordModal = function() {
		Modal.changePasswordModal();
	}

	$scope.editAccountInfo = function() {		
		$scope.isEditAccountInfo = !$scope.isEditAccountInfo;
	}

	$scope.editAccountInfoSubmit = function() {
		$rootScope.user.name = $scope.user.name;
		var userUrl;

		if($rootScope.user.type == 'normal') {
			$rootScope.user.identyfyCard = $scope.user.identyfyCard;
			$rootScope.user.phoneNumber = $scope.user.phoneNumber;
			url = normalUserUrl;
		}

		if($rootScope.user.type == 'official') {
			userUrl = officialUserUrl;
		}

		if($rootScope.user.type == 'division') {
			userUrl = divisionUserUrl;
		}

		if($rootScope.user.type == 'vice_president') {
			userUrl = vicePresidentUserUrl;
		}

		if($rootScope.user.type == 'admin') {
			userUrl = adminUserUrl;
		}

		if($scope.avatar) {
            Upload.base64DataUrl($scope.avatar).then(
                function (url) {
                    var uploadImageBase64 = url.replace(/data:image\/(png|jpg|jpeg);base64,/, "");
                    $http({
                        headers: {'Authorization': 'Client-ID ' + clientId},
                        url: '  https://api.imgur.com/3/upload',
                        method: 'POST',
                        data: {
                            image: uploadImageBase64,
                            'type':'base64'
                        }
                    }).then(function successCallback(response) {
                        console.log("data link : " + response.data.data.link);
                        $rootScope.user.avatar = response.data.data.link;
                        
                        userManager.updateUser($rootScope.user.id,$rootScope.user,userUrl).then(
                        	function success() {
                        		$scope.showSpinner = false;
                                SweetAlert.swal({
                                    title: "OK",
                                    text: "Bạn đã gửi thay đổi thông tin thành công!",
                                    type: "success",
                                    timer: 1000,
                                    showConfirmButton: false
                                });
                        	},
                        	function error(err){
                                $scope.showSpinner = false;
                                SweetAlert.swal("Error!", "Xảy ra lỗi khi gửi yêu cầu!", "error");
                            }
                        );

                    }, function errorCallback(err) {
                        $scope.showSpinner = false;
                        SweetAlert.swal("Error!", "Xảy ra lỗi khi upload ảnh!", "error");
                    });
                });
        }
        else {
            userManager.updateUser($rootScope.user.id,$rootScope.user,userUrl).then(
                function success() {
                    $scope.showSpinner = false;
                    SweetAlert.swal({
                        title: "OK",
                        text: "Bạn đã gửi thay đổi thông tin thành công!",
                        type: "success",
                        timer: 1000,
                        showConfirmButton: false
                    });
                },
                function error(err){
                    $scope.showSpinner = false;
                    SweetAlert.swal("Error!", "Xảy ra lỗi!", "error");
                }
            );
        }
        $scope.isEditAccountInfo = !$scope.isEditAccountInfo;
	}
});

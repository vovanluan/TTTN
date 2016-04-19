app.controller('signUpModalController', ['$scope', '$http', '$uibModalInstance', 'userUrl', function($scope, $http, $uibModalInstance, userUrl){
	$scope.signUp = function(){
		if(!($scope.password === $scope.confirmPassword)) {
			$scope.error = "Mật khẩu không khớp!";
			$('#passwordInputSignup').focus();
		}
		else {
			$http.get(userUrl + "/getUserByEmail", {
				params: {email: $scope.email}
			}).then(
				function successCallBack(response){
					// If response.data is null,
					if(!(angular.isObject(response.data))) {
						$http.get(userUrl + "/getUserById", {
							params: {id: $scope.id}
						}).then(
							function successCallBack(response){
								if(angular.isObject(response.data)) {
									$scope.error = "CMND đã đăng ký.Nếu bạn đã có tài khoản, vui lòng đăng nhập!"
								}
								else {
									// POST user to server
									var user = new Object();
									user.userName = $scope.name;
									user.userEmail = $scope.email;
									user.userId = $scope.id;
									user.userPhone = $scope.phone;
									user.passWord = $scope.password;
									var role = new Object();
									role.roleId = 1;
									role.roleName = 'user';
									user.roleId = role;
									$http.post(userUrl, JSON.stringify(user)).then(
										function successCallBack(response){
											$uibModalInstance.close(user);
										},
										function errorCallBack(response){
											$scope.error = "Xảy ra lỗi khi tạo tài khoản mới!";
										});
								}
							},
							function errorCallBack(argument) {

							});
					}
					else {
						$scope.error = "Email đã đăng ký. Nếu bạn đã có tài khoản, vui lòng đăng nhập!";
					}
				},
				function errorCallBack(response){

				}
			);
		}
	};
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}
}]);
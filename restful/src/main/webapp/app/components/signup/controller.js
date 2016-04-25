app.controller('signUpModalController',
	function($scope, $http, $uibModalInstance, userUrl, AuthService){
	$scope.signUp = function(){
		if(!($scope.password === $scope.confirmPassword)) {
			$scope.error = "Mật khẩu không khớp!";
			$('#passwordInputSignup').focus();
		}
		else {
/*			$http.get(userUrl + "/getUserByEmail", {
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
						            AuthService.save(data, function(res) {
						                if (res.type == false) {
						                    alert(res.data)
						                } else {
						                    $localStorage.token = res.data.token;
						                    $uibModalInstance.close(user);
						                    window.location = "/"   
						                }
						            }, function() {
						                $rootScope.error = 'Failed to signup';
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
			);*/
			// POST user to server
			var user = new Object();
			user.name = $scope.name;
			user.email = $scope.email;
			user.identifyCard = $scope.id;
			user.phoneNumber = $scope.phone;
			user.passWord = $scope.password;
			console.log(JSON.stringify(user));
            AuthService.signup(user, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token;
                    $uibModalInstance.close(user);
                    window.location = "/"   
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
            });
		}
	};
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}
});
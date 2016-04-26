app.controller('logInModalController',
	function($rootScope, $scope, $localStorage, $uibModalInstance, userUrl, AuthService, jwtHelper){
	$scope.logIn = function(){
	    var data = {
	        email: $scope.email,
	        password: $scope.password
	    }
	    AuthService.signin(data, function(res) {
	        if (res.type == false) {
	            alert(res.data);    
	        } else {
	        	// Get user information from db and update user role
	        	$rootScope.user = res;
	            $localStorage.token = res.token;
	            var tokenPayload = jwtHelper.decodeToken($localStorage.token);
	            $rootScope.userRole = tokenPayload.role;
	            $uibModalInstance.close(res);
	        }
	    }, function() {
	        $scope.error = 'Failed to signin';
            $('#email').focus();        
	    });
	};
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}
});
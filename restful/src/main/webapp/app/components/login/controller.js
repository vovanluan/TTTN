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
	            $localStorage.token = res;
	            var tokenPayload = jwtHelper.decodeToken(res);
	            console.log(tokenPayload);
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
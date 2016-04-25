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
	            $localStorage.token = res.data.token;
	            $uibModalInstance.close(response.data);
	            window.location = "/";    
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
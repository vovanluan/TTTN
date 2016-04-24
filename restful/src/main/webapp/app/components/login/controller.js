app.controller('logInModalController', ['$rootScope','$scope', '$localStorage', '$uibModalInstance', 'userUrl', 'Auth',
 function($rootScope, $scope, $localStorage, $uibModalInstance, userUrl, Auth){
	$scope.logIn = function(){
	    var data = {
	        email: $scope.email,
	        password: $scope.password
	    }
	    Auth.signin(data, function(res) {
	        if (res.type == false) {
	            alert(res.data);    
	        } else {
	        	$rootScope.authenticated = true;
	            $localStorage.token = res.data.token;
	            $uibModalInstance.close(response.data);
	            window.location = "/";    
	        }
	    }, function() {
	        $scope.error = 'Failed to signin';
            $('#email').focus();
            console.log("HERE");	        
	    });
	};
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}
}]);
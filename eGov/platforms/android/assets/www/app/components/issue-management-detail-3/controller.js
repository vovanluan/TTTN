app.controller('issueManagementDetail3ModalController', function($rootScope, $scope, $mdDialog, userManager, $filter, DIVISION_ACCESS, AuthService) {

	$scope.cancel = function(){
		$mdDialog.cancel();
	};

    userManager.loadAllUsers().then(function(users){    
        $scope.vicePresidents = $filter('filter')(users, {'userType': 'vice_president'});
    });

});
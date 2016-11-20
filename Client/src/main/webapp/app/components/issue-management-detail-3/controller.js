app.controller('issueManagementDetail3ModalController', function($rootScope, $scope, $mdDialog, userManager, $filter, DIVISION_ACCESS, AuthService) {

	$scope.cancel = function(){
		$mdDialog.cancel();
	};

    $scope.isDivision = function () {
        return AuthService.isAuthorized(DIVISION_ACCESS);
    }
    userManager.loadAllUsers().then(function(users){    
        $scope.vicePresidents = $filter('filter')(users, {'userType': 'vice_president'});
    });

	$scope.vicePresidentApproval = function() {
    //     $scope.requestIndex.division = $scope.division;
    //     $scope.requestIndex.statusId = 'DA_CHUYEN'; 
    //     console.log($scope.requestIndex);
    //     requestManager.updateRequest($scope.requestIndex.serviceRequestId,$scope.requestIndex).then(
    //     	function success() {
    //     		requestManager.loadAllRequests().then(function(requests){
				// 	$rootScope.requests = requests;
				// });
    //     	},
    //     	function error(err) {
    //     	}
    //     );
	};
});
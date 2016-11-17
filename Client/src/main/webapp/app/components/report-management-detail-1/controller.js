app.controller('reportManagementDetail1ModalController', function($rootScope, $scope, $mdDialog, requestManager) {

	$scope.cancel = function(){
		$mdDialog.cancel();
	};

	$scope.moveIssue = function() {
        $scope.requestIndex.division = $scope.division;
        $scope.requestIndex.statusId = 'DA_CHUYEN'; 
        console.log($scope.requestIndex);
        requestManager.updateRequest($scope.requestIndex.serviceRequestId,$scope.requestIndex).then(
        	function success() {
        		requestManager.loadAllRequests().then(function(requests){
					$rootScope.requests = requests;
				});
        	},
        	function error(err) {
        	}
        );
		
	};
});
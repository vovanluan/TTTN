app.controller('reportManagementDetailModalController', function($rootScope, $scope, $uibModalInstance, requestManager, requestIndex) {
	$scope.requestIndex = requestIndex;
    /* testing show list offices */

    this.offices = $rootScope.offices;
    console.log($scope.offices);
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	};

	$scope.moveIssue = function() {
        requestManager.updateRequest(requestIndex.id, requestIndex);
	};


});
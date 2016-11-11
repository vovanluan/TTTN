app.controller('reportManagementDetailModalController', function($rootScope, $scope, $uibModalInstance, requestManager, requestIndex) {
	$scope.requestIndex = requestIndex;
    console.log(requestIndex);
    /* testing show list offices */
    var office1 = new Object();
    $scope.offices = [
        {id: 1, name: 'Ban quản lý điện nước'},
        {id: 2, name: 'Ban quản lý môi trường'}
    ];
    console.log($scope.offices);
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	};

	$scope.moveIssue = function() {
        requestManager.updateRequest(requestIndex.id, requestIndex);
	};


});
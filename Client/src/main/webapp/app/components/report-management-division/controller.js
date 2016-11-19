app.controller('reportManagementDivisionController', function($rootScope, $scope, userManager, SweetAlert, $mdDialog) {
	$scope.url = '';
	$scope.controller = '';
	$scope.myFilter = {division: {id:  $rootScope.user.division.id}, statusId: 'DA_CHUYEN'};

	$scope.movedIssuesFilter = function() {
		$scope.myFilter = {division: {id:  $rootScope.user.division.id}, statusId: 'DA_CHUYEN'};
		console.log($scope.myFilter);
	}

	$scope.openModal = function(id) {
		$scope.requestIndex = $scope.requests[id-1];

		switch($scope.requestIndex.statusId) {
			case 'DA_CHUYEN':
				$scope.url = 'app/components/report-management-detail-1/view.html';
				$scope.controller = 'reportManagementDetail1ModalController';
				break;
		}

		$mdDialog.show({
			templateUrl: $scope.url,
			controller: $scope.controller,
			bindToController: true,
			bindToController: true,
		    clickOutsideToClose: true,
		    preserveScope: true,
		    scope: this
		})
	}

});
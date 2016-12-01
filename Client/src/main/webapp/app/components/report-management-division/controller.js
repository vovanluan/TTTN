app.controller('reportManagementDivisionController', function($rootScope, $scope, userManager, SweetAlert,
	$mdDialog, PagerService, $filter) {
	$scope.url = '';
	$scope.controller = '';
	$scope.myFilter = {division: {id:  $rootScope.user.division.id}, statusId: 'DA_CHUYEN'};
	$scope.statusType = 'DA_CHUYEN';
    $scope.requestPerPage = 2;
    $scope.pager = {};

    $scope.setPage = function(page, filterItems) {
        if (page < 1 || (page > $scope.pager.totalPages && $scope.pager.totalPages != 0)) {
            return;
        }
        // get pager object from service
        $scope.pager = PagerService.GetPager(filterItems.length, page, $scope.requestPerPage);
        // get current page of items
        $scope.showRequests = filterItems.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }

	$scope.filteredRequests = $filter('filter')($rootScope.requests,{division: {id:  $rootScope.user.division.id},
		statusId: $scope.statusType});
    $scope.setPage(1, $scope.filteredRequests);

    $scope.$watch('statusType', function (newVal, oldVal) {
		$scope.filteredRequests = $filter('filter')($rootScope.requests,{division: {id:  $rootScope.user.division.id},
			statusId: $scope.statusType});
        $scope.setPage(1, $scope.filteredRequests);
    });

    $scope.$watch('requests', function (newVal, oldVal) {
        $scope.filteredRequests = $filter('filter')($rootScope.requests,{division: {id:  $rootScope.user.division.id},
            statusId: $scope.statusType});
        $scope.setPage(1, $scope.filteredRequests);
    });



	$scope.movedIssuesFilter = function() {
		$scope.myFilter = {division: {id:  $rootScope.user.division.id}, statusId: 'DA_CHUYEN'};
		console.log($scope.myFilter);
	}

	$scope.openModal = function(id) {
		$scope.requestIndex = $scope.requests[id-1];

		switch($scope.requestIndex.statusId) {
			case 'DA_CHUYEN':
				$scope.url = 'app/components/issue-management-detail-1/view.html';
				$scope.controller = 'issueManagementDetail1ModalController';
				break;
			case 'DA_XU_LY':
				$scope.url = 'app/components/issue-management-detail-2/view.html';
				$scope.controller = 'issueManagementDetail2ModalController';
				break;
			case 'DA_DUYET':
				$scope.url = 'app/components/issue-management-detail-3/view.html';
				$scope.controller = 'issueManagementDetail3ModalController';
				break;
		}

		$mdDialog.show({
			templateUrl: $scope.url,
			controller: $scope.controller,
			bindToController: true,
		    clickOutsideToClose: true,
		    preserveScope: true,
		    scope: this
		})
	}

});
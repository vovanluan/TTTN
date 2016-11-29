app.controller('reportManagementController', function($rootScope, $scope, userManager, SweetAlert, requestManager,
	commentManager, SweetAlert, $mdDialog, $filter, PagerService) {
	$scope.url = '';
	$scope.controller = '';
	$scope.statusType = 'DA_TIEP_NHAN';
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


	$scope.filteredRequests = $filter('filter')($rootScope.requests,{'statusId':$scope.statusType});
    $scope.setPage(1, $scope.filteredRequests);

    $scope.$watch('statusType + $rootScope.requests', function (newVal, oldVal) {
        $scope.filteredRequests = $filter('filter')($rootScope.requests,{'statusId':$scope.statusType});
        $scope.setPage(1, $scope.filteredRequests);
    });
	$scope.openModal = function(id) {
		$scope.requestIndex = $scope.requests[id-1];

		switch($scope.requestIndex.statusId) {
			case 'DA_TIEP_NHAN':
				$scope.url = 'app/components/report-management-detail-0/view.html';
				$scope.controller = 'reportManagementDetail0ModalController';
				break;
			case 'DA_CHUYEN':
				$scope.url = 'app/components/report-management-detail-1/view.html';
				$scope.controller = 'reportManagementDetail1ModalController';
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
			bindToController: true,
		    clickOutsideToClose: true,
		    preserveScope: true,
		    scope: this
		})
	}

	$scope.deleteIssue = function(id) {
		SweetAlert.swal({
			   title: "Bạn có chắc muốn xóa phản ảnh này?",
			   type: "warning",
			   showCancelButton: true,
			   cancelButtonText: "Hủy bỏ",
			   confirmButtonColor: "#DD6B55",
			   confirmButtonText: "Xóa",
			   closeOnConfirm: true,
			   closeOnCancel: true
			},
			function(isConfirm){
				if (isConfirm) {
			   		$scope.requests[id-1].statusId = "DA_XOA";
			   		console.log($scope.requests[id-1]);
			        requestManager.updateRequest($scope.requests[id-1].serviceRequestId,$scope.requests[id-1]).then(
			        	function success() {
			        		requestManager.loadAllRequests().then(function(requests){
								$rootScope.requests = requests;
							});
			        		SweetAlert.swal("OK!", "Bạn đã xóa phản ánh thành công!", "success");
			        	},
			        	function error(err) {
			        		SweetAlert.swal("Error!", "Xảy ra lỗi khi gửi yêu cầu!", "error");
			        	}
			        );
				}
			}
		);
	}
});
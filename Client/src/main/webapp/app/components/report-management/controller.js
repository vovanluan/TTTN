app.controller('reportManagementController', function($rootScope, $scope, userManager, SweetAlert, requestManager,
	commentManager, SweetAlert, $mdDialog, $filter, PagerService) {
	$scope.url = '';
	$scope.controller = '';
	$scope.statusType = 'DA_TIEP_NHAN';
    $scope.requestPerPage = 1;
    $scope.pager = {};

    $scope.setPage = function(page, filterItems) {
        console.log(filterItems);
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

    $scope.$watch('statusType', function (newVal, oldVal) {
        $scope.filteredRequests = $filter('filter')($rootScope.requests,{'statusId':$scope.statusType});
        $scope.setPage(1, $scope.filteredRequests);
    });

    $scope.$watch('requests', function (newVal, oldVal) {
        console.log("Update requests");
        $scope.filteredRequests = $filter('filter')($rootScope.requests,{'statusId':$scope.statusType});
        $scope.setPage(1, $scope.filteredRequests);
    });

	$scope.openModal = function(id) {
		$scope.requestIndex = $scope.requests[id-1];

		switch($scope.requestIndex.statusId) {
			case 'DA_TIEP_NHAN':
				$scope.url = 'app/components/issue-management-detail-0/view.html';
				$scope.controller = 'issueManagementDetail0ModalController';
				break;
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
			case 'DA_XOA':
				return;
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
					var obj = new Object();
					obj = $rootScope.requests[id-1];
					obj.statusId = "DA_XOA";
			        requestManager.updateRequest(obj.serviceRequestId,obj).then(
			        	function success() {
			        		requestManager.loadAllRequests().then(function(requests){
								$rootScope.requests = requests;
								console.log($rootScope.requests);
								$scope.filteredRequests = $filter('filter')($rootScope.requests,{'statusId':$scope.statusType});
							    $scope.setPage(1, $scope.filteredRequests);
							});

							$scope.filteredRequests = $filter('filter')($rootScope.requests,{'statusId':'DA_TIEP_NHAN'});
    						$scope.setPage(1, $scope.filteredRequests);

			        		SweetAlert.swal({
					        	title: "OK",
					        	text: "Xóa phản ánh thành công!",
					        	type: "success",
					        	timer: 1000,
					        	showConfirmButton: false
					        });
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
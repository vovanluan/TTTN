app.controller('reportManagementController', function($rootScope, $scope, userManager, SweetAlert, requestManager, commentManager, SweetAlert, $mdDialog) {
	requestManager.loadAllRequests().then(function(requests) {
		$scope.requests = requests;
		console.log(requests);
		for(var i=0;i<requests.length;i++){
			console.log(requests[i].statusId);
		}
	});

	commentManager.loadAllComments().then(function(comments) {
		$scope.comments = comments;
	});

	$scope.openModal = function(id) {
		$scope.requestIndex = $scope.requests[id-1];
		console.log($scope.requestIndex);
		$mdDialog.show({
			templateUrl: 'app/components/reportManagementDetail/view.html',
			controller: 'reportManagementDetailModalController',
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
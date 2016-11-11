app.controller('reportManagementController', function($rootScope, $scope, Modal, userManager, SweetAlert, requestManager, commentManager, SweetAlert){
	requestManager.loadAllRequests().then(function(requests){
		$scope.requests = requests;
		console.log(requests);
		for(var i=0;i<requests.length;i++){
			console.log(requests[i].statusId);
		}
	});

	commentManager.loadAllComments().then(function(comments){
		$scope.comments = comments;
	});

	$scope.openModal = function(id) {
		$scope.requestIndex = $scope.requests[id-1];
		Modal.reportManagementDetailModal($scope.requestIndex);
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
				if (isConfirm)
			   		console.log(id);
			});
	}
});
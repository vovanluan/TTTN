app.controller('issueManagementDetail0ModalController', function($rootScope, $scope, $mdDialog, requestManager,
    dateTimeFilter, commentManager, SweetAlert, AuthService, OFFICIAL_ACCESS, $filter) {

	$scope.cancel = function() {
		$mdDialog.cancel();
	};

    $scope.isOfficial = function () {
        return AuthService.isAuthorized(OFFICIAL_ACCESS);
    };

	$scope.moveIssue = function() {
        $scope.updatedRequest = $scope.requestIndex;
        $scope.updatedRequest.division = $scope.division;
        $scope.updatedRequest.statusId = 'DA_CHUYEN';
        requestManager.updateRequest($scope.requestIndex.serviceRequestId,$scope.updatedRequest).then(
        	function success() {
                $mdDialog.cancel();
        		requestManager.loadAllRequests().then(function(requests){
					$rootScope.requests = requests;
				});

                $scope.filteredRequests = $filter('filter')($rootScope.requests,{'statusId':'DA_TIEP_NHAN'});
                $scope.setPageAfterMoving($scope.filteredRequests); 
                
                var comment = new Object();
                comment.user = $rootScope.user;
                comment.request = $scope.updatedRequest;
                comment.content = $scope.comment;
                comment.postDatetime = dateTimeFilter(new Date());
                commentManager.postComment(comment).then(
                    function success(){
                        $rootScope.comments.push(comment);
                    },
                    function error(){
                        console.log("Error");
                    }
                );
        	},
        	function error(err) {
                SweetAlert.swal("Error!", "Xảy ra lỗi khi chuyển phản ánh!", "error");
        	}
        );
	};
});
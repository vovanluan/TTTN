app.controller('issueManagementDetail2ModalController', function($rootScope, $scope, $mdDialog, VICE_PRESIDENT_ACCESS, AuthService, requestManager, commentManager, dateTimeFilter, $filter) {

	$scope.cancel = function(){
		$mdDialog.cancel();
	};

    $scope.isVicePresident = function () {
        return AuthService.isAuthorized(VICE_PRESIDENT_ACCESS);
    };

	$scope.approve = function() {
        $scope.requestIndex.vicePresidentApproved = $rootScope.user;
        $scope.requestIndex.statusId = 'DA_DUYET'; 
        console.log($scope.requestIndex);
        requestManager.updateRequest($scope.requestIndex.serviceRequestId,$scope.requestIndex).then(
        	function success() {
                $mdDialog.cancel();
        		requestManager.loadAllRequests().then(function(requests){
					$rootScope.requests = requests;
				});

                $scope.filteredRequests = $filter('filter')($rootScope.requests,{'statusId':'DA_XU_LY'});
                $scope.setPageAfterMoving($scope.filteredRequests); 

                var comment = new Object();
                comment.user = $rootScope.user;
                comment.request = $scope.requestIndex;
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
        	}
        );

        
	};
});
app.controller('issueManagementDetail1ModalController', function($rootScope, $scope, $mdDialog,requestManager, userManager, $filter, DIVISION_ACCESS, AuthService, dateTimeFilter, commentManager) {

	$scope.cancel = function(){
		$mdDialog.cancel();
	};

    $scope.isDivision = function () {
        return AuthService.isAuthorized(DIVISION_ACCESS);
    }

    userManager.loadAllUsers().then(function(users){    
        $scope.vicePresidents = $filter('filter')(users, {'type': 'vice_president'});
    });

	$scope.vicePresidentApproval = function() {
        $scope.requestIndex.vicePresidentReceived = $scope.vicePresident;
        $scope.requestIndex.statusId = 'DA_XU_LY'; 
        requestManager.updateRequest($scope.requestIndex.serviceRequestId,$scope.requestIndex).then(
        	function success() {
                $mdDialog.cancel();
        		requestManager.loadAllRequests().then(function(requests){
					$rootScope.requests = requests;
				});

                $scope.filteredRequests = $filter('filter')($rootScope.requests,$scope.myFilter);
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
                console.log("error");
        	}
        );

        
	};
});
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
        console.log($scope.vicePresident);
        $scope.requestIndex.vicePresidentReceived = $scope.vicePresident;
        $scope.requestIndex.statusId = 'DA_XU_LY'; 
        console.log($scope.requestIndex);
        requestManager.updateRequest($scope.requestIndex.serviceRequestId,$scope.requestIndex).then(
        	function success() {
        		requestManager.loadAllRequests().then(function(requests){
					$rootScope.requests = requests;
				});
        	},
        	function error(err) {
        	}
        );

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
	};
});
app.controller('reportManagementDetail0ModalController', function($rootScope, $scope, $mdDialog, requestManager, dateTimeFilter, commentManager) {

	$scope.cancel = function() {
		$mdDialog.cancel();
	};

	$scope.moveIssue = function() {
        $scope.requestIndex.division = $scope.division;
        $scope.requestIndex.statusId = 'DA_CHUYEN'; 
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
                $scope.comments.push(comment);
                $rootScope.comments.push(comment);
            },
            function error(){
                console.log("Error");
            }
        );  		
	};


});
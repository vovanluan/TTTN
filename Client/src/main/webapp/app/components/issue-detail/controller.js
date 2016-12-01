app.controller('issueDetailController',function(AuthService, USER_ACCESS, $rootScope, $scope, $routeParams, dateTimeFilter, $localStorage, Modal, commentManager){
	$scope.requestIndex = {};
	$scope.comments = [];
	$scope.issue_id = $routeParams.issueId;
	$scope.countComment = {};

	angular.forEach($rootScope.comments, function(comment,index){
		if(comment.request.serviceRequestId==$scope.issue_id)
			$scope.comments.push(comment);
	});

	for(var i = 0; i < $rootScope.requests.length; i++){
		if($scope.issue_id == $rootScope.requests[i].serviceRequestId) {
			$scope.requestIndex = $rootScope.requests[i];
			break;
		}
	}

    // Watch userRole change
    $scope.$watch(function (){
        return $localStorage;
    }, function() {
        $scope.isAuthorizedUser = function () {
            return AuthService.isAuthorized(USER_ACCESS);
        };
    });

    $scope.convertStatusId = function(text) {
        switch(text) {
            case 'DA_TIEP_NHAN':
                return 'ĐÃ TIẾP NHẬN';
            case 'DA_CHUYEN':
                return 'ĐANG XỬ LÝ';
            case 'DA_XU_LY':
                return 'ĐÃ XỬ LÝ';
            case 'DA_DUYET':
                return 'ĐÃ DUYỆT';
            case 'DA_XOA':
                return 'ĐÃ XÓA';
        }
    }

	$scope.submitComment = function(requestObj){
		if(AuthService.isAuthorized(USER_ACCESS) || $rootScope.userRole == 'guest')
		{
			var comment = new Object();
			var guest = new Object();

			comment.user = $rootScope.user;
			comment.request = requestObj;
			comment.content = $scope.textContent;
			comment.postDatetime = dateTimeFilter(new Date());
			commentManager.postComment(comment).then(
				function success(){
					$scope.comments.push(comment);
					$rootScope.comments.push(comment);
				},
				function error(){
					console.log("Error");
				});

			$scope.textContent = '';
		}
	 	else {
	 		Modal.logInModal();
	 	}
	}

    $scope.logInModal = function(){
        Modal.logInModal();
    }
});
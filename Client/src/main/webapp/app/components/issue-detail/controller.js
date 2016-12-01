app.controller('issueDetailController',function(AuthService, USER_ACCESS, $rootScope, $scope, $routeParams,
    dateTimeFilter, $localStorage, Modal, commentManager, PagerService){
    $scope.requestPerPage = 5;
    $scope.requestIndex = {};
    $scope.comments = [];
    $scope.issue_id = $routeParams.issueId;
    $scope.countComment = {};

    initController();
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
            case 'DA_DUYET':
                return 'ĐÃ XỬ LÝ';
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

    function initController() {
        $scope.pager = {};
        $scope.setPage = setPage;
        $scope.filteredRequests = [];
        $.each($rootScope.requests, function (index, req) {
            if (req.statusId != "DA_XOA") {
                $scope.filteredRequests.push(req);
            }
        })
        setPage(1, $scope.filteredRequests);
        // initialize to page 1

    }
    function setPage(page, filterItems) {
        if (page < 1 || (page > $scope.pager.totalPages && $scope.pager.totalPages != 0)) {
            return;
        }
        // get pager object from service
        $scope.pager = PagerService.GetPager(filterItems.length, page, $scope.requestPerPage);
        // get current page of items
        $scope.showRequests = filterItems.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
        console.log($scope.showRequests);
    }

});
app.controller('issueByMeController', function ($rootScope, $scope, $filter, requestManager, userManager,
    PagerService, $routeParams){
    $scope.userId = $routeParams.userId;
    $scope.requestPerPage = 2;
    $scope.date = new Date();

    $scope.pager = {};
    $scope.setPage = setPage;

    userManager.loadAllUsers().then(function (users){
        $scope.user = $filter('filter')(users,{id:  $scope.userId})[0];
        console.log($scope.user.name);
    });

    $scope.requestsByMe = $filter('filter')($rootScope.requests,{user: {id:  $scope.userId}}).reverse();
    setPage(1, $scope.requestsByMe);
    $scope.convertStatusId = function(text) {
        switch(text) {
            case 'DA_TIEP_NHAN':
                return 'ĐÃ TIẾP NHẬN';
            case 'DA_CHUYEN':
                return 'CHỜ XỬ LÝ';
            case 'DA_XU_LY':
            case 'DA_DUYET':
                return 'ĐÃ GIẢI QUYẾT';
            case 'DA_XOA':
                return 'ĐÃ XÓA';
        }
    }


    function setPage(page, filterItems) {
        if (page < 1 || (page > $scope.pager.totalPages && $scope.pager.totalPages != 0)) {
            return;
        }
        // get pager object from service
        $scope.pager = PagerService.GetPager(filterItems.length, page, $scope.requestPerPage);
        // get current page of items
        $scope.showRequests = filterItems.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }
});

app.controller('authorizationManagementController', function($rootScope, $scope, userUrl, userManager, $mdDialog, $filter, PagerService){
    $scope.roles = [
        {role: 'normal', name: 'Người dùng bình thường'},
        {role: 'admin', name: 'Admin'},
        {role: 'official', name: 'Chuyên viên'},
        {role: 'division', name: 'Cơ quan chuyên trách'},
        {role: 'vice_president', name: 'Phó chủ tịch'},
    ]

    $scope.getRoleName = function (type) {
        var name = '';
        for(var i = 0; i < $scope.roles.length; i++) {
            if ($scope.roles[i].role == type) {
                name = $scope.roles[i].name;
                break;
            }
        }
        return name;
    }

    $scope.update = function(user) {
        userManager.updateUser(user.id, user, userUrl).then(function() {
            $scope.updateStatus = "Cập nhật thành công!";
        }, function(response) {
            console.log("Error: " + response);
        });
    }

    $scope.postNewOfficer = function(id) {
        $mdDialog.show({
            templateUrl: 'app/components/post-officer/view.html',
            controller: 'postOfficerModalController',
            bindToController: true,
            bindToController: true,
            clickOutsideToClose: true,
            preserveScope: true,
            scope: this
        })
    }

    $scope.pager = {};
    $scope.setPage = setPage;

    initController();

    function initController() {
        userManager.loadAllUsers().then(function(users){
            $rootScope.users = users;
            // functions have been describe process the data for display
            $scope.setPage(1);
            $scope.$watch('users', function (newVal, oldVal) {
                $scope.setPage(1);
            });
        });
    }

    function setPage(page) {
        if (page < 1 || page > $scope.pager.totalPages) {
            return;
        }

        // get pager object from service
        $scope.pager = PagerService.GetPager($rootScope.users.length, page);
        // get current page of items
        $scope.showUsers = $rootScope.users.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }
});

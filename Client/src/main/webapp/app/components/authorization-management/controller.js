app.controller('authorizationManagementController', function($rootScope, $scope, userUrl, userManager, $mdDialog){
    $scope.roles = ["normal", "admin", "official", "division", 'vice_president'];
    $scope.updateStatus = "";
    userManager.loadAllUsers().then(function(users){
        $rootScope.users = users;
    });
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
});

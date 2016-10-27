app.controller('authorizationManagementController', function($rootScope, $scope, userManager, userUrl, normalUserUrl, adminUserUrl, officialUserUrl,
    vicePresidentUserUrl){
    $scope.roles = ["normal", "admin", "official", "division"];
    $scope.updateStatus = "";
    userManager.loadAllUsers().then(function(users){
        $scope.users = users;
        console.log(users);
    });
    $scope.update = function(user) {
        console.log(user);
        userManager.updateUser(user.id, user, userUrl).then(function() {
            $scope.updateStatus = "Cập nhật thành công!";
        }, function(response) {
            console.log("Error: " + response);
        }
        );
    }
});

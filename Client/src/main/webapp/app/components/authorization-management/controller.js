app.controller('authorizationManagementController', function($rootScope, $scope, userManager){
    $scope.roles = ["normal", "admin", "official", "division"];
    $scope.updateStatus = "";
    userManager.loadAllUsers().then(function(users){
        $scope.users = users;
        console.log(users);
    });
    $scope.update = function(user) {
        userManager.updateUser(user.id, user).then(function() {
            $scope.updateStatus = "Cập nhật thành công!";
        }, function(response) {
            console.log("Error: " + response);
        }
        );
    }
});

app.controller('authorizationManagementController', function($rootScope, $scope, userManager){
    userManager.loadAllUsers().then(function(users){
        $scope.users = users;
        console.log(users);
    });
});

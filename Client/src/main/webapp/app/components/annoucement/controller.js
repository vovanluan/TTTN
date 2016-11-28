app.controller('annoucementController', function($rootScope, $scope, $mdDialog, MANAGEMENT_ACCESS, AuthService) {
    $scope.annoucementTypes = $rootScope.annoucementTypes;
    $scope.postAnnoucement = function() {
        $mdDialog.show({
            templateUrl: 'app/components/post-annoucement/view.html',
            controller: 'postAnnoucementModalController',
            bindToController: true,
            bindToController: true,
            clickOutsideToClose: true,
            preserveScope: true,
            scope: this
        })
    }
    $scope.isManager = function () {
        return AuthService.isAuthorized(MANAGEMENT_ACCESS);
    }
});
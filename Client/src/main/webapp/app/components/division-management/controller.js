app.controller('divisionManagementController', function($rootScope, $scope, divisionManager, Modal) {

    $scope.postDivision = function() {
        Modal.postDivisionModal();
    }
   
});
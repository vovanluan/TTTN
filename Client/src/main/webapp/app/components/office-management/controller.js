app.controller('officeManagementController', function($rootScope, $scope, officeManager, Modal) {
    $scope.postOffice = function(){
        Modal.postOfficeModal();
    }
});
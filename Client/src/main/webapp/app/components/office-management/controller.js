app.controller('officeManagementController', function($rootScope, $scope, officeManager, Modal) {
    $scope.postOffice = function(){
        Modal.postOfficeModal();
    }
    officeManager.loadAllOffices().then(function(offices) {
        $rootScope.offices = offices;
    });

});
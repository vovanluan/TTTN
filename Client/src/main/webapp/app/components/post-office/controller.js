app.controller('postOfficeController',
    function($rootScope, $scope, $http, $uibModalInstance, officeManager, SweetAlert){
    $scope.showSpinner = false;
    $scope.postOffice = function(){
        var office = new Object();
        office.id = 1;
        office.name = $scope.name;
        officeManager.postOffice(office).then(
                function success(){
                    $scope.showSpinner = false;
                    SweetAlert.swal("OK!", "Cập nhật cơ quan thành công!", "success");
                    officeManager.loadAllOffices().then(function(offices){
                        $rootScope.offices = offices;
                    });
                },
                function error(err){
                    $scope.showSpinner = false;
                    SweetAlert.swal("Error!", "Xảy ra lỗi khi gửi yêu cầu!", "error");
        });;
    };
    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel');
    }

});
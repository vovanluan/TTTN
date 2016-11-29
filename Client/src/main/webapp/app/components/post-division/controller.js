app.controller('postDivisionController',
    function($rootScope, $scope, $http, $uibModalInstance, divisionManager, SweetAlert) {

    $scope.showSpinner = false;

    $scope.postDivision = function(){
        var division = new Object();
        division.id = 1;
        division.name = $scope.name;
        divisionManager.postDivision(division).then(
                function success(){
                    $scope.showSpinner = false;
                    SweetAlert.swal("OK!", "Cập nhật cơ quan thành công!", "success");
                    divisionManager.loadAllDivisions().then(function(divisions){
                        $rootScope.divisions = divisions;
                    });
                     $uibModalInstance.dismiss('cancel');
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
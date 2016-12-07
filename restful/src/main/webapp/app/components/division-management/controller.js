app.controller('divisionManagementController', function($rootScope, $scope, divisionManager, SweetAlert) {

    $scope.postDivision = function(){
        if(!$scope.name){
            return;
        } 
        
        var division = new Object();
        division.id = 1;
        division.name = $scope.name;
        divisionManager.postDivision(division).then(
            function success(){
                $scope.showSpinner = false;
                $scope.name = '';
                SweetAlert.swal({
                    title: "OK",
                    text: "Thêm cơ quan thành công!",
                    type: "success",
                    timer: 1000,
                    showConfirmButton: false
                });    
                divisionManager.loadAllDivisions().then(function(divisions){
                    $rootScope.divisions = divisions;
                });
            },
            function error(err){
                $scope.showSpinner = false;
                SweetAlert.swal("Error!", "Xảy ra lỗi khi gửi yêu cầu!", "error");
        });;
    };
   
});
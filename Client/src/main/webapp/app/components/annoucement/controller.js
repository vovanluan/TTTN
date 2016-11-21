app.controller('annoucementController', function($rootScope, $scope, $mdDialog, MANAGEMENT_ACCESS, AuthService,
    annoucementManager, SweetAlert) {
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

    $scope.deleteReport = function (id) {
        SweetAlert.swal({
               title: "Bạn có chắc muốn xóa thông báo này?",
               type: "warning",
               showCancelButton: true,
               cancelButtonText: "Hủy bỏ",
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Xóa",
               closeOnConfirm: true,
               closeOnCancel: true
            },
            function (isConfirm){
                if (isConfirm) {
                    annoucementManager.deleteAnnoucement(id).then(
                        function success() {
                            annoucementManager.loadAllAnnoucements().then(function(annoucements){
                                $rootScope.annoucements = annoucements;
                            });
                            SweetAlert.swal("OK!", "Bạn đã xóa thông báo thành công!", "success");
                        },
                        function error(err) {
                            SweetAlert.swal("Error!", "Xảy ra lỗi khi xóa thôn báo!", "error");
                        }
                    );
                }
            }
        );
    }
});
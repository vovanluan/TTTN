app.controller('postAnnoucementModalController', function($rootScope, $scope, $mdDialog, Annoucements, dateTimeFilter, annoucementManager, SweetAlert) {
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.submitAnnoucement = function () {
        var annoucement = new Object();
        annoucement.type = $scope.type;
        annoucement.title = $scope.title;
        annoucement.description = $scope.description;
        annoucement.time = dateTimeFilter(new Date());
        console.log(annoucement);
        annoucementManager.postAnnoucement(annoucement).then(
            function success(){
                $scope.showSpinner = false;
                SweetAlert.swal("OK!", "Gửi thông báo thành công!", "success");
                annoucementManager.loadAllAnnoucements().then(function(annoucements){
                    $rootScope.annoucements = annoucements;
                });
                $mdDialog.cancel();
            },
            function error(err){
                $scope.showSpinner = false;
                SweetAlert.swal("Error!", "Xảy ra lỗi khi gửi thông báo!", "error");
        });
    }
});
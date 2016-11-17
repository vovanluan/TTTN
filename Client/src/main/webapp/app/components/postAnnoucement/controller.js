app.controller('postAnnoucementModalController', function($rootScope, $scope, Annoucements, dateTimeFilter, annoucementManager) {
    Annoucements.success(function (annoucements) {
        $scope.types = annoucements;
    }).error(function (error) {
        console.log("Error: " + error);
    })

    $scope.submitAnnoucement = function () {
        var annoucement = new Object();
        annoucement.type = $scope.type;
        annoucement.title = $scope.title;
        annoucement.description = $scope.description;
        annoucement.time = dateTimeFilter(new Date());
        annoucementManager.postAnnoucement(annoucement).then(
            function success(){
                $scope.showSpinner = false;
                SweetAlert.swal("OK!", "Gửi thông báo thành công!", "success");
                annoucementManager.loadAllAnnoucements().then(function(annoucements){
                    $rootScope.annoucements = annoucements;
                });
                $location.path('/annoucement');
            },
            function error(err){
                $scope.showSpinner = false;
                SweetAlert.swal("Error!", "Xảy ra lỗi khi gửi thông báo!", "error");
        });
    }
});
app.controller('postAnnouncementModalController', function($rootScope, $scope, $mdDialog, Announcements, dateTimeFilter, announcementManager, SweetAlert) {
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.submitAnnouncement = function () {
        var announcement = new Object();
        announcement.type = $scope.announcementType;
        announcement.title = $scope.announcementTitle;
        announcement.description = $scope.announcementDescription;
        announcement.time = dateTimeFilter(new Date());
        console.log(announcement);
        announcementManager.postAnnouncement(announcement).then(
            function success(){
                $scope.announcementTitle = '';
                $scope.announcementDescription = '';
                $scope.announcementType = '';
                $scope.showSpinner = false;
                SweetAlert.swal({
                    title: "OK!",
                    text: "Gửi thông báo thành công!",
                    type: "success",
                    timer: 1000,
                    showConfirmButton: false
                });
                announcementManager.loadAllAnnouncements().then(function(announcements){
                    $rootScope.announcements = announcements;
                });
                $mdDialog.cancel();
            },
            function error(err){
                $scope.showSpinner = false;
                SweetAlert.swal("Error!", "Xảy ra lỗi khi gửi thông báo!", "error");
        });
    }
});
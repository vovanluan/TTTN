app.controller('announcementController', function($rootScope, $scope, $mdDialog, MANAGEMENT_ACCESS, AuthService,
    announcementManager, SweetAlert, PagerService, $filter) {
    $scope.type = 'Chính trị - Xã hội';
    $scope.announcementPerPage = 10;
    $scope.pager = {};

    $scope.setPage = function(page, filterItems) {
        if (page < 1 || (page > $scope.pager.totalPages && $scope.pager.totalPages != 0)) {
            return;
        }
        // get pager object from service
        $scope.pager = PagerService.GetPager(filterItems.length, page, $scope.announcementPerPage);
        // get current page of items
        $scope.showAnnouncements = filterItems.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }

    $scope.filteredAnnouncements = $filter('filter')($rootScope.announcements,{'type':$scope.type});
    $scope.setPage(1,$scope.filteredAnnouncements);

    $scope.$watch('type', function (newVal, oldVal) {
        $scope.filteredAnnouncements = $filter('filter')($rootScope.announcements,{'type':newVal});
        $scope.setPage(1,$scope.filteredAnnouncements);
    });

    $scope.postAnnouncement = function() {
        $mdDialog.show({
            templateUrl: 'app/components/post-announcement/view.html',
            controller: 'postAnnouncementModalController',
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

    $scope.deleteAnnouncement = function (id) {
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
                    announcementManager.deleteAnnouncement(id).then(
                        function success() {
                            announcementManager.loadAllAnnouncements().then(function(announcements){
                                $rootScope.announcements = announcements;
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
app.controller('postOfficerModalController', function ($rootScope, $scope, $mdDialog, officialUserUrl, vicePresidentUserUrl,
 divisionUserUrl, $http, SweetAlert, userManager){
    console.log($rootScope.divisions);
    $scope.isDivision = false;
    $scope.officers = [
        {userType: 'official', name: 'Chuyên viên'},
        {userType: 'division', name: 'Cơ quan chuyên trách'},
        {userType: 'vice_president', name: 'Phó chủ tịch'}
    ];

    $scope.$watch("officerType.userType", function (newValue, oldValue) {
        console.log("change value");
        if (newValue == 'division') {
            $scope.isDivision = true;
        }
        else {
            $scope.isDivision = false;
        }
    });
    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.postOfficer = function () {
        $scope.showSpinner = true;
        //Check rePassword matches passWord or not
        if(!($scope.passWord === $scope.rePassWord)) {
            $scope.error = "Mật khẩu không khớp!";
            $('#password').focus();
        }
        else {
            var user = new Object();
            user.name = $scope.name;
            user.email = $scope.email;
            user.passWord = $scope.passWord;
            user.division = $scope.division;
            console.log(JSON.stringify(user));
            $scope.url = '';
            switch ($scope.officer.userType) {
                case 'official':
                    $scope.url = officialUserUrl;
                    break;
                case 'division':
                    $scope.url = divisionUserUrl;
                    break;
                case 'vice_president':
                    $scope.url = vicePresidentUserUrl;
                    break;
                default:
                    $scope.url = '';
            }
            $http.post($scope.url, JSON.stringify(user))
                .success(function() {
                    $mdDialog.cancel();
                    userManager.loadAllUsers().then(function(users){
                        $rootScope.users = users;
                    });
                    SweetAlert.swal({
                        title: "OK",
                        text: "Thêm nhân viên thành công!",
                        type: "success",
                        timer: 1000,
                        showConfirmButton: false
                    });

                })
                .error(function(msg, code) {
                    if(status == 409) {
                        if(data == "email"){
                            $scope.error = "Email này đã được dùng để đăng ký một tài khoản khác";
                            $scope.email = "";
                        }
                        else {
                            $scope.error ="Có lỗi khi đăng ký!";
                        }
                    }
                    else{
                        $scope.error = "Có lỗi khi đăng ký!";
                    }
                });
        }
    }
});
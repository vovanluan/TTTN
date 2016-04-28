app.controller('reportTabController', 
	function($rootScope, $scope, $http, $uibModal, Upload, requestManager, convertServiceCodeFilter, 
		dateTimeFilter, districts, issues, clientId, Modal, AuthService, USER_ACCESS, $location, SweetAlert){
	$scope.tab = 1;
	$scope.issues = issues;
	$scope.serviceType = issues["Điện"];
	$scope.districts = districts;
	$scope.district = districts["1"];
	$scope.latitude = 10.78;
	$scope.longitude = 106.65;

	$scope.tabActivity=[true, false, false, false];
    // Handle show date time
    var dtpicker = $("#dtBox").DateTimePicker({
        dateTimeFormat: "yyyy-MM-dd HH:mm:ss"
    });
    var count = 0;
	$scope.initMap = function(){
		var myLatLng = {lat: 10.78, lng: 106.65};
	    $scope.map = new google.maps.Map(document.getElementById('map'), {
	        zoom: 12,
	        center: myLatLng
	    });   
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function success(pos) {
			    $("#latitude").val(Number((pos.coords.latitude).toFixed(3)));
			    $("#longitude").val(Number((pos.coords.longitude).toFixed(3)));
			    var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
			    var marker = new google.maps.Marker({
			        position: latlng,
			        map: $scope.map,
			        draggable: true,
			        animation: google.maps.Animation.DROP,
			        title: "Di chuyển để xác định đúng vị trí"
			    });
			    $scope.map.setCenter(latlng);
			    $scope.map.setZoom(15);
			    google.maps.event.addListener(marker, "dragend", function (event) {
			        $("#latitude").val(Number((event.latLng.lat()).toFixed(3)));
			        $("#longitude").val(Number((event.latLng.lng()).toFixed(3)));
			        $scope.map.setCenter(event.latLng);
			    });
			}
	            , function (errMsg) {
	            console.log(errMsg);
	        }, {
	            enableHighAccuracy: false,
	            timeout: 6 * 1000,
	            maximumAge: 1000 * 60 * 10
	        });
	    } else {
	        alert("Do not support Geolocation");
	    }
	};

	var c = 0;
	$scope.$watch('tab', function(newValue){
		if (newValue === 2){
			c++;
			if(c === 1)
				$scope.initMap();
		}
	});
	// Implement upload multiple images

	// $scope.upload = function() {
	// 	if($scope.picFile) {
	// 		console.log("upload");
	// 		Upload.base64DataUrl($scope.picFile).then(
 //            function (url){
 //               	var uploadImageBase64 = url.replace(/data:image\/(png|jpg|jpeg);base64,/, "");
	// 			$http({
	// 	            headers: {'Authorization': 'Client-ID ' + clientId},
	// 	            url: '  https://api.imgur.com/3/upload',
	// 	            method: 'POST',            
	// 	            data: {
	// 	                image: uploadImageBase64, 
	// 	                'type':'base64'
	// 	            }
	// 	        }).then(function successCallback(response) {            
	// 	            request.mediaUrl = response.data.data.link;
	// 	        }, function errorCallback(err) {
	// 	        	console.log(err);
	// 	        });	               
 //            });		
	// 	}
	// 	console.log("not upload");

	// }

	this.selectTab = function(setTab){
		$scope.tab = setTab;
	};
	this.isSelectedTab = function(checkTab){
		return $scope.tab === checkTab;
	};

	this.submitReport = function() {
		var request = new Object();
		request.serviceRequestId = 1;
		request.serviceCode = convertServiceCodeFilter($scope.serviceType);
		request.serviceName = $scope.serviceName.name;
		request.happenDatetime = dateTimeFilter($scope.happenDateTime);
		request.requestedDatetime = dateTimeFilter(new Date());
		request.description = $scope.description;
		request.address = $scope.street + ", Phường " + $scope.ward.name + ", Quận " + $("#disInfo option:selected").text();
		request.latitude = $scope.latitude;
		request.longitude = $scope.longitude;
		request.statusId = 0;
		request.user = $rootScope.user;
		if($scope.picFile) {
	        Upload.base64DataUrl($scope.picFile).then(
	            function (url){
	               	var uploadImageBase64 = url.replace(/data:image\/(png|jpg|jpeg);base64,/, "");
					$http({
			            headers: {'Authorization': 'Client-ID ' + clientId},
			            url: '  https://api.imgur.com/3/upload',
			            method: 'POST',            
			            data: {
			                image: uploadImageBase64, 
			                'type':'base64'
			            }
			        }).then(function successCallback(response) {            
			            request.mediaUrl = response.data.data.link;
			            console.log(request.mediaUrl);
			            console.log(JSON.stringify(request));
						requestManager.postRequest(request).then(
							function success(){
								SweetAlert.swal("OK!", "Bạn đã gửi yêu cầu thành công!", "success");
								$location.path('/list');
							},
							function error(err){
								SweetAlert.swal("Error!", "Xảy ra lỗi khi gửi yêu cầu!", "error");
							});			            
			        }, function errorCallback(err) {
			        	SweetAlert.swal("Error!", "Xảy ra lỗi khi upload anh!", "error");
			        });	               
	            });
		}
		else {
			requestManager.postRequest(request).then(
				function success(){
					SweetAlert.swal("OK!", "Bạn đã gửi yêu cầu thành công!", "success");
					$location.path('/list');
				},
				function error(err){
					SweetAlert.swal("Error!", "Xảy ra lỗi khi gửi yêu cầu!", "error");
				});				
		}
	}

	$scope.goNext = function () {
	 	if(AuthService.isAuthorized(USER_ACCESS) || $rootScope.userRole == 'guest')
	 		$scope.tab = 4;
	 	else {
	 		console.log("HERE");
	 		Modal.logInModal();
	 	}
	};

	$scope.isAuthorizedGuest = function () {
		return AuthService.isAuthorized(USER_ACCESS) || $rootScope.userRole == 'guest';
	};

	$scope.logInModal = function(){
		Modal.logInModal();
  	};

  	$scope.signUpModal = function(){
  		Modal.signUpModal();
  	};

  	$scope.logInAsGuestModal = function(){
  		Modal.logInAsGuestModal();
  	};  	
});
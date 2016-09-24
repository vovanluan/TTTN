var app = angular.module('mainApp', ['ngRoute', 'ngFileUpload', 'ui.bootstrap', 'ngStorage',
	'angular-jwt', 'oitozero.ngSweetAlert', 'angularSpinner']);

app.constant("requestUrl", "http://localhost:8080/restful/webresources/entity.request");
app.constant("userUrl", "http://localhost:8080/restful/webresources/entity.user");
app.constant("commentUrl", "http://localhost:8080/restful/webresources/entity.comment");
app.constant("baseUrl", "http://localhost:8080/restful/webresources");

app.constant("districts", {
	"1": [
			{name: "Đa Kao"},
			{name: "Tân Định"},
			{name: "Bến Thành"}
			],
	"2": [
			{name: "Thảo Điền"},
			{name: "An Phú"},
			{name: "Bình An"}
			],
	"10": [
			{name: "1"},
			{name: "2"},
			{name: "3"}
			],
	"Bình Thạnh": [
			{name: "1"},
			{name: "2"},
			{name: "3"}
			],
	"Thủ đức": [
			{name: "Linh Xuân"},
			{name: "Bình Chiểu"},
			{name: "Linh Trung"},
			]
});

app.constant('issues', {
		"Điện": [
			{name: "Mất điện"},
			{name: "Hư điện"}
		],
		"Nước": [
			{name: "Mất nước"},
			{name: "Hư đường dây"}
		],
		"Tiếng ồn": [
			{name: "Giao thông"},
			{name: "Công trình"}
		]
});

app.constant('clientId', "254c1d5f74f2518");

app.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  tokenTimeOut: 'auth-token-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

app.constant('USER_ROLES', {
  admin: 'admin',
  editor: 'editor',
  user : 'normal',
  guest: 'guest'
});

app.constant('USER_ACCESS', ['admin', 'editor', 'normal']);

app.constant('GUEST_ACCESS', ['admin', 'editor', 'normal', 'guest']);

app.constant('ADMIN_ACCESS', ['admin']);

app.factory('requestManager', function(requestUrl, $http, $q){
	var requestManager = {
        loadAllRequests: function() {
            var deferred = $q.defer();
            $http.get(requestUrl)
                .success(function(requests) {
                    deferred.resolve(requests);
                })
                .error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);

                });
            return deferred.promise;
        },
        postRequest: function(request){
        	var deferred = $q.defer();
        	$http.post(requestUrl, JSON.stringify(request))
        	    .success(function() {
                    deferred.resolve();
                })
                .error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);

                });
            return deferred.promise;
        }
	};
	return requestManager;
});


app.factory('commentManager', ['commentUrl', '$http', '$q', function(commentUrl, $http, $q){
	var commentManager = {
		loadAllComments: function(){
			var deferred = $q.defer();
			$http.get(commentUrl)
				.success(function(comments){
					deferred.resolve(comments);
				})
                .error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);

                });
			return deferred.promise;
		},
		postComment: function(comment){
			var deferred = $q.defer();
			$http.post(commentUrl, JSON.stringify(comment))
				.success(function(){
					deferred.resolve();
				})
                .error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);

                });
			return deferred.promise;
		}
	};
	return commentManager;
}]);


app.factory('userManager', function(userUrl, $http, $q){
    var userManager = {
        loadAllUsers: function() {
            var deferred = $q.defer();
            $http.get(userUrl)
                .success(function(users) {
                    deferred.resolve(users);
                })
                .error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);

                });
            return deferred.promise;
        },
        updateUser: function(id, user) {
            var deferred = $q.defer();
            $http.put(userUrl + "/" + id, JSON.stringify(user))
                .success(function() {
                })
                .error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);

                });
            return deferred.promise;
        },
    };
    return userManager;
});

app.factory('Modal', function($rootScope, $uibModal){
	return {
		logInModal: function(){
			var modalInstance = $uibModal.open({
				templateUrl: 'app/components/login/view.html',
				controller: 'logInModalController',
				resolve: {
				}
			});

			modalInstance.result.then(function close() {
			}, function dismiss() {
				console.log("Modal dismiss");
			});
		},
		signUpModal: function(){
			var modalInstance = $uibModal.open({
				templateUrl: 'app/components/signup/view.html',
				controller: 'signUpModalController',
				resolve: {
				}
			});

			modalInstance.result.then(function close(user) {
			}, function dismiss() {
				console.log("Modal dismiss");
			});
  		},

  		logInAsGuestModal: function() {
	  		var modalInstance = $uibModal.open({
				templateUrl: 'app/components/guest/view.html',
				controller: 'logInAsGuestModalController',
				resolve: {
				}
			});

			modalInstance.result.then(function close() {
			}, function dismiss() {
				console.log("Modal dismiss");
			});
  		},
  		changePasswordModal: function(){
  			var modalInstance = $uibModal.open({
  				templateUrl: 'app/components/changePassword/view.html',
  				controller: 'changePasswordModalController',
  				resolve: {
  				}
  			});

  			modalInstance.result.then(function close(user){
  			}, function dismiss(){
  				console.log("Modal dismiss");
  			});
  		}
	}
});

// Check if a route requires authentication or not
app.factory('RouteClean', function(){
	// enumerate routes that don't need authentication
	var routesThatDontRequireAuth = ['/list', '/map', '/gallery', '/issue', '/reportIssue'];

	// check if current location matches route
    return function(route) {
    	return _.find(routesThatDontRequireAuth,
	        function (noAuthRoute) {
	    	    return route.startsWith(noAuthRoute);
	    });
    };

});
app.filter('dateTime', function(){
	return function (input) {
	var date = new Date(input);
    tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function(num) {
        var norm = Math.abs(Math.floor(num));
        return (norm < 10 ? '0' : '') + norm;
    };
    return date.getFullYear()
        + '-' + pad(date.getMonth()+1)
        + '-' + pad(date.getDate())
        + 'T' + pad(date.getHours())
        + ':' + pad(date.getMinutes())
        + ':' + pad(date.getSeconds())
        + dif + pad(tzo / 60)
        + ':' + pad(tzo % 60);
	};
});

app.filter('convertServiceCode', function(){
	return function(input){
		var result;
		switch(input){
	        case "Điện":
	            result = 0;
	            break;
	        case "Nước":
	            result = 1;
	            break;
	        case "Tiếng ồn":
	            result = 2;
	            break;
		}

		return result;
	};
});

app.service('AuthService', function(RouteClean, USER_ROLES, $rootScope, $http, $localStorage, baseUrl, jwtHelper, $location){
    var self = this;
    self.isAuthenticated = function () {
	    if($localStorage.token) {
	    	return !jwtHelper.isTokenExpired($localStorage.token);
	    }
	    return false;
	};

	self.isAuthorized = function(authorizedRoles) {
		return self.isAuthenticated() && _.contains(authorizedRoles, $rootScope.userRole);
	};

    self.signin = function(data, success, error) {
        $http.post(baseUrl + '/authentication/user', data).success(success).error(error);
    };

    self.signup = function(data, success, error) {
        $http.post(baseUrl + '/entity.normaluser', data).success(success).error(error)
    },

    self.profile = function(success, error) {
        $http.get(baseUrl + '/profile').success(success).error(error)
    };

    self.logout = function() {
        delete $localStorage.token;
        $rootScope.user = {};
        $rootScope.userRole = null;
        //if this route requires authentication, redirect to list view
        if(!RouteClean($location.url()))
        	$location.path('/list');
    };

});
// First run in the app, we can use provider in config()
app.config(function(usSpinnerConfigProvider, $routeProvider, $httpProvider, jwtInterceptorProvider, $localStorageProvider){

	usSpinnerConfigProvider.setTheme('bigBlue', {color: 'blue', radius: 20});

	$routeProvider
	.when('/list', {
		templateUrl: 'app/components/list/view.html',
		controller: 'viewController'
	})
	.when('/map', {
		templateUrl: 'app/components/map/view.html',
		controller: 'viewController'
	})
	.when('/gallery', {
		templateUrl: 'app/components/gallery/view.html',
		controller: 'viewController'
	})
	.when('/profile', {
		templateUrl: 'app/components/profile/view.html',
		controller: 'profileController'
	})
    .when('/authorization-management', {
        templateUrl: 'app/components/authorization-management/view.html',
        controller: 'authorizationManagementController'
    })
	.when('/issue/:issueId', {
		templateUrl: 'app/components/issueDetail/view.html',
		controller: 'issueDetailController'
	})
	.when('/reportIssue', {
		templateUrl: 'app/components/reportIssue/view.html',
		controller: 'reportTabController',
		controllerAs: 'reportTab'
	})
    .otherwise({
        redirectTo: '/list'
    });

    jwtInterceptorProvider.tokenGetter = function() {
    	return $localStorageProvider.get('token');
    }

    $httpProvider.interceptors.push('jwtInterceptor');
});

// Run after .config(, this function is closest thing to main method in Angular, used to kickstart the application
app.run(function($rootScope, $localStorage, $location, $http, jwtHelper,
	baseUrl, AuthService, RouteClean, requestManager, commentManager){
  	$rootScope.$on('$routeChangeStart', function (next, current) {
	    // if route requires authentication and user is not logged in
	    if (!RouteClean($location.url()) && !AuthService.isAuthenticated()) {
	    	// redirect back to list view
	      	$location.path('/list');
	    }
  	});

  	$rootScope.user = {};
  	// Get all requests from server
	requestManager.loadAllRequests().then(function(requests){
		$rootScope.requests = requests;
	});

	commentManager.loadAllComments().then(function(comments){
		$rootScope.comments = comments;
	});
  	//$rootScope.comments = [];
  	// Check if token exists, then get user information and user role
  	if (AuthService.isAuthenticated()) {
  		var tokenPayload = jwtHelper.decodeToken($localStorage.token);
  		var email = tokenPayload.sub;
  		$rootScope.userRole = tokenPayload.rol;
  		var childUrl = "";
  		switch($rootScope.userRole){
  			case 'normal':
  				childUrl =  "/entity.normaluser/getInfo?email=" + email;
  				break;
  			case 'admin':
  				break;
  		}
  		$http({
  			method: "post",
  			url: baseUrl + childUrl,
  			data : {}
  		})
  		.success(function (data){
  			$rootScope.user = data;

  		})
  		.error(function(error){
  			console.log(error);
  			delete $localStorage.token;
  			$rootScope.userRole = null;
  		});
  	}
});

// Run after .run()
app.controller('mainController',
	function($rootScope, $scope, $uibModal, Modal, AuthService, SweetAlert){
		$scope.logInModal = function(){
			Modal.logInModal();
	  	};

	  	$scope.signUpModal = function(){
			Modal.signUpModal();
	  	};

	  	$scope.logout = function(){
			SweetAlert.swal({
			   title: "Bạn có chắc chắn muốn đăng xuất?",
			   type: "warning",
			   showCancelButton: true,
			   cancelButtonText: "Không, tôi sẽ ở lại",
			   confirmButtonColor: "#DD6B55",
			   confirmButtonText: "Vâng, tôi muốn!",
			   closeOnConfirm: true,
			   closeOnCancel: true
			},
			function(isConfirm){
				if (isConfirm)
			   		AuthService.logout();
			});
	  	}
});

app.controller('viewController', function($rootScope, $scope, requestManager, commentManager){
	// Init map and request
    var myLatLng = {lat: 10.78, lng: 106.65};
    var iconBase = "assets/resources/markerIcon/";
	$scope.map = new google.maps.Map(document.getElementById('mainMap'), {
	    zoom: 11,
	    center: myLatLng
	});
	$scope.markers = [];
	$scope.comments = [];
	$scope.comments = $rootScope.comments;

	$scope.checkId = function(commentRequestId,serviceRequestId){
		return (commentRequestId==serviceRequestId);
	}

	//create map
	$.each($rootScope.requests, function(index, request) {
		var latlng = new google.maps.LatLng(request.latitude, request.longitude);
		var icon = "";
		switch(request.statusId) {
			case 0:
			// blue circle
				icon = 'http://i.imgur.com/UvpFBxi.png';
				break;
			case 1:
			// green circle
				icon = 'http://i.imgur.com/nqFCc3z.png';
				break;
			case 2:
			// red circle
				icon = 'http://i.imgur.com/xPYbdLB.png';
				break;
		}
		var marker = new google.maps.Marker({
	        position: latlng,
	        map: $scope.map,
	        draggable: false,
	        animation: google.maps.Animation.DROP,
	        //icon : iconBase + icon
	        icon: icon
	    });
	  	var infowindow = new google.maps.InfoWindow({
	    	content: request.serviceName
	  	});
		marker.addListener('mouseover', function() {
		   	infowindow.open($scope.map, marker);
		});
		marker.addListener('mouseout', function() {
		   	infowindow.close($scope.map, marker);
		});
		$scope.markers.push(marker);
	});
/*    $scope.filteredRequests = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 2;
    $scope.maxSize = 5;
    $scope.requests = $rootScope.requests;
    console.log($rootScope.requests);
    $scope.$watch("currentPage + numPerPage", function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
        , end = begin + $scope.numPerPage;

        $scope.filteredRequests = $scope.requests.slice(begin, end);
    });*/

});

app.controller('mainTabController',
	function($rootScope, $localStorage, $scope, AuthService, USER_ACCESS){

	$scope.isAuthorizedUser = function () {
	 	return AuthService.isAuthorized(USER_ACCESS);
	};

    // Need to use ADMIN_ACCESS
    // Waiting implement from server
    $scope.isAdmin = function () {
        return AuthService.isAuthorized(USER_ACCESS);
    }
	// Watch userRole change
	$scope.$watch(function (){
		return $localStorage;
	}, function() {
		$scope.isAuthorizedUser = function () {
		 	return AuthService.isAuthorized(USER_ACCESS);
		};
	});

	this.tab = 1;
	this.selectTab = function(setTab){
		this.tab = setTab;
	};
	this.isSelected = function(checkTab){
		return this.tab === checkTab;
	};
});

app.controller('dropDownViewController', function(){
	this.tab = 1;
	this.selectTab = function(setTab){
		this.tab = setTab;
	};
	this.isSelected = function(checkTab){
		return this.tab === checkTab;
	};
});

app.controller('issueDetailController',function(AuthService, USER_ACCESS,Modal, $rootScope, $scope, requestManager, commentManager, $routeParams,dateTimeFilter){
	$scope.requestIndex = {};
	$scope.comments = [];
	$scope.issue_id = $routeParams.issueId;
	$scope.countComment = {};
	angular.forEach($rootScope.comments, function(comment,index){
		if(comment.request.serviceRequestId==$scope.issue_id)
			$scope.comments.push(comment);
	});
	//$scope.requestIndex = requests[$scope.issue_id];
	for(var i = 0; i < $rootScope.requests.length; i++){
		if($scope.issue_id == $rootScope.requests[i].serviceRequestId) {
			$scope.requestIndex = $rootScope.requests[i];
			break;
		}
	}


	$scope.submitComment = function(requestObj){
		if(AuthService.isAuthorized(USER_ACCESS) || $rootScope.userRole == 'guest')
		{
			var comment = new Object();
			var guest = new Object();

			comment.user = $rootScope.user;
			console.log(JSON.stringify(comment.user));
			comment.request = requestObj;
			comment.content = $scope.textContent;
			comment.postDatetime = dateTimeFilter(new Date());
			commentManager.postComment(comment).then(
				function success(){
					$scope.comments.push(comment);
					$rootScope.comments.push(comment);
				},
				function error(){
					console.log("Error");
				});

			$scope.textContent = '';
		}
	 	else {
	 		Modal.logInModal();
	 	}
	}
});

app.controller('profileController', function($rootScope, $scope, $uibModal, Modal){
	$scope.changePasswordModal = function(){
		Modal.changePasswordModal();
	}
});

app.controller('changePasswordModalController', function($rootScope, $scope, $http, $uibModalInstance){
	$scope.cancle = function(){
		$uibModalInstance.dismiss('cancle');
	}
});
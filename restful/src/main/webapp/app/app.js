var app = angular.module('mainApp', ['ngRoute', 'ngFileUpload', 'ui.bootstrap', 'ngStorage', 
	'angular-jwt']);

app.constant("requestUrl", "http://localhost:8080/restful/webresources/entity.request");
app.constant("userUrl", "http://localhost:8080/restful/webresources/entity.user");
app.constant("guestUrl", "http://localhost:8080/restful/webresources/entity.guest");
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
  user : 'normal_user',
  guest: 'guest'
});

app.factory('requestManager', function(requestUrl, $http, $q){
	var requestManager = {
        loadAllRequests: function() {
            var deferred = $q.defer();
            $http.get(requestUrl)
                .success(function(requests) {
                    deferred.resolve(requests);
                })
                .error(function() {
                    deferred.reject();
                });
            return deferred.promise;
        },
        postRequest: function(request){
        	console.log(JSON.stringify(request));
        	$http.post(requestUrl, JSON.stringify(request)).then(function successCallBack(response){
        		console.log("success");
        	}, function errorCallBack(response){

        	});

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
				.error(function(){
					deferred.reject();
				});
			return deferred.promise;
		},
		postComment: function(comment){
			console.log(JSON.stringify(comment));
			$http.post(commentUrl, JSON.stringify(comment)).then(function successCallBack(response){
				console.log("success");
			}, function errorCallBack(response){

			});
		}
	};
	return commentManager;
}]);

app.service('AuthService', function($http, $localStorage, baseUrl, jwtHelper){
    this.isAuthenticated = function () {
	    if($localStorage.token) {
	    	return !jwtHelper.isTokenExpired($localStorage.token);
	    }
	    return false;
	};
    this.signin = function(data, success, error) {
        $http.post(baseUrl + '/authentication/normaluser', data).success(success).error(error);
    };
    this.signup = function(data, success, error) {
        $http.post(baseUrl + '/signup', data).success(success).error(error)
    },            
    this.profile = function(success, error) {
        $http.get(baseUrl + '/profile').success(success).error(error)
    };
    this.logout = function() {
        delete $localStorage.token;
        console.log("Delete");
    };

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

			modalInstance.result.then(function close(user) {
				$rootScope.user = user;
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
				$rootScope.user = user;
			}, function dismiss() {
				console.log("Modal dismiss");
			});
  		}
	}
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


// First run in the app, we can use provider in config()
app.config(function($routeProvider, $httpProvider, jwtInterceptorProvider, $localStorageProvider){
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
	.when('/issue/:issueId', {
		templateUrl: 'app/components/issueDetail/view.html',
		controller: 'issueDetaiController'
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
app.run(function($rootScope, $localStorage, $location){
	// enumerate routes that don't need authentication
	var routesThatDontRequireAuth = ['/list', '/map', '/gallery', '/issue', '/reportIssue'];

	// check if current location matches route  
    var routeClean = function (route) {
    return _.find(routesThatDontRequireAuth,
      function (noAuthRoute) {
        return route.startsWith(noAuthRoute);
      });
  };

  $rootScope.$on('$routeChangeStart', function (next, current) {
    // if route requires authentication and user is not logged in
    if (!routeClean($location.url())) {
      // redirect back to list view
      $location.path('/list');
    }
  });	
});	

// Run after .run()
app.controller('mainController',
	function($rootScope, $scope, $uibModal, Modal, AuthService){
		$scope.logInModal = function(){
			Modal.logInModal();
	  	};

	  	$scope.signUpModal = function(){
			Modal.signUpModal();
	  	};

	  	$scope.logout = function(){
	  		AuthService.logout();
	  	}
});

app.controller('viewController', ['$scope', 'requestManager', 'commentManager', function($scope, requestManager, commentManager){
	// Init map and request
    var myLatLng = {lat: 10.78, lng: 106.65};
    var iconBase = "assets/resources/markerIcon/";
	$scope.map = new google.maps.Map(document.getElementById('mainMap'), {
	    zoom: 11,
	    center: myLatLng
	}); 
	$scope.requests = [];
	$scope.markers = [];
	$scope.comments = [];

	commentManager.loadAllComments().then(function(comments){
		$scope.comments = comments;
	});

	$scope.checkId = function(commentRequestId,serviceRequestId){
		return (commentRequestId==serviceRequestId);
	}

	$scope.getUsername = function  (comment) {
		if(comment.guestId!=null) return comment.guestId.guestName;
		else return comment.userId.userName;
	}
	requestManager.loadAllRequests().then(function(requests){
		$scope.requests = requests;
		//create map 
		$.each($scope.requests, function(index, request) {
			var latlng = new google.maps.LatLng(request.latitude, request.longitude);
			var icon = "";
			switch(request.statusId) {
				case 0:
					icon = 'green.png';
					break;
				case 1:
					icon = 'blue.png';
					break;
				case 2:
					icon = 'red.png';
					break;
			}
			var marker = new google.maps.Marker({
		        position: latlng,
		        map: $scope.map,
		        draggable: false,
		        animation: google.maps.Animation.DROP,
		        icon : iconBase + icon
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
	});


}]);

app.controller('mainTabController', function($localStorage, $scope, AuthService){
	$scope.isAuthenticated = AuthService.isAuthenticated();
	$scope.$watch(function() {
	    return angular.toJson($localStorage);
	}, function() {
		$scope.isAuthenticated = AuthService.isAuthenticated();
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

app.controller('issueDetaiController',['$scope', 'requestManager', 'commentManager', '$routeParams', 'dateTimeFilter', function($scope, requestManager, commentManager, $routeParams,dateTimeFilter){
	$scope.requestIndex = {};
	$scope.requests = []
	$scope.comments = [];
	$scope.issue_id = $routeParams.issueId;
	$scope.countComment = {};
	commentManager.loadAllComments().then(function(comments){
		angular.forEach(comments, function(comment,index){
			if(comment.requestId.serviceRequestId==$scope.issue_id)
				$scope.comments.push(comment);
		});
		$scope.countComment = $scope.comments.length;
	});

	$scope.getUsername = function  (comment) {
		if(comment.guestId!=null) return comment.guestId.guestName;
		else return comment.userId.userName;
	}
	requestManager.loadAllRequests().then(function(requests){
		$scope.requests = requests;
		//$scope.requestIndex = requests[$scope.issue_id];
		for(var i = 0; i < requests.length; i++){
			if($scope.issue_id == requests[i].serviceRequestId) {
				$scope.requestIndex = requests[i];
				break;
			}			
		}

	});

	$scope.submitComment = function(requestObj){
		var comment = new Object();
		var guest = new Object();

		guest.guestId = 3;
		guest.guestName = 'WenKai';
		guest.guestEmail = 'tai@gmail.com';

		comment.guestId = guest;
		comment.requestId = requestObj;
		comment.commentContent = $scope.textContent;
		comment.postDatetime = dateTimeFilter(new Date());

		commentManager.postComment(comment);

		$scope.textContent = '';

	}
}]);

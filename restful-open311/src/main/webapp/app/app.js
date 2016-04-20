var app = angular.module('mainApp', ['ngRoute', 'ngFileUpload', 'ui.bootstrap', 'ngStorage']);

app.constant("requestUrl", "http://localhost:8080/restful-open311/webresources/com.bk.khmt.restful.open311.requests");
app.constant("userUrl", "http://localhost:8080/restful-open311/webresources/com.bk.khmt.restful.open311.users");
app.constant("guestUrl", "http://localhost:8080/restful-open311/webresources/com.bk.khmt.restful.open311.guest");
app.constant("commentUrl", "http://localhost:8080/restful-open311/webresources/com.bk.khmt.restful.open311.comments");

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

app.factory('Request', [function(){
	function Request(requestData){
		if(requestData){
			this.setData(requestData);
		}
	}
	return Request;
}]);

app.factory('requestManager', ['Request', 'requestUrl', '$http', '$q', function(Request, requestUrl, $http, $q){
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
}]);


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

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
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
        redirectTo: '/'
    });
}]);

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

app.controller('mainTabController', function(){
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

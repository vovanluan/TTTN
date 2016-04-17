var app = angular.module('mainApp', ['ngRoute']);

app.constant("requestUrl", "http://localhost:8080/restful-open311/webresources/com.bk.khmt.restful.open311.requests");

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
        	$http.post(requestUrl, request).then(function successCallBack(response){

        	}, function errorCallBack(response){

        	});

        }
	};
	return requestManager;
}]);

app.filter('convertServiceCode', function(){
	return function(input, toCode){
		var result;
		if(toCode){
			switch(input){
		        case "dien":
		            result = 0;
		            break;
		        case "nuoc":
		            result = 1;
		            break;
		        case "tiengon":
		            result = 2;
		            break;
			}
		}
		else {
			switch(input){
		        case 0:
		            result = "dien";
		            break;
		        case 1:
		            result = "nuoc";
		            break;
		        case 2:
		            result = "tiengon";
		            break;
		    }			
		};

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
	.when('/reportIssue', {
		templateUrl: 'app/components/reportIssue/view.html',
		controller: 'reportTabController',
		controllerAs: 'reportTab'
	})
    .otherwise({
        redirectTo: '/'
    });
}]);

app.controller('viewController', ['$scope', 'requestManager', function($scope, requestManager){
	// Init map and request
    var myLatLng = {lat: 10.78, lng: 106.65};
    var iconBase = "assets/resources/markerIcon/";
	$scope.map = new google.maps.Map(document.getElementById('mainMap'), {
	    zoom: 11,
	    center: myLatLng
	}); 
	$scope.requests = [];
	$scope.markers = [];
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

app.controller('reportTabController', ['$scope', 'requestManager', 'convertServiceCodeFilter', function($scope, requestManager, convertServiceCodeFilter){
	this.tab = 1;
	var request = new Object;
	$scope.serviceType;
	$scope.serviceCode;
	$scope.serviceCode = convertServiceCodeFilter($scope.serviceType, true);
	$scope.$watch("serviceType", function(newValue){
		$scope.serviceCode = convertServiceCodeFilter($scope.serviceType, true);
	}); 
	this.selectTab = function(setTab){
		this.tab = setTab;
	};
	this.isSelected = function(checkTab){
		return this.tab === checkTab;
	};

	
}]);
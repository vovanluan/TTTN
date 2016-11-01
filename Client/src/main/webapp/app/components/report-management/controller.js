app.controller('reportManegementController', function($rootScope, $scope, Modal, userManager, SweetAlert, requestManager, commentManager){
	requestManager.loadAllRequests().then(function(requests){
		$scope.requests = requests;
		console.log(requests);
		for(var i=0;i<requests.length;i++){
			console.log(requests[i].statusId);
		}
	});

	commentManager.loadAllComments().then(function(comments){
		$scope.comments = comments;
	});

	$scope.openModal = function(id) {
		$scope.requestIndex = $scope.requests[id];
		Modal.reportManegementDetailModal();
		console.log($scope.requestIndex.serviceName);
	}
});
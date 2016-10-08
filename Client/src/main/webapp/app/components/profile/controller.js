app.controller('profileController',
	function($rootScope, $scope, $http, $uibModal, Upload, requestManager, convertServiceCodeFilter,
		dateTimeFilter, districts, issues, clientId, Modal, AuthService, USER_ACCESS, $location, SweetAlert){
	$scope.changePasswordModal = function(){
		Modal.changePasswordModal();
	}
});
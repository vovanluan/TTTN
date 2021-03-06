var app = angular.module('mainApp', ['ngRoute', 'ngFileUpload', 'ui.bootstrap', 'ngStorage', 'angular-jwt',
  'oitozero.ngSweetAlert', 'angularSpinner', 'ngMaterial', 'ngMessages', 'hm.readmore', 'angularMoment']);

app.constant("requestUrl", "http://52.199.99.2:8080/restful/webresources/entity.request");
app.constant("userUrl", "http://52.199.99.2:8080/restful/webresources/entity.user");
app.constant("normalUserUrl", "http://52.199.99.2:8080/restful/webresources/entity.normaluser");
app.constant("adminUserUrl", "http://52.199.99.2:8080/restful/webresources/entity.adminuser");
app.constant("officialUserUrl", "http://52.199.99.2:8080/restful/webresources/entity.officialuser");
app.constant("divisionUserUrl", "http://52.199.99.2:8080/restful/webresources/entity.divisionuser");
app.constant("vicePresidentUserUrl", "http://52.199.99.2:8080/restful/webresources/entity.vicepresidentuser");
app.constant("commentUrl", "http://52.199.99.2:8080/restful/webresources/entity.comment");
app.constant("baseUrl", "http://52.199.99.2:8080/restful/webresources");
app.constant("divisionUrl", "http://52.199.99.2:8080/restful/webresources/entity.division");
app.constant("announcementUrl", "http://52.199.99.2:8080/restful/webresources/entity.annoucement");

app.constant('clientId', "254c1d5f74f2518");

app.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  tokenTimeOut: 'auth-token-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

app.constant('USER_ACCESS', ['admin', 'normal', 'official', 'division', 'vice_president']);

app.constant('NORMALUSER_ACCESS', ['normal']);

app.constant('GUEST_ACCESS', ['admin', 'normal', 'guest']);

app.constant('ADMIN_ACCESS', ['admin']);

app.constant('MANAGEMENT_ACCESS', ['official', 'vice_president']);

app.constant('DIVISION_ACCESS', ['division']);

app.constant('OFFICIAL_ACCESS', ['official']);

app.constant('VICE_PRESIDENT_ACCESS', ['vice_president']);

app.factory('Districts', function ($http) {
    return $http.get('assets/data/districts.json');
});

app.factory('Services', function ($http) {
    return $http.get('assets/data/services.json');
});

app.factory('Announcements', function ($http) {
    return $http.get('assets/data/announcements.json');
});

app.factory('Requests', function ($http) {
    return $http.get('assets/data/requests.json');
});

app.factory('DivisionRequests', function ($http) {
    return $http.get('assets/data/division-requests.json');
});
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
        },
        updateRequest: function(id, req) {
            var deferred = $q.defer();
            $http.put(requestUrl + "/" + id, JSON.stringify(req))
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
        updateUser: function(id, user, url) {
            var deferred = $q.defer();
            $http.put(url + "/" + id, JSON.stringify(user))
                .success(function() {
                    deferred.resolve();
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

app.factory('divisionManager', function(divisionUrl, $http, $q){
    var divisionManager = {
        loadAllDivisions: function() {
            var deferred = $q.defer();
            $http.get(divisionUrl)
                .success(function(divisions) {
                    deferred.resolve(divisions);
                })
                .error(function(msg, code) {
                    deferred.reject(msg);

                });
            return deferred.promise;
        },
        postDivision: function(division){
            var deferred = $q.defer();
            $http.post(divisionUrl, JSON.stringify(division))
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
    return divisionManager;
});

app.factory('announcementManager', function(announcementUrl, $http, $q){
  var announcementManager = {
        loadAllAnnouncements: function() {
            var deferred = $q.defer();
            $http.get(announcementUrl)
                .success(function(announcements) {
                    deferred.resolve(announcements);
                })
                .error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);

                });
            return deferred.promise;
        },
        postAnnouncement: function(announcement){
          var deferred = $q.defer();
          $http.post(announcementUrl, JSON.stringify(announcement))
              .success(function() {
                    deferred.resolve();
                })
                .error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);

                });
            return deferred.promise;
        },
        deleteAnnouncement: function(id) {
              var deferred = $q.defer();
              $http.delete(announcementUrl + "/" + id)
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
  return announcementManager;
});

app.factory('Modal', function($rootScope, $uibModal, $mdDialog){
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
  				templateUrl: 'app/components/change-password/view.html',
  				controller: 'changePasswordModalController',
  				resolve: {
  				}
  			});

  			modalInstance.result.then(function close(){
  			}, function dismiss(){
  				console.log("Modal dismiss");
  			});
  		}
	}
});

// Check if a route requires authentication or not
app.factory('RouteClean', function(){
	// enumerate routes that don't need authentication
	var routesThatDontRequireAuth = ['/list', '/map', '/gallery', '/issue', '/report-issue', '/announcement'];

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

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});


app.factory('PagerService', function PagerService() {
        // service definition
    var service = {};

        service.GetPager = GetPager;

        return service;

        // service implementation
        function GetPager(totalItems, currentPage, pageSize) {
            // default to first page
            currentPage = currentPage || 1;

            // default page size is 10
            pageSize = pageSize || 5;

            // calculate total pages
            var totalPages = Math.ceil(totalItems / pageSize);

            var startPage, endPage;
            if (totalPages <= 10) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }

            // calculate start and end item indexes
            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            // create an array of pages to ng-repeat in the pager control
            var pages = _.range(startPage, endPage + 1);

            // return object with all pager properties required by the view
            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        }
});
app.service('AuthService', function(RouteClean, $rootScope, $http, $localStorage, baseUrl, jwtHelper, $location){
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
        $http.post(baseUrl + '/entity.normaluser', data).success(success).error(error);
    },

    self.profile = function(success, error) {
        $http.get(baseUrl + '/profile').success(success).error(error);
    };

    self.changePassword = function(data, id) {
     	$http.post(baseUrl + '/entity.normaluser/changePassword/' + id).success().error();
    };

    self.changePassword = function(data, id) {
    	$http.post(baseUrl + '/entity.normaluser/' + id).success(success).error(error)
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
app.config(function(usSpinnerConfigProvider, $routeProvider, $httpProvider, jwtInterceptorProvider, $localStorageProvider, jwtOptionsProvider){

	usSpinnerConfigProvider.setTheme('bigBlue', {color: 'blue', radius: 20});

	$routeProvider
	.when('/list', {
		templateUrl: 'app/components/list/view.html',
		controller: 'listViewController'
	})
	.when('/map', {
		templateUrl: 'app/components/map/view.html',
		controller: 'mapViewController'
	})
	.when('/gallery', {
		templateUrl: 'app/components/gallery/view.html',
		controller: 'galleryViewController'
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
		templateUrl: 'app/components/issue-detail/view.html',
		controller: 'issueDetailController'
	})
	.when('/report-issue', {
		templateUrl: 'app/components/report-issue/view.html',
		controller: 'reportTabController',
		controllerAs: 'reportTab'
	})
	.when('/signin-manager', {
		templateUrl: 'app/components/signinManager/view.html'
	})
	.when('/report-management', {
		templateUrl: 'app/components/report-management/view.html',
		controller: 'reportManagementController'
	})
	.when('/report-management-division', {
		templateUrl: 'app/components/report-management-division/view.html',
		controller: 'reportManagementDivisionController'
	})
    .when('/division-management', {
        templateUrl: 'app/components/division-management/view.html',
        controller: 'divisionManagementController'
    })
    .when('/announcement', {
        templateUrl: 'app/components/announcement/view.html',
        controller: 'announcementController'
    })
    .when('/issue-by-me/:userId', {
        templateUrl: 'app/components/issue-by-me/view.html',
        controller: 'issueByMeController'
    })
    .otherwise({
        redirectTo: '/list'
    });

    jwtInterceptorProvider.tokenGetter = function() {
    	return $localStorageProvider.get('token');
    }

    $httpProvider.interceptors.push('jwtInterceptor');
    /* If you are calling an API that is on a domain other than your application's origin,
     you will need to whitelist it. */
    jwtOptionsProvider.config({
      whiteListedDomains: ['api.imgur.com', '52.199.99.2']
    });

});

// Run after .config(, this function is closest thing to main method in Angular, used to kickstart the application
app.run(function($rootScope, $localStorage, $location, $http, jwtHelper,
	baseUrl, AuthService, RouteClean, requestManager, commentManager, divisionManager, announcementManager,
    userManager, Districts, Services, Announcements, Requests, DivisionRequests){
  	$rootScope.$on('$routeChangeStart', function (next, current) {
	    // if route requires authentication and user is not logged in
	    if (!RouteClean($location.url()) && !AuthService.isAuthenticated()) {
	    	// redirect back to list view
	      	$location.path('/list');
	    }
  	});

  	$rootScope.user = {};

    requestManager.loadAllRequests().then(function(requests){
        $rootScope.requests = requests;
    });

  	commentManager.loadAllComments().then(function(comments){
  		$rootScope.comments = comments;
  	});

    divisionManager.loadAllDivisions().then(function(divisions){
        $rootScope.divisions = divisions;
    });

    announcementManager.loadAllAnnouncements().then(function(announcements){
        $rootScope.announcements = announcements;
    });

  	// Check if token exists, then get user information and user role
  	if (AuthService.isAuthenticated()) {
  		var tokenPayload = jwtHelper.decodeToken($localStorage.token);
  		var email = tokenPayload.sub;
  		$rootScope.userRole = tokenPayload.rol;
  		var childUrl = "";
  		switch($rootScope.userRole){
  			case 'normal':
  				childUrl = "/entity.normaluser/getInfo?email=" + email;
  				break;
  			case 'admin':
  				childUrl = "/entity.adminuser/getInfo?email=" + email;
  				break;
  			case 'official':
  				childUrl = "/entity.officialuser/getInfo?email=" + email;
  				break;
  			case 'division':
  				childUrl = "/entity.divisionuser/getInfo?email=" + email;
  				break;
  			case 'vice_president':
  				childUrl = "/entity.vicepresidentuser/getInfo?email=" +email;
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

    // Get Data from files
    Districts.success(function (districts) {
        $rootScope.districts = districts;
    }).error(function (message) {
        console.log("Error in districts: " + message);
    });
    Services.success(function (services) {
        $rootScope.services = services.services;
    }).error(function (message) {
        console.log("Error in services: " + message);
    })
    Announcements.success(function (announcements) {
        $rootScope.announcementTypes = announcements.announcements;
    }).error(function (message) {
        console.log("Error in announcements: " + message);
    })
    Requests.success(function (requests) {
        $rootScope.statusIds = requests.requests;
    }).error(function (message) {
        console.log("Error in get statusId list: " + message);
    })
    DivisionRequests.success(function (requests) {
        $rootScope.divisionRequests = requests.division_requests;
    }).error(function (message) {
        console.log("Error in get statusId list: " + message);
    })


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
			   title: "Bạn có chắc muốn đăng xuất?",
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

app.controller('mainTabController',
	function($rootScope, $localStorage, $scope, AuthService, USER_ACCESS, ADMIN_ACCESS, MANAGEMENT_ACCESS, DIVISION_ACCESS){

	$scope.isAuthorizedUser = function () {
	 	return AuthService.isAuthorized(USER_ACCESS);
	};

    $scope.isAdmin = function () {
        return AuthService.isAuthorized(ADMIN_ACCESS);
    }

    $scope.isManager = function () {
    	return AuthService.isAuthorized(MANAGEMENT_ACCESS);
    }

    $scope.isDivision = function () {
    	return AuthService.isAuthorized(DIVISION_ACCESS);
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



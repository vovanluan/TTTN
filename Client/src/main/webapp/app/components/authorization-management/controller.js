app.controller('authorizationManagementController', function($rootScope, $scope, userUrl, userManager, $mdDialog, $filter){
    $scope.roles = ["normal", "admin", "official", "division", 'vice_president'];
    userManager.loadAllUsers().then(function(users){
        $rootScope.users = users;
        // functions have been describe process the data for display
        $scope.search();

        $scope.$watch('users', function (newVal, oldVal) {
            $scope.search();
            console.log("users updated");
        });
    });
    $scope.update = function(user) {
        userManager.updateUser(user.id, user, userUrl).then(function() {
            $scope.updateStatus = "Cập nhật thành công!";
        }, function(response) {
            console.log("Error: " + response);
        });
    }

    $scope.postNewOfficer = function(id) {
        $mdDialog.show({
            templateUrl: 'app/components/post-officer/view.html',
            controller: 'postOfficerModalController',
            bindToController: true,
            bindToController: true,
            clickOutsideToClose: true,
            preserveScope: true,
            scope: this
        })
    }

    //Pagination
    $scope.sortingOrder = '';
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 2;
    $scope.pagedItems = [];
    $scope.currentPage = 0;

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        console.log($rootScope.users);
        $scope.filteredItems = $filter('filter')($rootScope.users, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };

    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];
        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // change sorting order
    $scope.sort_by = function(newSortingOrder) {
        if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;

        $scope.sortingOrder = newSortingOrder;

        // icon setup
        $('th i').each(function(){
            // icon reset
            $(this).removeClass().addClass('icon-sort');
        });
        if ($scope.reverse)
            $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-up');
        else
            $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-down');
    };


});

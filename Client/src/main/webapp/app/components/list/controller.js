app.controller('listViewController', function ($rootScope, $scope, $filter, requestManager, commentManager, PagerService){
    $scope.firstOrder = [
        {type: 'requestedDatetime', name: 'Thời gian'},
        {type: 'vote', name: 'Cảm ơn'}
    ];
    $scope.secondOrder = ['A-Z', 'Z-A'];
    $scope.requestPerPage = 10;
    $scope.comments = [];
    $scope.comments = $rootScope.comments;
    var averageLatLong;
    $scope.convertStatusId = function(text) {
        switch(text) {
            case 'DA_TIEP_NHAN':
                return 'ĐÃ TIẾP NHẬN';
            case 'DA_CHUYEN':
                return 'ĐANG XỬ LÝ';
            case 'DA_XU_LY':
                return 'ĐÃ GIẢI QUYẾT';
            case 'DA_DUYET':
                return 'ĐÃ DUYỆT';
        }
    }
    $scope.checkId = function(commentRequestId,serviceRequestId){
      return (commentRequestId==serviceRequestId);
    }

    $scope.createMap = function (requests){
        var averageLat = 0;
        var averageLong = 0;
        $.each(requests, function(index, request) {
            averageLat += request.latitude;
            averageLong += request.longitude;
        });
        averageLat /= requests.length;
        averageLong /= requests.length;
        console.log(averageLat);
        console.log(averageLong);
        averageLatLong = {lat: averageLat, lng: averageLong}
        var iconBase = "assets/resources/markerIcon/";
        $scope.map = new google.maps.Map(document.getElementById('mainMap'), {
            zoom: 10,
            center: averageLatLong,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
        });
        $scope.markers = [];
        $.each(requests, function(index, request) {
          var latlng = new google.maps.LatLng(request.latitude, request.longitude);
          var icon = "";
          switch(request.statusId) {
            case 'DA_TIEP_NHAN':
            // red circle
              icon = 'http://i.imgur.com/xPYbdLB.png';
              break;
            case 'DA_CHUYEN' :
            // green circle
              icon = 'http://i.imgur.com/nqFCc3z.png';
              break;
            case 'DA_XU_LY':
            case 'DA_DUYET':
                // blue circle
              icon = 'http://i.imgur.com/UvpFBxi.png';
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
        });
    }

    $scope.mouseOver = function (latitude, longtitude) {
        $scope.map.setCenter(new google.maps.LatLng(latitude, longtitude));
        $scope.map.setZoom(14);
    }
    $scope.mouseLeave = function () {
        $scope.map.setCenter(averageLatLong);
        $scope.map.setZoom(11);
    }
    $scope.pager = {};
    $scope.setPage = setPage;

    initController();

    // init the filtered items
    $scope.updateAfterSearch = function () {
        var tempRequests = $scope.filteredRequests;
        $scope.firstFilter = $filter('filter')($rootScope.requests, $scope.searchInput);
        $scope.filteredRequests = $filter('filter')($scope.firstFilter, function (req) {
            if (($scope.isReceived && req.statusId == 'DA_TIEP_NHAN')
              || ($scope.isInProgress && req.statusId == 'DA_CHUYEN')
              || ($scope.isResolved && (req.statusId == 'DA_XU_LY' || req.statusId == 'DA_DUYET'))) {
              return true;
            }
            return false;
        });
        if (!_.isEqual(tempRequests, $scope.filteredRequests)) {
            $scope.setPage(1, $scope.filteredRequests);
            $scope.createMap($scope.filteredRequests);
        }

    };

    function initController() {
        requestManager.loadAllRequests().then(function (requests){
            $rootScope.requests = requests;
              // functions have been describe process the data for display
            $scope.updateAfterSearch();

            $scope.$watch('requests + searchInput + isReceived + isInProgress + isResolved', function (newVal, oldVal) {
                $scope.updateAfterSearch();
            });
        });
        // initialize to page 1

    }

    function setPage(page, filterItems) {
        if (page < 1 || page > $scope.pager.totalPages) {
            return;
        }

        // get pager object from service
        $scope.pager = PagerService.GetPager(filterItems.length, page, $scope.requestPerPage);
        // get current page of items
        $scope.showRequests = filterItems.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }
});

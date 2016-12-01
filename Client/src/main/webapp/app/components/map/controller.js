app.controller('mapViewController', function ($rootScope, $scope, $filter, requestManager, commentManager, PagerService, $filter){
    $scope.requestPerPage = 5;
    $scope.comments = [];
    $scope.comments = $rootScope.comments;
    var myLatLng = {lat: 10.78, lng: 106.65};

    $scope.filterRequests = $filter('filter')($rootScope.requests, {'statusId':'!DA_XOA'});

    $scope.createMap = function (){
        var iconBase = "assets/resources/markerIcon/";
        $scope.map = new google.maps.Map(document.getElementById('mainMap'), {
            zoom: 13,
            center: myLatLng
        });
        $scope.markers = [];
        $.each($scope.filterRequests, function(index, request) {
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
        $scope.map.setZoom(15);
    }
    $scope.mouseLeave = function () {
        $scope.map.setCenter(myLatLng);
        $scope.map.setZoom(13);
    }
    $scope.pager = {};
    $scope.setPage = setPage;

    initController();

    function initController() {
        $scope.setPage(1);
        $scope.createMap();
    }

    function setPage(page) {
        if (page < 1 || page > $scope.pager.totalPages) {
            return;
        }

        // get pager object from service
        $scope.pager = PagerService.GetPager($scope.filterRequests.length, page, $scope.requestPerPage);
        // get current page of items
        $scope.showRequests = $scope.filterRequests.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }


});

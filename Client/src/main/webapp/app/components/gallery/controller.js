app.controller('galleryViewController', function ($rootScope, $scope, $filter, requestManager, commentManager, PagerService){
    $scope.requestPerPage = 6;
    $scope.comments = [];
    $scope.comments = $rootScope.comments;

    var myLatLng = {lat: 10.78, lng: 106.65};

    $scope.filterRequests = $filter('filter')($rootScope.requests, {'statusId':'!DA_XOA'});

    $scope.createMap = function (){
        var iconBase = "assets/resources/markerIcon/";
        $scope.map = new google.maps.Map(document.getElementById('mainMap'), {
            zoom: 12,
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
        $scope.map.setZoom(14);
    }
    $scope.mouseLeave = function () {
        $scope.map.setCenter(myLatLng);
        $scope.map.setZoom(12);
    }

    $scope.pager = {};
    $scope.setPage = setPage;

    initController();

    function initController() {
        requestManager.loadAllRequests().then(function (requests){
            $rootScope.requests = requests;
              // functions have been describe process the data for display
            $scope.setPage(1);
            $scope.createMap();
            $scope.$watch('requests', function (newVal, oldVal) {
                $scope.setPage(1);
                $scope.createMap();
            });
        });
        // initialize to page 1
    }

    var partition = function (input, size) {
        var newArr = [];
        for (var i = 0; i < input.length; i += size) {
            newArr.push(input.slice(i, i + size));
        }
        return newArr;
    }

    function setPage(page) {
        if (page < 1 || page > $scope.pager.totalPages) {
            return;
        }
        // get pager object from service
        $scope.pager = PagerService.GetPager($scope.filterRequests.length, page, $scope.requestPerPage);
        // get current page of items
        $scope.showRequests = $rootScope.requests.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);

        var photos = [];
    
        for(var i = 0; i < $scope.showRequests.length; i++) {
            photos.push({
                id: $scope.showRequests[i].serviceRequestId,
                longitude: $scope.showRequests[i].longitude,
                latitude: $scope.showRequests[i].latitude,
                name: $scope.showRequests[i].serviceName,
                path: $scope.showRequests[i].mediaUrl
            });
        }

        $scope.issueImages = {
            photos: photos,
            photos3p: partition(photos, photos.length/3)
        };
    }

});

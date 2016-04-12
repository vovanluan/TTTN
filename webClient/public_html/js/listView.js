$(document).ready(function() {
	alert("hello;")
	var items = [];
	var iconBase = "resources/markerIcon/";
	$.ajax({
		method: "GET",
		url: "http://localhost:8080/restful-open311/webresources/com.bk.khmt.restful.open311.requests",
		contentType: "application/json;charset=UTF-8"
	})
	.done(function(data) {		
		// init Map
	    var myLatLng = {lat: 10.78, lng: 106.65};
	    map = new google.maps.Map(document.getElementById('mainMap'), {
	        zoom: 11,
	        center: myLatLng
	    });   			
		$.each(data, function(index, item) {
			items.push(item);
			console.log(JSON.stringify(item));
			var latlng = new google.maps.LatLng(item.latitude, item.longitude);
			var icon = "";
			switch(item.statusId) {
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
		        map: map,
		        draggable: false,
		        animation: google.maps.Animation.DROP,
		        icon : iconBase + icon
		    });			
		  	var infowindow = new google.maps.InfoWindow({
		    	content: item.serviceName
		  	});			    
			marker.addListener('mouseover', function() {
			   	infowindow.open(map, marker);
			});			  	
			marker.addListener('mouseout', function() {
			   	infowindow.close(map, marker);
			});					
		});
				
	})
	.fail(function(msg){
		console.log(msg);
	});

})
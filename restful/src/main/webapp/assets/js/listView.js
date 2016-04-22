function loadListView () {
	console.log("hello");
	var items = [];
	var iconBase = "resources/markerIcon/";

	var title, address, content, date, userId, url, userName;


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

			title = item.serviceName;
			address = item.address;
			content = item.description;
			date = item.happenDatetime;
			user = item.userId;
			url = item.mediaUrl;
			getUserName("2","1");
			console.log(userName);

			$('#issue-list-ul').append('<li id="issue_id_'+ index +'"><div class="issue-image"><img src="'+ url +'" class="thumbnail-image"></div><div class="issue-panel"><h5 class="issue-title"><a href="" class="issue-link">Issue '+ index +' - '+ title +'</a></h5><p class="issue-address">'+ address +'</p><p class="issue-content">'+ content +'</p><span class="info">'+ date +'<span class="sep">•</span><span>Đăng bởi </span><a href="" class="user">'+ userName +'</a></span><ul class="issue-comments"><li id="comment_id_2"><h5 class="user-name"><a href="" class="user-link">User 1</a></h5><div class="commentText">Đã ghi nhận trường hợp này</div><sapn class="info">1016-14-4</sapn></li><li id="comment_id_1"><h5 class="user-name"><a href="" class="user-link">User 2</a></h5><div class="commentText">Đã giải quyết trường hợp này</div><sapn class="info">1016-14-4</sapn></li></ul></div></li>');			
		});
				
	})
	.fail(function(msg){
		console.log(msg);
	});
}




function getUserName (userRole,userId) {
	var urlUser = "http://localhost:8080/restful-open311/webresources/com.bk.khmt.restful.open311.users/" + userId;
	var urlGuest = "http://localhost:8080/restful-open311/webresources/com.bk.khmt.restful.open311.guest/" + userId;
	switch(userRole){
		case "1":
			$.ajax({
			method: "GET",
			url: urlUser,
			contentType: "application/json;charset=UTF-8"
			})
			.done(function(data){
				userName = data.guestName;
			})
			.fail(function(msg){
				console.log(msg);
			});
			break;
		case "2":
			$.ajax({
			method: "GET",
			url: urlGuest,
			contentType: "application/json;charset=UTF-8"
			})
			.done(function(data){
				userName = data.guestName;
			})
			.fail(function(msg){
				console.log(msg);
			});
			break;

	}
}

window.onload = loadListView;


function Request(code, name, description, latitude, longitude, address, happenTime, requestedTime, updatedTime, expectedTime, statusId, mediaUrl ){
	this.serviceRequestId = 1;
	this.serviceCode = code;
	this.serviceName = name;
	this.description = description;
	this.latitude = latitude;
	this.longitude = longitude;
	this.address = address;
	this.happenDatetime = happenTime;
	this.requestedDatetime = requestedTime;
	this.updatedDatetime = updatedTime;
	this.expectedDatetime = expectedTime;
	this.statusId = statusId;
	this.mediaUrl = mediaUrl;
}
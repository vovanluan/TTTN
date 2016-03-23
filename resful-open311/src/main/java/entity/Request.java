/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.sql.Timestamp;

/**
 *
 * @author Luan
 */
public class Request {
    private String requestID;
    private String serviceCode;
    private String serviceName;
    private String description;
    private boolean  metadata;
    private float latitude, longitude;
    private String address;
    private int addressID;
    private Timestamp requestedTime, updatedTime, expectedTime;
    private String zipcode;
    private int statusID;
    private String mediaURL;
    private String keywords;
    private String groupName;
    
    public String getRequestID() {
        return requestID;
    }

    public void setRequestID(String requestID) {
        this.requestID = requestID;
    }

    public String getServiceCode() {
        return serviceCode;
    }

    public void setServiceCode(String serviceCode) {
        this.serviceCode = serviceCode;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean getMetadata() {
        return metadata;
    }

    public void setMetadata(boolean metadata) {
        this.metadata = metadata;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getAddressID() {
        return addressID;
    }

    public void setAddressID(int addressID) {
        this.addressID = addressID;
    }

    public Timestamp getRequestedTime() {
        return requestedTime;
    }

    public void setRequestedTime(Timestamp requestedTime) {
        this.requestedTime = requestedTime;
    }

    public Timestamp getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(Timestamp updatedTime) {
        this.updatedTime = updatedTime;
    }

    public Timestamp getExpectedTime() {
        return expectedTime;
    }

    public void setExpectedTime(Timestamp expectedTime) {
        this.expectedTime = expectedTime;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public int getStatusID() {
        return statusID;
    }

    public void setStatusID(int statusID) {
        this.statusID = statusID;
    }

    public String getMediaURL() {
        return mediaURL;
    }

    public void setMediaURL(String mediaURL) {
        this.mediaURL = mediaURL;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }
    
}

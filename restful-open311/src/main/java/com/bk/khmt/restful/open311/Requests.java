/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.bk.khmt.restful.open311;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Luan
 */
@Entity
@Table(name = "requests")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Requests.findAll", query = "SELECT r FROM Requests r"),
    @NamedQuery(name = "Requests.findByServiceRequestId", query = "SELECT r FROM Requests r WHERE r.serviceRequestId = :serviceRequestId"),
    @NamedQuery(name = "Requests.findByServiceCode", query = "SELECT r FROM Requests r WHERE r.serviceCode = :serviceCode"),
    @NamedQuery(name = "Requests.findByServiceName", query = "SELECT r FROM Requests r WHERE r.serviceName = :serviceName"),
    @NamedQuery(name = "Requests.findByDescription", query = "SELECT r FROM Requests r WHERE r.description = :description"),
    @NamedQuery(name = "Requests.findByMetadata", query = "SELECT r FROM Requests r WHERE r.metadata = :metadata"),
    @NamedQuery(name = "Requests.findByLatitude", query = "SELECT r FROM Requests r WHERE r.latitude = :latitude"),
    @NamedQuery(name = "Requests.findByLongitude", query = "SELECT r FROM Requests r WHERE r.longitude = :longitude"),
    @NamedQuery(name = "Requests.findByAddress", query = "SELECT r FROM Requests r WHERE r.address = :address"),
    @NamedQuery(name = "Requests.findByAddressId", query = "SELECT r FROM Requests r WHERE r.addressId = :addressId"),
    @NamedQuery(name = "Requests.findByRequestedDatetime", query = "SELECT r FROM Requests r WHERE r.requestedDatetime = :requestedDatetime"),
    @NamedQuery(name = "Requests.findByUpdatedDatetime", query = "SELECT r FROM Requests r WHERE r.updatedDatetime = :updatedDatetime"),
    @NamedQuery(name = "Requests.findByExpectedDatetime", query = "SELECT r FROM Requests r WHERE r.expectedDatetime = :expectedDatetime"),
    @NamedQuery(name = "Requests.findByZipcode", query = "SELECT r FROM Requests r WHERE r.zipcode = :zipcode"),
    @NamedQuery(name = "Requests.findByStatusId", query = "SELECT r FROM Requests r WHERE r.statusId = :statusId"),
    @NamedQuery(name = "Requests.findByMediaUrl", query = "SELECT r FROM Requests r WHERE r.mediaUrl = :mediaUrl"),
    @NamedQuery(name = "Requests.findByKeywords", query = "SELECT r FROM Requests r WHERE r.keywords = :keywords"),
    @NamedQuery(name = "Requests.findByGroupName", query = "SELECT r FROM Requests r WHERE r.groupName = :groupName")})
public class Requests implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "service_request_id")
    private Integer serviceRequestId;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "service_code")
    private int serviceCode;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "service_name")
    private String serviceName;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 500)
    @Column(name = "description")
    private String description;
    
    @Basic(optional = false)
    @Column(name = "metadata", nullable = true)
    private boolean metadata;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "latitude")
    private float latitude;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "longitude")
    private float longitude;
    
    @Size(max = 100)
    @Column(name = "address")
    private String address;
    
    @Column(name = "address_id", nullable = true)
    private Integer addressId;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "happen_datetime", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date happenDatetime;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "requested_datetime", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date requestedDatetime;
    
    @Column(name = "updated_datetime", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedDatetime;
    
    @Column(name = "expected_datetime", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date expectedDatetime;
    
    @Size(max = 100)
    @Column(name = "zipcode", nullable = true)
    private String zipcode;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "status_id")
    private int statusId;
    
    @Size(max = 200)
    @Column(name = "media_url", nullable = true)
    private String mediaUrl;
    
    @Size(max = 100)
    @Column(name = "keywords", nullable = true, length=100)
    private String keywords;
    
    @Size(max = 20)
    @Column(name = "group_name", nullable = true)
    private String groupName;

    public Requests() {
    }

    public Requests(Integer serviceRequestId) {
        this.serviceRequestId = serviceRequestId;
    }

    public Requests(Integer serviceRequestId, int serviceCode, String serviceName, String description, boolean metadata, float latitude, float longitude, Date requestedDatetime, Date updatedDatetime, Date expectedDatetime, int statusId) {
        this.serviceRequestId = serviceRequestId;
        this.serviceCode = serviceCode;
        this.serviceName = serviceName;
        this.description = description;
        this.metadata = metadata;
        this.latitude = latitude;
        this.longitude = longitude;
        this.requestedDatetime = requestedDatetime;
        this.updatedDatetime = updatedDatetime;
        this.expectedDatetime = expectedDatetime;
        this.statusId = statusId;
    }

    public Integer getServiceRequestId() {
        return serviceRequestId;
    }

    public void setServiceRequestId(Integer serviceRequestId) {
        this.serviceRequestId = serviceRequestId;
    }

    public int getServiceCode() {
        return serviceCode;
    }

    public void setServiceCode(int serviceCode) {
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

    public Integer getAddressId() {
        return addressId;
    }

    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    public Date getRequestedDatetime() {
        return requestedDatetime;
    }

    public void setRequestedDatetime(Date requestedDatetime) {
        this.requestedDatetime = requestedDatetime;
    }

    public Date getUpdatedDatetime() {
        return updatedDatetime;
    }

    public void setUpdatedDatetime(Date updatedDatetime) {
        this.updatedDatetime = updatedDatetime;
    }

    public Date getExpectedDatetime() {
        return expectedDatetime;
    }

    public void setExpectedDatetime(Date expectedDatetime) {
        this.expectedDatetime = expectedDatetime;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    public String getMediaUrl() {
        return mediaUrl;
    }

    public void setMediaUrl(String mediaUrl) {
        this.mediaUrl = mediaUrl;
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (serviceRequestId != null ? serviceRequestId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Requests)) {
            return false;
        }
        Requests other = (Requests) object;
        if ((this.serviceRequestId == null && other.serviceRequestId != null) || (this.serviceRequestId != null && !this.serviceRequestId.equals(other.serviceRequestId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.bk.khmt.restful.open311.Requests[ serviceRequestId=" + serviceRequestId + " ]";
    }
    
}

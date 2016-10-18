/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import support.Status;

/**
 *
 * @author Luan
 */

@Entity
@Table(name = "request")

@XmlRootElement
public class Request implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_request_id")
    private Integer serviceRequestId;
    
    @NotNull
    @Column(name = "service_code", nullable = false)
    private int serviceCode;
    
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "service_name", nullable = false)
    private String serviceName;
    
    @NotNull
    @Size(min = 1, max = 500)
    @Column(name = "description", nullable = false)
    private String description;
    
    @NotNull
    @Column(name = "latitude", nullable = false)
    private float latitude;
    
    @NotNull
    @Column(name = "longitude", nullable = false)
    private float longitude;
    
    @Size(max = 100)
    @Column(name = "address", nullable = false)
    private String address;
    
    @Column(name = "address_id")
    private Integer addressId;
    
    @NotNull
    @Column(name = "happen_datetime", nullable = false, columnDefinition="TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date happenDatetime;
  
    @NotNull
    @Column(name = "requested_datetime", nullable = false, columnDefinition="TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date requestedDatetime;
    
    @Column(name = "updated_datetime", nullable = true, columnDefinition="TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedDatetime;
    
    @Column(name = "expected_datetime", nullable = true, columnDefinition="TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expectedDatetime;
    
    @Size(max = 100)
    @Column(name = "zipcode")
    private String zipcode;
    
    @Column(name = "metadata")
    private Boolean metadata;
    
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status_id", nullable = false)
    private Status statusId;
    
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    
    @OneToMany(mappedBy = "request", fetch=FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();    
    
    @Size(max = 200)
    @Column(name = "media_url", nullable = true)
    private String mediaUrl;
    
    @Size(max = 100)
    @Column(name = "keywords", nullable = true, length=100)
    private String keywords;
    
    @Size(max = 20)
    @Column(name = "group_name", nullable = true)
    private String groupName;

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

    public Date getHappenDatetime() {
        return happenDatetime;
    }

    public void setHappenDatetime(Date happenDatetime) {
        this.happenDatetime = happenDatetime;
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

    public Boolean getMetadata() {
        return metadata;
    }

    public void setMetadata(Boolean metadata) {
        this.metadata = metadata;
    }

    public Status getStatusId() {
        return statusId;
    }

    public void setStatusId(Status statusId) {
        this.statusId = statusId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @XmlTransient
    public List<Comment> getComments() {
        return comments;
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
        comment.setRequest(this);
    }
    
    public void removeComment(Comment comment) {
        comment.setRequest(null);
        this.comments.remove(comment);
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
    
}
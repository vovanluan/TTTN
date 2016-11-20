package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
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

@Entity(name="Request")
@Table(name = "request")
@XmlRootElement
public class Request implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_request_id")
    private long serviceRequestId;
    
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "service_subject", nullable = false)
    private String serviceSubject;
    
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "service_name", nullable = false)
    private String serviceName;
    
    @NotNull
    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
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
    
    @JoinColumn(name = "division_id", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Division division;    
    
    @JoinColumn(name = "vice_president_received", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User vicePresidentReceived;

    @JoinColumn(name = "vice_president_approved", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User vicePresidentApproved;
    
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

    public long getServiceRequestId() {
        return serviceRequestId;
    }

    public void setServiceRequestId(long serviceRequestId) {
        this.serviceRequestId = serviceRequestId;
    }

    public String getServiceSubject() {
        return serviceSubject;
    }

    public void setServiceSubject(String serviceSubject) {
        this.serviceSubject = serviceSubject;
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

    public Division getDivision() {
        return division;
    }

    public void setDivision(Division division) {
        this.division = division;
    }

    public User getVicePresidentReceived() {
        return vicePresidentReceived;
    }

    public void setVicePresidentReceived(User vicePresidentReceived) {
        this.vicePresidentReceived = vicePresidentReceived;
    }

    public User getVicePresidentApproved() {
        return vicePresidentApproved;
    }

    public void setVicePresidentApproved(User vicePresidentApproved) {
        this.vicePresidentApproved = vicePresidentApproved;
    }
    
    @XmlTransient
    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
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
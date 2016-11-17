package entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author TranVanTai
 */

@Entity
@DiscriminatorValue("vice_president")
@NamedQueries({
    @NamedQuery(name = "VicePresidentUser.findByEmail", query = "SELECT u FROM VicePresidentUser u WHERE u.email=:email"),
    @NamedQuery(name = "VicePresidentUser.findByIdentifyCard", query = "SELECT u FROM VicePresidentUser u WHERE u.identifyCard=:identifyCard"),
    @NamedQuery(name = "VicePresidentUser.findByEmailAndPassword", query = "SELECT u FROM VicePresidentUser u WHERE u.email=:email AND u.passWord=:password"),
    @NamedQuery(name = "VicePresidentUser.findByToken", query = "SELECT u FROM VicePresidentUser u WHERE u.token=:token"),
})
public class VicePresidentUser extends User {
    
    @Size(min = 1, max = 40)
    @Column(name = "password", nullable = false)
    private String passWord;
    
    @Size(min = 1, max = 20)
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;
    
    @Size(min = 1, max = 40)
    @Column(name = "identify_card", nullable = false)
    private String identifyCard;
    
//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "vicePresident", fetch = FetchType.LAZY)
//    private List<Request> receivedRequests = new ArrayList<>();  

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }
    
//    @XmlTransient
//    public List<Request> getReceivedRequests() {
//        return receivedRequests;
//    }
//
//    public void addReceivedRequest(Request req) {
//        this.receivedRequests.add(req);
//        req.setVicePresident(this);
//    }
//    
//    public void removeReceivedRequest(Request req) {
//        this.receivedRequests.remove(req);
//    }  

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getIdentifyCard() {
        return identifyCard;
    }

    public void setIdentifyCard(String identifyCard) {
        this.identifyCard = identifyCard;
    }
    
}

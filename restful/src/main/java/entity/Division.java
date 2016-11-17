package entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Tai
 */
@Entity
@Table(name = "division")
@XmlRootElement
public class Division {
      
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    
    @NotNull
    @Size(min = 1, max = 40)
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "division", fetch = FetchType.LAZY)
    private List<Request> receivedRequests = new ArrayList<>();  
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "division", fetch = FetchType.LAZY)
    private List<DivisionUser> divisionUsers = new ArrayList<>();
    
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @XmlTransient
    public List<Request> getReceivedRequests() {
        return receivedRequests;
    }

    public void addReceivedRequest(Request req) {
        this.receivedRequests.add(req);
        req.setDivision(this);
    }
    
    public void removeReceivedRequest(Request req) {
        this.receivedRequests.remove(req);
    }     

    public List<DivisionUser> getDivisionUsers() {
        return divisionUsers;
    }

    public void setDivisionUsers(List<DivisionUser> divisionUsers) {
        this.divisionUsers = divisionUsers;
    }

    public void addDivisionUser(DivisionUser user) {
        this.divisionUsers.add(user);
        user.setDivision(this);
    }
    
    public void removeReceivedRequest(DivisionUser user) {
        this.divisionUsers.remove(user);
    }  
    
}

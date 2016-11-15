package entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author TranVanTai
 */

@Entity
@Table(name = "official_user")
@DiscriminatorValue("official")
@NamedQueries({
    @NamedQuery(name = "OfficialUser.findByEmail", query = "SELECT u FROM OfficialUser u WHERE u.email=:email"),
    @NamedQuery(name = "OfficialUser.findByEmailAndPassword", query = "SELECT u FROM OfficialUser u WHERE u.email=:email AND u.passWord=:password"),
    @NamedQuery(name = "OfficialUser.findByToken", query = "SELECT u FROM OfficialUser u WHERE u.token=:token"),
})
public class OfficialUser extends User {
    
    @Size(min = 1, max = 40)
    @Column(name = "password", nullable = false)
    private String passWord;
    
    @JoinColumn(name = "office_id", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Office office;    
    
    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public Office getOffice() {
        return office;
    }

    public void setOffice(Office office) {
        this.office = office;
    }

    
}

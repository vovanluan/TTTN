package entity;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.validation.constraints.Size;

/**
 *
 * @author TranVanTai
 */

@Entity
@DiscriminatorValue("vice_president")
@NamedQueries({
    @NamedQuery(name = "VicePresidentUser.findByEmail", query = "SELECT u FROM VicePresidentUser u WHERE u.email=:email"),
    @NamedQuery(name = "VicePresidentUser.findByEmailAndPassword", query = "SELECT u FROM VicePresidentUser u WHERE u.email=:email AND u.passWord=:password"),
    @NamedQuery(name = "VicePresidentUser.findByToken", query = "SELECT u FROM VicePresidentUser u WHERE u.token=:token"),
})
public class VicePresidentUser extends User {
    
    @Size(min = 1, max = 40)
    @Column(name = "password", nullable = false)
    private String passWord;

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

}

package entity;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;

/**
 *
 * @author TranVanTai
 */

@Entity
@Table(name = "admin_user")
@DiscriminatorValue("admin")
@NamedQueries({
    @NamedQuery(name = "AdminUser.findByEmail", query = "SELECT u FROM AdminUser u WHERE u.email=:email"),
    @NamedQuery(name = "AdminUser.findByEmailAndPassword", query = "SELECT u FROM AdminUser u WHERE u.email=:email AND u.passWord=:password"),
    @NamedQuery(name = "AdminUser.findByToken", query = "SELECT u FROM AdminUser u WHERE u.token=:token"),
})
public class AdminUser extends User {
    
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

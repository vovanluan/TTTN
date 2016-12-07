/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
 * @author Luan
 */
@Entity
@DiscriminatorValue("normal")
@NamedQueries({
    @NamedQuery(name = "NormalUser.findByEmail", query = "SELECT u FROM NormalUser u WHERE u.email=:email"),
    @NamedQuery(name = "NormalUser.findByIdentifyCard", query = "SELECT u FROM NormalUser u WHERE u.identifyCard=:identifyCard"),
    @NamedQuery(name = "NormalUser.findByEmailAndPassword", query = "SELECT u FROM NormalUser u WHERE u.email=:email AND u.passWord=:password"),
    @NamedQuery(name = "NormalUser.findByToken", query = "SELECT u FROM NormalUser u WHERE u.token=:token"),
})
public class NormalUser extends User {
    
    @Size(min = 1, max = 40)
    @Column(name = "password")
    private String passWord;
    
    @Size(min = 1, max = 20)
    @Column(name = "phone_number")
    private String phoneNumber;
    
    @Size(min = 1, max = 40)
    @Column(name = "identify_card")
    private String identifyCard;

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

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

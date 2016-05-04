/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 *
 * @author Luan
 */
@Entity
@Table(name = "guest_user")
@DiscriminatorValue("guest")

public class GuestUser extends User{
    
}

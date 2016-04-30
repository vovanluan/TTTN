/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Luan
 */

@Entity
@Table(name = "user")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name="user_type")
@XmlRootElement

public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer Id;
    
    @Size(min = 1, max = 40)
    @Column(name = "name", nullable = false)
    private String name;
    
    @Size(min = 1, max = 40)
    @Column(name = "email", nullable = false)
    private String email;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "user", fetch = FetchType.LAZY)
    private Collection<Comment> comments = new ArrayList<>();
    
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Collection<Request> requests = new ArrayList<>();
    
    @Size(min = 1, max = 1000)
    @Column(name = "token")
    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Collection<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
    
    public void addComment(Comment comment){
        this.comments.add(comment);
    }
    
    public Integer getId() {
        return Id;
    }

    public void setId(Integer Id) {
        this.Id = Id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
   
    public Collection<Request> getRequests() {
        return requests;
    }

    public void setRequests(List<Request> requests) {
        this.requests = requests;
    }

    public void addRequest(Request request){
        this.requests.add(request);
    }
}

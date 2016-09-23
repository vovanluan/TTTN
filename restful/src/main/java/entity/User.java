/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
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

/**
 *
 * @author Luan
 */

@Entity
@Table(name = "user")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name="user_type")

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

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", fetch = FetchType.LAZY)
    private List<Request> requests = new ArrayList<>();
    
    @Size(min = 1, max = 1000)
    @Column(name = "token")
    private String token;
    
    @Size(min = 1, max = 1000)
    @Column(name = "user_type")
    private String userType;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    
    public List<Comment> getComments(){
        return this.comments;
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
        comment.setUser(this);
    }
    
    public void removeComment(Comment comment){
        comment.setUser(null);
        this.comments.remove(comment);
    }
    
    public List<Request> getRequests() {
        return requests;
    }

    public void addRequest(Request request) {
        this.requests.add(request);
        request.setUser(this);
    }
    
    public void removeRequest(Request request){
        request.setUser(null);
        this.requests.remove(request);
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

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
    
}

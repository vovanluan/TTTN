/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entity.User;
import io.jsonwebtoken.Claims;
import javax.persistence.Query;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import dto.Credentials;
import support.General;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

/**
 *
 * @author TranVanTai
 */
@Path("authentication/user")
@Stateless
public class AuthenticationEndpoint {

    @PersistenceContext(unitName = "open311")
    private EntityManager em;
    private User userInfo;
    String role = "";

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public Response authenticationUser(Credentials credentials) throws Exception {
        String email = credentials.getEmail();
        String password = credentials.getPassword();
        String token;
        int EXPIRE_TIME = 86400 * 1000; //86400s = 1 day

        try {
            userInfo = isUserExist(email, password);
        } catch (NoResultException e) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        //Generate new token
        token = JWT.createJWT(email, EXPIRE_TIME, role);
        Claims claims = JWT.parseJWT(token);

        //Update new token into database
        userInfo.setToken(token);
        
        em.merge(userInfo);

        return Response.ok(userInfo).build();
    }

    private User isUserExist(String email, String password) throws NoResultException, NoSuchAlgorithmException, InvalidKeySpecException {
        //Check if email is correct in User table
        Query firstQuery = em.createQuery("SELECT u FROM User u WHERE u.email=:email AND u.type!='guest'");
        firstQuery.setParameter("email", email);
        User user = (User) firstQuery.getSingleResult();
        role = (String) user.getDiscriminatorValue();
        String statement = "";
        System.out.println("===============NULL===============" + user + role);
        switch (role) {
            case "normal":
                statement = "NormalUser.findByEmailAndPassword";
                break;
            case "admin":
                statement = "AdminUser.findByEmailAndPassword";
                break;
            case "official":
                statement = "OfficialUser.findByEmailAndPassword";
                break;
            case "division":
                statement = "DivisionUser.findByEmailAndPassword";
                break;
            case "vice_president":
                statement = "VicePresidentUser.findByEmailAndPassword";
                break;
        }

        //Check if password is correct in specific user type table
        Query sencondQuery = em.createNamedQuery(statement);
        sencondQuery.setParameter("email", email);
        sencondQuery.setParameter("password", General.hashPassword(password));

        return (User) sencondQuery.getSingleResult();
    }

}

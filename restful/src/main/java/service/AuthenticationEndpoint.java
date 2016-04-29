/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entity.NormalUser;
import entity.User;
import io.jsonwebtoken.Claims;
import java.util.List;
import javax.naming.InitialContext;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.UserTransaction;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import support.Credentials;
import support.General;

/**
 *
 * @author TranVanTai
 */

@Path("authentication/normaluser")
public class AuthenticationEndpoint {
    @PersistenceContext(unitName = "open311")
    private EntityManager em;
    private final int EXPIRE_TIME = 86400 * 1000; //86400(s) = 1 day
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public Response authenticationUser(Credentials credentials) throws Exception{
        String email = credentials.getEmail();
        String password = credentials.getPassword();
        if(authentication(email,password)){
            // Generate new token
            String token = issueToken(email, "normal_user"); 
            Claims claims = (new JWT()).parseJWT(token);
            
            // Update new token into database
            UserTransaction transaction = (UserTransaction)new InitialContext().lookup("java:comp/UserTransaction");
            transaction.begin();
            Query q = em.createQuery ("UPDATE NormalUser s SET s.token = :token WHERE s.email = :email");
            q.setParameter ("email", email);
            q.setParameter ("token", token);
            int updated = q.executeUpdate();
            transaction.commit();
            // get user information, then send it to client
            Query queryEmail = em.createQuery("SELECT u FROM NormalUser u WHERE u.email=:email");
            queryEmail.setParameter("email", email);
            List<NormalUser> users = queryEmail.getResultList();
            return Response.ok(users.get(0)).build();
        } 
        else return Response.status(Response.Status.UNAUTHORIZED).build();        
    }


    private boolean authentication(String email, String password) throws Exception{ 
        Query q = em.createQuery("SELECT u FROM NormalUser u WHERE u.email=:email and u.passWord=:password");
        q.setParameter("email", email);
        q.setParameter("password", (new General()).hashPassword(password));
        NormalUser user = (NormalUser) q.getSingleResult();
        if(user.getComments().isEmpty()) {
            System.out.println("Cannot cascade");
        }
        if(user == null) 
            return false;
        return true;
    }

    private String issueToken(String username, String role) throws Exception{
        JWT jwt = new JWT();
        return jwt.createJWT(username,EXPIRE_TIME, role);
    }
}

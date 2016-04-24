/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entity.NormalUser;
import entity.User;
import java.util.List;
import javax.naming.InitialContext;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.UserTransaction;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import support.General;

/**
 *
 * @author TranVanTai
 */

@Path("authentication/normaluser")
public class AuthenticationEndpoint {
    @PersistenceContext(unitName = "open311")
    private EntityManager em;
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public Response authenticationUser(@QueryParam("email") String email, @QueryParam("password") String password) throws Exception{
        if(authentication(email,password)){
            String token = issueToken(email);
            Query queryEmail = em.createQuery("SELECT u FROM User u WHERE u.email=:email");
            queryEmail.setParameter("email", email);
            List<User> users = queryEmail.getResultList();
            
            UserTransaction transaction = (UserTransaction)new InitialContext().lookup("java:comp/UserTransaction");
            transaction.begin();
            Query q = em.createQuery ("UPDATE User s SET s.token = :token WHERE s.email = :email");
            q.setParameter ("email", email);
            q.setParameter ("token", token);
            int updated = q.executeUpdate();
            transaction.commit();

            return Response.ok(token).build();
        } 
        else return Response.status(Response.Status.UNAUTHORIZED).build();        
    }

    private boolean authentication(String email, String password) throws Exception{
        Query queryEmail = em.createQuery("SELECT u FROM User u WHERE u.email=:email");
        queryEmail.setParameter("email", email);
        List<User> usersEmail = queryEmail.getResultList();
        if(!usersEmail.isEmpty()){
            Query queryPassword = em.createQuery("SELECT v FROM NormalUser v WHERE v.passWord=:password");
            queryPassword.setParameter("password", (new General()).hashPassword(password));
            List<NormalUser> usersPassword = queryPassword.getResultList();
            if(!usersPassword.isEmpty()) return true;
            else return false;
        }
        else return false;   
    }

    private String issueToken(String username) throws Exception{
        JWT jwt = new JWT();
        return jwt.createJWT(username,20000);
    }
}

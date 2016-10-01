/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entity.User;
import io.jsonwebtoken.Claims;
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
import dto.Credentials;
import support.General;
import entity.NormalUser;
import javax.persistence.NoResultException;

/**
 *
 * @author TranVanTai
 */
@Path("authentication/user")
public class AuthenticationEndpoint {

    @PersistenceContext(unitName = "open311")
    private EntityManager em;
    private final int EXPIRE_TIME = 86400 * 1000; //86400s = 1 day
    private String role;

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public Response authenticationUser(Credentials credentials) throws Exception {
        String email = credentials.getEmail();
        String password = credentials.getPassword();

        if (!isUserExist(email, password)) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        //Generate new token
        String token = JWT.createJWT(email, EXPIRE_TIME, role);
        Claims claims = JWT.parseJWT(token);

        //Update new token into database
        UserTransaction transaction = (UserTransaction) new InitialContext().lookup("java:comp/UserTransaction");
        transaction.begin();
        Query q = em.createQuery("UPDATE User s SET s.token = :token WHERE s.email = :email");
        q.setParameter("email", email);
        q.setParameter("token", token);
        int updated = q.executeUpdate();
        transaction.commit();

        //Get user information, then send it to client
        Query queryEmail = em.createQuery("SELECT u FROM " + role.substring(0, 1).toUpperCase() + role.substring(1) + "User u WHERE u.email=:email");
        queryEmail.setParameter("email", email);
        NormalUser userInfo = (NormalUser) queryEmail.getSingleResult();

        return Response.ok(userInfo).build();
    }

    private boolean isUserExist(String email, String password) throws Exception {
        try {
            //Check if email is correct in User table
            Query firstQuery = em.createQuery("SELECT u FROM User u WHERE u.email=:email", User.class);
            firstQuery.setParameter("email", email);
            User user = (User) firstQuery.getSingleResult();

            //Check if password is correct in specific user type table
            role = user.getUserType();
            Query sencondQuery = em.createQuery("SELECT u FROM " + role.substring(0, 1).toUpperCase() + role.substring(1) + "User u WHERE u.email=:email AND u.passWord=:password");
            sencondQuery.setParameter("email", email);
            sencondQuery.setParameter("password", General.hashPassword(password));
            return sencondQuery.getSingleResult() != null;
        } catch(NoResultException e) {
            return false;
        }

    }

}

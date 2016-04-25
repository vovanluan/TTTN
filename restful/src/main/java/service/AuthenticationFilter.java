/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entity.User;
import java.io.IOException;
import java.util.List;
import javax.annotation.Priority;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

/**
 *
 * @author TranVanTai
 */

@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {
    @PersistenceContext(unitName = "open311")
    private EntityManager em;
    
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException{
        //Get HTTP header from the request
        String authourizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        System.out.println("Header: "+ authourizationHeader);
        
        if(authourizationHeader == null | !authourizationHeader.startsWith("Bearer")){
            throw new NotAuthorizedException("Authorize header must be provided");
        }
        
        //Extract the token 
        String token = authourizationHeader.substring("Bearer".length()).trim();
        System.out.println("token của bearer " + token);
        
        try{
            validateToken(token);
        }
        catch(Exception e){
            requestContext.abortWith(
                Response.status(Response.Status.BAD_GATEWAY).build());
        }
    }

    private void validateToken(String token) throws Exception {
        Query q = em.createNamedQuery("SELECT u FROM User u WHERE u.token=:token");
        q.setParameter("token", token);
        List<User> users = q.getResultList();
        
        System.out.println("token trong db " + users.get(0).getToken());
        if(users.isEmpty()) throw new Exception();
    }
}

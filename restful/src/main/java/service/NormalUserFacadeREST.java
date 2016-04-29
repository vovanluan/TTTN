/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entity.NormalUser;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.NotSupportedException;
import javax.transaction.SystemException;
import javax.transaction.UserTransaction;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import support.Credentials;
import support.General;
import static support.General.EXPIRE_TIME;

/**
 *
 * @author Luan
 */
@Stateless
@Path("entity.normaluser")
public class NormalUserFacadeREST extends AbstractFacade<NormalUser> {

    @PersistenceContext(unitName = "open311")
    private EntityManager em;

    public NormalUserFacadeREST() {
        super(NormalUser.class);
    }

    @POST
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @Produces(MediaType.APPLICATION_JSON)
    public Response signUp(NormalUser user) throws Exception  {
        // Check email already exist
        Query queryEmail = em.createQuery("SELECT u FROM NormalUser u WHERE u.email=:email");
        queryEmail.setParameter("email", user.getEmail());
        List <NormalUser> emailResult = queryEmail.getResultList();
        if (!emailResult.isEmpty())
        {
            return Response.status(Response.Status.CONFLICT).type("text/plain").entity("email").build();
        }
        // Check identifyCard already exist
        Query queryID = em.createQuery("SELECT u FROM NormalUser u WHERE u.identifyCard=:identifyCard");
        queryID.setParameter("identifyCard", user.getIdentifyCard());
        List <NormalUser> idResult = queryID.getResultList();
        if (!idResult.isEmpty())
        {
            return Response.status(Response.Status.CONFLICT).type("text/plain").entity("id").build();
        }        

        // Hash password
        try {
            user.setPassWord( (new General()).hashPassword(user.getPassWord()));
        } catch (NoSuchAlgorithmException ex) {
            Logger.getLogger(NormalUserFacadeREST.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InvalidKeySpecException ex) {
            Logger.getLogger(NormalUserFacadeREST.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        // Generate new token
        String token = (new JWT()).createJWT(user.getEmail(), EXPIRE_TIME, "normal_user");
        user.setToken(token);
        
        em.persist(user);
        return Response.ok(user).build();
    }
    
    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, NormalUser entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Secured
    @Path("{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public NormalUser find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    
    
    @POST
    @Secured
    @Path("getInfo")
    @Produces(MediaType.APPLICATION_JSON)
    public NormalUser getInfo(@QueryParam("email") String email) {
        Query q = em.createQuery("SELECT u FROM NormalUser u WHERE u.email=:email");
        q.setParameter("email", email);
        NormalUser user = (NormalUser) q.getSingleResult();
        System.out.println(user.getEmail());
        return user;
    }
    
    

    @GET
    @Override
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<NormalUser> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<NormalUser> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}

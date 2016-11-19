/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entity.OfficialUser;
import entity.VicePresidentUser;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
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
import support.General;

/**
 *
 * @author Admin
 */
@Stateless
@Path("entity.vicepresidentuser")
public class VicePresidentUserFacadeREST extends AbstractFacade<VicePresidentUser> {

    @PersistenceContext(unitName = "open311")
    private EntityManager em;

    public VicePresidentUserFacadeREST() {
        super(VicePresidentUser.class);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response signUp(VicePresidentUser user) throws Exception {
        // Check email already exist
        Query queryByEmail = em.createNamedQuery("VicePresidentUser.findByEmail");
        queryByEmail.setParameter("email", user.getEmail());
        List<VicePresidentUser> emailResult = queryByEmail.getResultList();
        if (!emailResult.isEmpty()) {
            return Response.status(Response.Status.CONFLICT).type("text/plain").entity("email").build();
        }

        // Hash password
        try {
            user.setPassWord(General.hashPassword(user.getPassWord()));
        } catch (NoSuchAlgorithmException | InvalidKeySpecException ex) {
            Logger.getLogger(NormalUserFacadeREST.class.getName()).log(Level.SEVERE, null, ex);
        }
        super.create(user);      
        em.flush();
        return Response.ok(user).build();
    }
    
    @POST
    @Path("getInfo")
    @Produces(MediaType.APPLICATION_JSON)
    public VicePresidentUser getInfo(@QueryParam("email") String email) {
        Query queryByEmail = em.createNamedQuery("VicePresidentUser.findByEmail");
        queryByEmail.setParameter("email", email);
        VicePresidentUser user = (VicePresidentUser) queryByEmail.getSingleResult();
        return user;
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, VicePresidentUser entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public VicePresidentUser find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<VicePresidentUser> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<VicePresidentUser> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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

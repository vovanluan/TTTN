/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entity.Comment;
import entity.NormalUser;
import entity.Request;
import entity.User;
import java.util.ArrayList;
import java.util.List;
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
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.annotation.XmlTransient;
import support.Status;

/**
 *
 * @author Luan
 */
@Stateless
@Path("entity.request")
public class RequestFacadeREST extends AbstractFacade<Request> {

    @PersistenceContext(unitName = "open311")
    private EntityManager em;

    public RequestFacadeREST() {
        super(Request.class);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createRequest(Request entity) {
        entity.setStatusId(Status.values()[0]);
        super.create(entity);
        User user = em.find(User.class, entity.getUser().getId());
        user.addRequest(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void edit(@PathParam("id") Integer id, Request entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

//    @GET
//    @Path("{id}")
//    @XmlTransient
//    @Produces(MediaType.APPLICATION_JSON)
//    public Request find(@PathParam("id") Integer id) {
//        return super.find(id);
//    }
    
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response find(@PathParam("id") Integer id) {
        Query queryEmail = em.createQuery("SELECT r FROM Request r WHERE r.serviceRequestId=:id");
        queryEmail.setParameter("id", id);
        Request result = (Request) queryEmail.getSingleResult();
        return Response.ok(result).build();
    }
    
    @GET
    @Override
    @XmlTransient
    @Produces(MediaType.APPLICATION_JSON)
    public List<Request> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Request> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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

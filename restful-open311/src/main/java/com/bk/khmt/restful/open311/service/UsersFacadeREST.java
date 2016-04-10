/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.bk.khmt.restful.open311.service;

import com.bk.khmt.restful.open311.Users;
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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Luan
 */
@Stateless
@Path("com.bk.khmt.restful.open311.users")
public class UsersFacadeREST extends AbstractFacade<Users> {

    @PersistenceContext(unitName = "com.bk.khmt_restful-open311_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    public UsersFacadeREST() {
        super(Users.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(Users entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Users entity) {
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
    public Users find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Users> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Users> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(super.count());
    }

    @GET
    @Path("/checkLogin")
    @Produces({MediaType.APPLICATION_JSON,MediaType.TEXT_PLAIN})
    public Users checkLogin(@QueryParam("email") String email,@QueryParam("password") String password){
        Query query = em.createQuery("Select u FROM Users u WHERE u.userEmail = :email and u.passWord = :password");
        query.setParameter("email", email);
        query.setParameter("password", password);
        List<Users> users = query.getResultList();
        if(!users.isEmpty()){
            System.out.print(users.get(0).getUserEmail());
            return users.get(0);
        }
        else return null;
    }
    
    @GET
    @Path("/getUserByEmail")
    @Produces(MediaType.APPLICATION_JSON)
    public Users getUserByEmail(@QueryParam("email") String email){
        Query query = em.createQuery("Select u FROM Users u WHERE u.userEmail = :email");
        query.setParameter("email", email);
        List<Users> users = query.getResultList();
        if(!users.isEmpty()){
            return users.get(0);
        }
        else return null;
        
    }
    
    @GET
    @Path("/getUserById")
    @Produces(MediaType.APPLICATION_JSON)
    public Users getUserById(@QueryParam("email") Integer id){
        Query query = em.createQuery("Select u FROM Users u WHERE u.userId = :id");
        query.setParameter("id", id);
        List<Users> users = query.getResultList();
        if(!users.isEmpty()){
            return users.get(0);
        }
        else return null;
    }
    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}

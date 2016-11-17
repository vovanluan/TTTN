package service;

import entity.Division;
import entity.Request;
import entity.User;
import entity.VicePresidentUser;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
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
import support.Status;

/**
 *
 * @author Admin
 */
@Path("entity.request")
@Stateless
public class RequestFacadeREST extends AbstractFacade<Request> {

    @PersistenceContext(unitName = "open311")
    private EntityManager em;

    public RequestFacadeREST() {
        super(Request.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(Request entity) {
        System.out.println("=============Vo create====================");
        System.out.println("------User = " + entity.getAddress() + entity.getUser().getId());
        User user = em.find(User.class, entity.getUser().getId());
        System.out.println("------User = " + user.getUserType());
        entity.setStatusId(Status.DA_TIEP_NHAN);
        super.create(entity);
        
        user.addRequest(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Request entity) {
        super.edit(entity);
    }
    
    @PUT
    @Path("/edit-status/{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void editStatusId(@PathParam("id") Integer id, Request entity) {
        super.edit(entity);
        int statusId = entity.getStatusId().getValue();
        if(statusId == 1) {
            Division division = em.find(Division.class, entity.getDivision().getId());
            division.addReceivedRequest(entity);
            return;
        }
        if(statusId == 2) {
            Division division = em.find(Division.class, entity.getDivision().getId());
            division.removeReceivedRequest(entity);
//            VicePresidentUser vicePresident = em.find(VicePresidentUser.class, entity.getVicePresident().getId());
//            vicePresident.addReceivedRequest(entity);
            return;
        }
//        if(statusId == 3) {
//            VicePresidentUser vicePresident = em.find(VicePresidentUser.class, entity.getVicePresident().getId());
//            vicePresident.removeReceivedRequest(entity);
//        }
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }
    
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response find(@PathParam("id") Integer id) {
        Request result = em.find(Request.class, id);
        return Response.ok(result).build();
    }

    @GET
    @Override
    @Produces(MediaType.APPLICATION_JSON)
    public List<Request> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
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

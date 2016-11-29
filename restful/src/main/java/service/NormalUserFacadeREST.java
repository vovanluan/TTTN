package service;

import dto.Password;
import entity.NormalUser;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.security.PermitAll;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
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
import static support.General.EXPIRE_TIME;

/**
 *
 * @author Luan
 */
@Path("entity.normaluser")
@Transactional
@PermitAll
public class NormalUserFacadeREST extends AbstractFacade<NormalUser> {

    @PersistenceContext(unitName = "open311")
    private EntityManager em;

    public NormalUserFacadeREST() {
        super(NormalUser.class);
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public NormalUser find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces(MediaType.APPLICATION_JSON)
    public List<NormalUser> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<NormalUser> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(super.count());
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response signUp(NormalUser user) throws Exception {
        // Check email already exist
        Query queryByEmail = em.createNamedQuery("NormalUser.findByEmail");
        queryByEmail.setParameter("email", user.getEmail());
        List<NormalUser> emailResult = queryByEmail.getResultList();
        if (!emailResult.isEmpty()) {
            return Response.status(Response.Status.CONFLICT).type("text/plain").entity("email").build();
        }

        // Check identifyCard already exist
        Query queryByIndentifyCard = em.createNamedQuery("NormalUser.findByIdentifyCard");
        queryByIndentifyCard.setParameter("identifyCard", user.getIdentifyCard());
        List<NormalUser> idResult = queryByIndentifyCard.getResultList();
        if (!idResult.isEmpty()) {
            return Response.status(Response.Status.CONFLICT).type("text/plain").entity("id").build();
        }

        // Hash password
        try {
            user.setPassWord(General.hashPassword(user.getPassWord()));
        } catch (NoSuchAlgorithmException | InvalidKeySpecException ex) {
            Logger.getLogger(NormalUserFacadeREST.class.getName()).log(Level.SEVERE, null, ex);
        }

        // Generate new token
        String token = JWT.createJWT(user.getEmail(), EXPIRE_TIME, "normal_user");
        user.setToken(token);
        super.create(user);
        em.flush();
        return Response.ok(user).build();
    }

    @POST
    @Path("getInfo")
    @Produces(MediaType.APPLICATION_JSON)
    public NormalUser getInfo(@QueryParam("email") String email) {
        Query queryByEmail = em.createNamedQuery("NormalUser.findByEmail");
        queryByEmail.setParameter("email", email);
        NormalUser user = (NormalUser) queryByEmail.getSingleResult();
        return user;
    }

    @POST
    @Path("changePassword/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response changePassword(@PathParam("id") Integer id, Password passwordObj) throws Exception {
        NormalUser user = em.find(NormalUser.class, id);
        String oldPasswordHash = General.hashPassword(passwordObj.getOldPassword());
        if (!user.getPassWord().equals(oldPasswordHash)) {
            return Response.status(Response.Status.UNAUTHORIZED).type("text/plain").build();
        }

        user.setPassWord(General.hashPassword(passwordObj.getNewPassword()));
        super.edit(user);
        return Response.ok().build();
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void edit(@PathParam("id") Integer id, NormalUser entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
}

package service;

import dto.UserRole;
import entity.User;
import io.jsonwebtoken.Claims;
import java.io.IOException;
import java.security.Principal;
import java.util.Date;
import javax.annotation.Priority;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;

/**
 *
 * @author TranVanTai
 */
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {
    @PersistenceContext(unitName = "open311")
    private EntityManagerFactory emf = Persistence.createEntityManagerFactory("open311");

    @Override
    public void filter(final ContainerRequestContext requestContext) throws IOException {
        String method = requestContext.getMethod();
        String path = requestContext.getUriInfo().getPath(true);
        System.out.println("============Path========== " + path + " ===== " + method);
        
        if(path.equals("/authentication/user") || path.equals("/entity.request") ||
                path.equals("/entity.comment") || path.equals("/entity.normaluser") ||
                path.equals("/entity.annoucement") || path.equals("/entity.division")){
            return;
        }
        //Get HTTP header from the request
        String authourizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        
        if (authourizationHeader == null || !authourizationHeader.startsWith("Bearer")) {
            throw new NotAuthorizedException("Authorize header must be provided");
        }

        //Extract the token 
        String token = authourizationHeader.substring("Bearer".length()).trim();
        System.out.println("Bearer: " + token);
        Claims claims = JWT.parseJWT(token);
        Date expirationDate = claims.getExpiration();
        final String role = (String) claims.get("rol");

        if(!isValidToken(token, expirationDate, role)) {
            System.out.println("GET METHOD: " +  requestContext.getMethod());
            requestContext.abortWith(
                    Response.status(Response.Status.UNAUTHORIZED).build());
        }
        
        System.out.println("===========PASS AUTHENTICATION===========");
        requestContext.setSecurityContext(new SecurityContext() {
            @Override
            public Principal getUserPrincipal() {
                return new UserRole(role);
            }

            @Override
            public boolean isUserInRole(String acceptedRole) {
                return role.equals(acceptedRole);
            }

            @Override
            public boolean isSecure() {
                return false;
            }

            @Override
            public String getAuthenticationScheme() {
                return "custom";
            } 
        });
    }

    private boolean isValidToken(String token, Date expirationDate, String role){
        //Check if token exists in database 
        try {
            EntityManager em = emf.createEntityManager();
            Query q = em.createNamedQuery("User.findByToken");
            q.setParameter("token", token);
            User user = (User) q.getSingleResult();
        } catch(NoResultException e) {
            System.out.println("Token does not exist");
            return false;
        } 
        
        //Check if token expired
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        if (now.after(expirationDate)) {
            System.out.println("Token is expired");
            return false;
        }        
        
        return true;
    }
}

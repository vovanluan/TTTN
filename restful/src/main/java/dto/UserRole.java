package dto;

import java.security.Principal;

/**
 *
 * @author Tran Van Tai
 */
public class UserRole implements Principal {

    private final String role;
    
    public String getRole() {
        return role;
    }
    
    public UserRole(String role) {
        this.role = role;
    }
    
    @Override
    public String getName() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
    
}

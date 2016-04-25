/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import io.jsonwebtoken.*;
import io.jsonwebtoken.impl.crypto.MacProvider;
import java.util.Date;

/**
 *
 * @author TranVanTai
 */
public class JWT {
    Key key = MacProvider.generateKey();
    
    String createJWT(String id, long ttlMillis, String role) {
        System.out.println("vo create nhen " + id);
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        JwtBuilder builder = Jwts.builder().claim("role",role)
                                .setId(id)
                                .setIssuedAt(now)
                                .signWith(SignatureAlgorithm.HS512, key);
        
        

        //if it has been specified, let's add the expiration
        if (ttlMillis >= 0) {
            long expMillis = nowMillis + ttlMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }
        return builder.compact();
    }
    
    private void parseJWT(String jwt) {
        //This line will throw an exception if it is not a signed JWS (as expected)
        Claims claims;
        claims = Jwts.parser()         
                .setSigningKey(DatatypeConverter.parseBase64Binary(key.toString()))
                .parseClaimsJws(jwt).getBody();
        System.out.println("ID: " + claims.getId());
        System.out.println("Expiration: " + claims.getExpiration());
    }
}



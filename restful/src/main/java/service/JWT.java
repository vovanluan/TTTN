/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import java.security.Key;
import io.jsonwebtoken.*;
import io.jsonwebtoken.impl.crypto.MacProvider;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Date;
import java.util.Random;

/**
 *
 * @author TranVanTai
 */
public class JWT {
    static Key key = MacProvider.generateKey();
   
    String createJWT(String email, long ttlMillis, String role) {
        long nowMillis = System.currentTimeMillis();
        long expMillis = nowMillis + ttlMillis;
        Date now = new Date(nowMillis);
        Date exp = new Date(expMillis);

        Random random = new SecureRandom();
        String tokenId = new BigInteger(20, random).toString(8);
        
        JwtBuilder builder = Jwts.builder()
                                .setId(tokenId)
                                .setSubject(email)
                                .claim("rol", role)
                                .setIssuedAt(now)
                                .setExpiration(exp)
                                .signWith(SignatureAlgorithm.HS256, key);
        
        return builder.compact();
    }
    
    Claims parseJWT(String jwt) {
        //This line will throw an exception if it is not a signed JWS (as expected)
        Claims claims;
        claims = Jwts.parser()         
                .setSigningKey(key)
                .parseClaimsJws(jwt).getBody();
        return claims;
    }
}



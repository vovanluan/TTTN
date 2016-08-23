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
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

/**
 *
 * @author TranVanTai
 */
public class JWT {
    private static final String apiKey = "LongAndHardToGuessValueWithSpecialCharacters@^($%*$%";

    public static String createJWT(String email, long ttlMillis, String role) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(apiKey);        
        Key key = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());      
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
                                .signWith(signatureAlgorithm, key);
        
        return builder.compact();
    }
    
    public static Claims parseJWT(String jwt) {
        //This line will throw an exception if it is not a signed JWS (as expected)
        Claims claims;
        claims = Jwts.parser()         
                .setSigningKey(DatatypeConverter.parseBase64Binary(apiKey))
                .parseClaimsJws(jwt).getBody();
        return claims;
    }
}



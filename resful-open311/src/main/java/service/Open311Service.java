/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import database.ConnectToSQL;
import entity.Request;
import java.io.IOException;
import java.sql.SQLException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author Luan
 */
@Path("request")
public class Open311Service {
    public static final String TYPE = "mysql";
    public static final String HOST = "localhost:3306";
    public static final String DBNAME = "test";
    public static final String USERNAME = "root";
    public static final String PASSWORD = "root";
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRequest(@PathParam("id") String id)throws IOException, SQLException, ClassNotFoundException{
        ConnectToSQL conn = new ConnectToSQL(TYPE, HOST, DBNAME, USERNAME, PASSWORD);
        Request req = conn.getRequest(id);
        return Response.status(Response.Status.OK).entity(req).build();
    }
    
    @POST
    @Path("/add")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addName(Request req) throws ClassNotFoundException, SQLException {
        ConnectToSQL conn = new ConnectToSQL(TYPE, HOST, DBNAME, USERNAME, PASSWORD);
        boolean result = conn.addRequest(req);
        if (result) {
            return Response.status(200).entity("Success").build();
        }        
        return Response.status(Response.Status.CREATED).entity("Failed").build();
    }
    
}

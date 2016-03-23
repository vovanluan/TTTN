package database;

import entity.Request;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.StringJoiner;

/**
 *
 * @author Luan
 */
public class ConnectToSQL {

    public static final String ERROR = "Error";
    public static final String NOTMATCH = "NotMatch";
    public static final String SQLSERVER = "sqlserver";
    public static final String SQLSERVERDRIVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    public static final String MYSQL = "mysql";
    public static final String MYSQLDRIVER = "com.mysql.jdbc.Driver";
    public static final String POSTGRESQL = "postgresql";
    public static final String POSTGRESQLDRIVER = "org.postgresql.Driver";

    Connection dbConnection = null;

    public ConnectToSQL(String type, String host, String dbname, String user, String pwd) throws ClassNotFoundException, SQLException {
        Class.forName(MYSQLDRIVER);
        this.dbConnection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "root");
                //getDBConnection(type, host, dbname, user, pwd);
    }

    private Connection getDBConnection(String type, String host, String dbname, String user, String pwd) {
        if (type != null && !type.isEmpty()) {
            try {
                if (type.equalsIgnoreCase(SQLSERVER)) {
                    Class.forName(SQLSERVERDRIVER);
                    dbConnection = DriverManager.getConnection(host + ";database=" + dbname + ";sendStringParametersAsUnicode=true;useUnicode=true;characterEncoding=UTF-8;", user, pwd);
                } else if (type.equalsIgnoreCase(MYSQL)) {
                    Class.forName(MYSQLDRIVER); 
                    dbConnection = DriverManager.getConnection("jdbc:mysql://" + host + "/" + dbname, user, pwd);
                } else if (type.equalsIgnoreCase(POSTGRESQL)) {
                    Class.forName(POSTGRESQLDRIVER);
                    dbConnection = DriverManager.getConnection("jdbc:postgresql://" + host + "/" + dbname + "?ssl=true&sslmode=require&sslfactory=org.postgresql.ssl.NonValidatingFactory", user, pwd);
                }
                return dbConnection;
            } catch (ClassNotFoundException | SQLException ex) {
                System.err.println(ex.getMessage());
            }
        }
        return dbConnection;
    }
    
    public Request getRequest(String id) {
        try {
            String SQL = "SELECT * FROM  test.requests WHERE test.requests.service_request_id = " + id + ";";
            if (this.dbConnection == null) {
                System.out.println("abcdef");
            }
            Statement stmt = this.dbConnection.createStatement();
            ResultSet rs = stmt.executeQuery(SQL);

            // Iterate through the data in the result set and display it.  
            if (rs.next()) {
                Request req = new Request();
                
                req.setRequestID(rs.getString("service_request_id"));
                req.setServiceCode(rs.getString("service_code"));
                req.setServiceName(rs.getString("service_name"));
                req.setDescription(rs.getString("description"));
                req.setMetadata(rs.getBoolean("metadata"));
                req.setLatitude(rs.getFloat("latitude"));
                req.setLongitude(rs.getFloat("longitude"));
                req.setAddress(rs.getString("address"));
                req.setAddressID(rs.getInt("address_id"));
                req.setRequestedTime(rs.getTimestamp("requested_datetime"));
                req.setUpdatedTime(rs.getTimestamp("updated_datetime"));
                req.setExpectedTime(rs.getTimestamp("expected_datetime"));
                req.setZipcode(rs.getString("zipcode"));
                req.setStatusID(rs.getInt("status_id"));
                req.setMediaURL(rs.getString("media_url"));
                req.setKeywords(rs.getString("keywords"));
                req.setGroupName(rs.getString("group_name"));
                
                return req;
            }
            else {
                return new Request();
            }
        } catch (SQLException sqle) {
            System.err.println(sqle.getMessage());
        } finally {
            if (this.dbConnection != null) {
                try {
                    this.dbConnection.close();
                } catch (SQLException sqle) {
                    System.err.println(sqle.getMessage());
                }
            }
        }
        return null;
    }
    
    public boolean addRequest(Request request) {
        try {        
            this.dbConnection.setAutoCommit(false);
            Statement stmt = this.dbConnection.createStatement();
            StringJoiner joiner = new StringJoiner(",");
            
            joiner.add(request.getServiceCode());
            joiner.add(request.getServiceName());
            joiner.add(request.getDescription());
            joiner.add(Boolean.toString(request.getMetadata()));
            joiner.add(Float.toString(request.getLatitude()));
            joiner.add(Float.toString(request.getLongitude()));
            joiner.add(request.getAddress());
            joiner.add(Integer.toString(request.getAddressID()));
            joiner.add(new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(request.getRequestedTime()));
            joiner.add(new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(request.getUpdatedTime()));
            joiner.add(new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(request.getExpectedTime()));
            joiner.add(request.getZipcode());
            joiner.add(Integer.toString(request.getStatusID()));
            joiner.add(request.getMediaURL());
            joiner.add(request.getKeywords());
            joiner.add(request.getGroupName());
            
            String values = joiner.toString();
                    
            String SQL = "INSERT INTO test.requests(service_code, service_name, description, metadata, latitude, longitude, address, address_id,"
                    + "requested_datetime, updated_datetime, expected_datetime, zipcode, status_id, media_url, keywords, group_name)\n" 
                    + " VALUES (" + values +  ");";

            stmt.executeUpdate(SQL);
            stmt.close();
            this.dbConnection.commit();
        } catch (SQLException sqle) {
            System.err.println(sqle.getMessage());
        } finally {
            if (this.dbConnection != null) {
                try {
                    this.dbConnection.close();
                } catch (SQLException sqle) {
                    System.err.println(sqle.getMessage());
                }
            }
        }
        return true;
    }
    
}

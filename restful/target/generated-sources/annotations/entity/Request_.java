package entity;

import entity.Comment;
import entity.User;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2016-04-22T18:42:24")
@StaticMetamodel(Request.class)
public class Request_ { 

    public static volatile SingularAttribute<Request, Boolean> metadata;
    public static volatile SingularAttribute<Request, Integer> serviceRequestId;
    public static volatile SingularAttribute<Request, String> address;
    public static volatile ListAttribute<Request, Comment> comments;
    public static volatile SingularAttribute<Request, String> mediaUrl;
    public static volatile SingularAttribute<Request, String> keywords;
    public static volatile SingularAttribute<Request, Integer> serviceCode;
    public static volatile SingularAttribute<Request, Float> latitude;
    public static volatile SingularAttribute<Request, Date> requestedDatetime;
    public static volatile SingularAttribute<Request, String> description;
    public static volatile SingularAttribute<Request, String> serviceName;
    public static volatile SingularAttribute<Request, Integer> addressId;
    public static volatile SingularAttribute<Request, String> zipcode;
    public static volatile SingularAttribute<Request, String> groupName;
    public static volatile SingularAttribute<Request, Integer> statusId;
    public static volatile SingularAttribute<Request, Date> happenDatetime;
    public static volatile SingularAttribute<Request, User> user;
    public static volatile SingularAttribute<Request, Date> updatedDatetime;
    public static volatile SingularAttribute<Request, Date> expectedDatetime;
    public static volatile SingularAttribute<Request, Float> longitude;

}
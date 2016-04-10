package com.bk.khmt.restful.open311;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2016-04-10T13:04:22")
@StaticMetamodel(Requests.class)
public class Requests_ { 

    public static volatile SingularAttribute<Requests, Boolean> metadata;
    public static volatile SingularAttribute<Requests, Integer> serviceRequestId;
    public static volatile SingularAttribute<Requests, String> address;
    public static volatile SingularAttribute<Requests, String> mediaUrl;
    public static volatile SingularAttribute<Requests, String> keywords;
    public static volatile SingularAttribute<Requests, Integer> serviceCode;
    public static volatile SingularAttribute<Requests, Float> latitude;
    public static volatile SingularAttribute<Requests, Date> requestedDatetime;
    public static volatile SingularAttribute<Requests, String> description;
    public static volatile SingularAttribute<Requests, String> serviceName;
    public static volatile SingularAttribute<Requests, Integer> addressId;
    public static volatile SingularAttribute<Requests, String> zipcode;
    public static volatile SingularAttribute<Requests, String> groupName;
    public static volatile SingularAttribute<Requests, Integer> statusId;
    public static volatile SingularAttribute<Requests, Date> happenDatetime;
    public static volatile SingularAttribute<Requests, Date> updatedDatetime;
    public static volatile SingularAttribute<Requests, Date> expectedDatetime;
    public static volatile SingularAttribute<Requests, Float> longitude;

}
package com.bk.khmt.restful.open311;

import com.bk.khmt.restful.open311.Roles;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2016-04-10T13:04:22")
@StaticMetamodel(Users.class)
public class Users_ { 

    public static volatile SingularAttribute<Users, String> passWord;
    public static volatile SingularAttribute<Users, Roles> roleId;
    public static volatile SingularAttribute<Users, String> userPhone;
    public static volatile SingularAttribute<Users, String> userEmail;
    public static volatile SingularAttribute<Users, String> userName;
    public static volatile SingularAttribute<Users, Integer> userId;

}
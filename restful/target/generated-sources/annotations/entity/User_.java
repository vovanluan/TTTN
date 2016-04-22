package entity;

import entity.Comment;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2016-04-22T18:42:24")
@StaticMetamodel(User.class)
public class User_ { 

    public static volatile CollectionAttribute<User, Comment> commentCollection;
    public static volatile SingularAttribute<User, String> name;
    public static volatile SingularAttribute<User, Integer> Id;
    public static volatile SingularAttribute<User, String> email;

}
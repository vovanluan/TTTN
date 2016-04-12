/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package support;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author Luan
 */
public class General {
    public enum Status {
        DA_GUI(0),
        DA_TIEP_NHAN(1),
        DANG_XEM_XET(2),
        DA_XU_LY(3),
        DA_XOA(4);
        
        // ENUM -> DB conversion
        private final Integer dbValue;
        
        private Status(Integer dbValue) {
            this.dbValue = dbValue;
        }
        
        public Integer getDbValue() {
            return dbValue;
        }

        // DB VALUE -> ENUM CONVERSION
        // static reverse resolving:
        public static final Map<Integer, Status> dbValues = new HashMap<>();

        static {
            for (Status value : values()) {
                dbValues.put(value.dbValue, value);
            }
        }

        public static Status fromDbValue(Integer dbValue) {
            // this returns null for invalid value, check for null and throw exception if need
            return dbValues.get(dbValue);
        }
    }
    
    public enum Role {
        ADMIN(0),
        USER(1),
        GUEST(2);
        // ENUM -> DB conversion
        private final Integer dbValue;
        
        private Role(Integer dbValue) {
            this.dbValue = dbValue;
        }

        public Integer getDbValue() {
            return dbValue;
        }

        // DB VALUE -> ENUM CONVERSION
        // static reverse resolving:
        public static final Map<Integer, Role> dbValues = new HashMap<>();

        static {
            for (Role value : values()) {
                dbValues.put(value.dbValue, value);
            }
        }

        public static Role fromDbValue(Integer dbValue) {
            // this returns null for invalid value, check for null and throw exception if need
            return dbValues.get(dbValue);
        }        
    }
}

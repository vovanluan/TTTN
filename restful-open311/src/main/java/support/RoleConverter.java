/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package support;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

/**
 *
 * @author Luan
 */

@Converter
public class RoleConverter implements AttributeConverter<General.Role, Integer> {
    @Override
    public Integer convertToDatabaseColumn(General.Role someEntityType) {
        return someEntityType.getDbValue();
    }

    @Override
    public General.Role convertToEntityAttribute(Integer dbValue) {
        // this can still return null unless it throws IllegalArgumentException
        // which would be in line with enums static valueOf method
        return General.Role.fromDbValue(dbValue);
    }
} 

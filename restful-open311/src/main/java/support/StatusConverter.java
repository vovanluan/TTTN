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
public class StatusConverter implements AttributeConverter<General.Status, Integer> {
    @Override
    public Integer convertToDatabaseColumn(General.Status someEntityType) {
        return someEntityType.getDbValue();
    }

    @Override
    public General.Status convertToEntityAttribute(Integer dbValue) {
        // this can still return null unless it throws IllegalArgumentException
        // which would be in line with enums static valueOf method
        return General.Status.fromDbValue(dbValue);
    }
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package support;

/**
 *
 * @author Luan
 */
public enum Status {
    DA_TIEP_NHAN(0),
    DA_CHUYEN(1),
    DA_GIAI_QUYET(2),
    DA_TRA_LOI(3),
    DA_XOA(4);
    private final int value;

    private Status(int value) {
      this.value = value;
    }

    public int getValue() {
      return value;
    }    
}

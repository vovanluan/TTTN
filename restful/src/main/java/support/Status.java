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
    DA_GUI(0),
    DA_TIEP_NHAN(1),
    DANG_XEM_XET(2),
    DA_XU_LY(3),
    DA_XOA(4);
    private final int value;

    private Status(int value) {
      this.value = value;
    }

    public int getValue() {
      return value;
    }    
}

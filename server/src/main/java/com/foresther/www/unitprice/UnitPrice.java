package com.foresther.www.unitprice;

import com.foresther.www.seriallot.SerialLot;
import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("UnitPrice")
public class UnitPrice {
    private String unit_price_code; //단가코드 PK
    private String serial_lot_code; //시리얼로트코드 = 시리얼로트 FK
    private String item_name; //품목명
    private int standard_cost; //표준원가
    private int purchase_price; //구매단가
    private int selling_price; //판매단가

    private SerialLot serialLot;
}

package com.foresther.www.bom;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("Bom")
public class Bom {
    private String bom_code; //BOM코드
    private String product_name; //제품명 (-> ItemVO 객체에서 받아올 예정)
}

package com.foresther.www.bom;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.util.List;

@Data
//@Alias("BomVO")
public class BomVO {
    private String bom_code; //BOM코드
    private String product_name; //제품명 (-> ItemVO 객체에서 받아올 예정)

    private List<BomRegistrationVO> bom_register_vo;
}

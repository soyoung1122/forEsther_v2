package com.foresther.www.item;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
//@Alias("SupplierVO")
public class SupplierVO {
    private String supplier_code; //구매처코드 PK
    private String supplier_name; //회사명
    private String contact_person; //담당자
    private String contact_number; //연착처
    private String address; //주소
}

package com.foresther.www.item;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("SubCategoryVO")
public class SubCategoryVO {
    private int sub_category_code; // 서브 카테고리 코드
    private  String sub_category_name; // 서브 카테고리명
    private int main_category_code; // 메인 카테고리 코드

    private MainCategoryVO mainCategory_vo; // 대분류
}

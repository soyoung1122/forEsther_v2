package com.foresther.www.item;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("MainCategoryVO")
public class MainCategoryVO {
    private int main_category_code; // 메인 카테고리 코드
    private String main_category_name; // 메인 카테고리명
}





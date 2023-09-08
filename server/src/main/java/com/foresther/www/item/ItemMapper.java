package com.foresther.www.item;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ItemMapper {
    //품목 전체 조회
    public List<ItemVO> selectItems();

    //품목 상세 조회
    public ItemVO selectItemById(String copyId);

    //품목 검색
    public List<ItemVO> selectItemBySearch(Map<String, Object> searchCriteria);
    
    //품목 소분류 코드 조회
    public int selectSubCategory(String value);
    
    //품목 등록
    public int insertItem(ItemVO item);

    //품목구매처 등록
    public int insertItemSupplier(ItemVO item);
    
    //품목 대분류 카테고리 조회
    public List<MainCategoryVO> selectMainCategories();
    
    //품목 소분류 카테고리 조회
    public List<SubCategoryVO> selectSubCategories();

    //구매처 조회
    public SupplierVO selectSupplier(String searchValue);
}

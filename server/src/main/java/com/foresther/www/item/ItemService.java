package com.foresther.www.item;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface ItemService {
    public List<ItemVO> findItems();

    public int findSubCategory(String value);

    public int addItem(ItemVO item);

    public List<ItemVO> findItemBySearch(Map<String, Object> searchCriteria);

    public List<MainCategoryVO> findMainCategories();

    public List<SubCategoryVO> findSubCategories();

    public SupplierVO findSupplierBySearch(String searchValue);

}

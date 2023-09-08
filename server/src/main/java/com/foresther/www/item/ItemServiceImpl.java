package com.foresther.www.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Service
public class ItemServiceImpl implements ItemService{
    @Autowired
    private ItemMapper mapper;

    @Override
    public List<ItemVO> findItems() {
        return mapper.selectItems();
    }

    @Override
    public ItemVO findItembyId(String copyId) {
        return mapper.selectItemById(copyId);
    }

    @Override
    public int findSubCategory(String value) {
        return mapper.selectSubCategory(value);
    }

    @Transactional(rollbackFor = {SQLException.class})
    @Override
    public int addItem(ItemVO item) {
        try {
            mapper.insertItem(item);
            mapper.insertItemSupplier(item);
        } catch(Exception e) {
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return 0;
        }
        return 1;
    }

    @Override
    public List<ItemVO> findItemBySearch(Map<String, Object> searchCriteria) {
        return mapper.selectItemBySearch(searchCriteria);
    }

    @Override
    public List<MainCategoryVO> findMainCategories() {
        return mapper.selectMainCategories();
    }

    @Override
    public List<SubCategoryVO> findSubCategories() {
        return mapper.selectSubCategories();
    }

    @Override
    public SupplierVO findSupplierBySearch(String searchValue) {
        return mapper.selectSupplier(searchValue);
    }
}

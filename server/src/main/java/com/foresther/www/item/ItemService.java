package com.foresther.www.item;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface ItemService {
    public List<ItemVO> findItems();

    public List<ItemVO> findItemBySearch(Map<String, Object> searchCriteria);
}
package com.foresther.www.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService{
    @Autowired
    private ItemMapper mapper;
    @Override
    public List<ItemVO> findItems() {
        return mapper.selectItems();
    }
}

package com.foresther.www.item;

import org.springframework.stereotype.Service;

import java.util.List;

public interface ItemService {
    public List<ItemVO> findItems();
}

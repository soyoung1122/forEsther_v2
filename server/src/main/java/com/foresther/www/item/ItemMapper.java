package com.foresther.www.item;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ItemMapper {
    public List<ItemVO> selectItems();

    public List<ItemVO> selectItemBySearch(Map<String, Object> searchCriteria);
}

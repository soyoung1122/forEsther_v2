package com.foresther.www.item;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ItemMapper {
    public List<ItemVO> selectItems();
}

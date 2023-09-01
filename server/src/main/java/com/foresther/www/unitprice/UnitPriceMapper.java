package com.foresther.www.unitprice;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UnitPriceMapper {
    public List<UnitPrice> getList();
    //public List<UnitPrice> getList(Criteria cri);
    public UnitPrice read(String unit_price_code);
    public String getThumbnail(String unit_price_code);
    public List<Map<Integer, Integer>> getChart(String item_code);
    //public int getTotalCount(Criteria cri);
    public int getTotalCount();
    public int update(UnitPrice vo);
    public int insert(UnitPrice vo);
    public int insertFile(QuotationFile file);
    public List<Map<String, Object>>autocomplete(Map<String, Object> paramMap);
}

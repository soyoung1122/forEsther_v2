package com.foresther.www.unitprice;

import java.util.List;
import java.util.Map;

public interface UnitPriceService {
    public int register(UnitPrice vo);
    public int registerWithFile(UnitPrice vo, QuotationFile file);
    public String getThumbnail(String unit_price_code);
    public List<Map<Integer, Integer>> getChart(String item_code);
    public int modify(UnitPrice vo);
    public UnitPrice get(String unit_price_code);
    public List<UnitPrice> getList();
    //public List<UnitPrice> getList(Criteria cri);
    public int getTotalCount();
    //public int getTotalCount(Criteria cri);
    public List<Map<String, Object>>autocomplete(Map<String, Object> paramMap);
}

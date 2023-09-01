package com.foresther.www.unitprice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UnitPriceServiceImpl implements UnitPriceService{
    @Autowired
    private UnitPriceMapper mapper;

    @Override
    public int register(UnitPrice vo) {
        return mapper.insert(vo);
    }

    //@Transactional(rollbackFor = {SQLException.class})
    @Override
    public int registerWithFile(UnitPrice unitPrice, QuotationFile file) {
        try {
            mapper.insert(unitPrice);
            mapper.insertFile(file);

        } catch (Exception e) {
            e.printStackTrace();
            //TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return 0;
        }

        return 1;
    }

    @Override
    public String getThumbnail(String unit_price_code) {

        String result = "";

        try {
            result = mapper.getThumbnail(unit_price_code);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return result;
    }

    @Override
    public List<Map<Integer, Integer>> getChart(String item_code) {
        return mapper.getChart(item_code);
    }


    @Override
    public int modify(UnitPrice vo) {
        return mapper.update(vo);
    }

    @Override
    public UnitPrice get(String unit_price_code) {
        return mapper.read(unit_price_code);
    }

    @Override
    public List<UnitPrice> getList() {
        return mapper.getList();
    }

    @Override
    public int getTotalCount() {
        return mapper.getTotalCount();
    }

    @Override
    public List<Map<String, Object>> autocomplete(Map<String, Object> paramMap) {
        return mapper.autocomplete(paramMap);
    }
}

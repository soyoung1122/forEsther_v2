package com.foresther.www.item;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/items")
@AllArgsConstructor
@Log4j2
public class ItemController {
    @Autowired
    private ItemService service;
    @GetMapping("")
    public List<ItemVO> itemList() {
        return service.findItems();
    }
    @PostMapping("/register")
    public ResponseEntity<String> itemAdd(@RequestBody List<Map<String, Object>> items) {
        int result = 0;
        if (items != null && !items.isEmpty()) {
            for (Map<String, Object> item : items) {
                log.info(item);
                String subCategoryName = (String) item.get("sub_category_name");
                // 소분류 코드 찾은 후 item 데이터에 삽입
                int subCategoryCode = service.findSubCategory(subCategoryName);
                String supplierCode = service.findSupplierBySearch((String) item.get("supplier_name"))
                        .getSupplier_code();
                if (subCategoryCode != 0) { // 예외 처리: 0은 유효한 subCategoryCode가 아님
                    // item 데이터 타입 변환 (Map -> ItemVO)
                    ItemVO itemVO = new ItemVO();
                    itemVO.setItem_name((String) item.get("item_name"));
                    itemVO.setItem_classification((String) item.get("item_classification"));
                    itemVO.setSub_category_code(subCategoryCode); // 찾은 subCategoryCode 설정
                    itemVO.setItem_specification((String) item.get("item_specification"));
                    itemVO.setSafety_stock(Integer.parseInt(item.get("safety_stock").toString()));
                    itemVO.setProcurement((String) item.get("procurement"));
                    itemVO.setSupplier_code(supplierCode);
                    // item 데이터 DB 추가
                    result = service.addItem(itemVO);
                } else {
                    // 유효한 subCategoryCode를 찾지 못한 경우 처리
                   return new ResponseEntity<String>("Invalid subCategoryName: " + subCategoryName, HttpStatus.BAD_REQUEST);
                }
            }
        }
        return result == 1 ? new ResponseEntity<String>("success", HttpStatus.OK)
                : new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/register/{copyId}")
    public ItemVO itemDetail(@PathVariable("copyId") String copyId) {
        return service.findItembyId(copyId);
    }

    @PostMapping("/search")
    public List<ItemVO> itemListBySearch(@RequestBody Map<String, Object> searchCriteria) {
        return service.findItemBySearch(searchCriteria);
    }
    @GetMapping("/category")
    public Map<String, Object> categoryList() {
        Map<String, Object> map = new HashMap<>();
        map.put("mainCategory", service.findMainCategories());
        map.put("subCategory", service.findSubCategories());
        return map;
    }
    @GetMapping("/supplier")
    public ResponseEntity<SupplierVO> supplierDetails(@RequestParam("searchValue") String searchValue){
      return new ResponseEntity<>(service.findSupplierBySearch(searchValue), HttpStatus.OK);
    }
}
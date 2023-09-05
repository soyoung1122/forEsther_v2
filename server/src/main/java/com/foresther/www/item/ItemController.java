package com.foresther.www.item;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
    @PostMapping("/search")
    public List<ItemVO> itemListBySearch(@RequestBody Map<String, Object> searchCriteria) {
        return service.findItemBySearch(searchCriteria);
    }
}

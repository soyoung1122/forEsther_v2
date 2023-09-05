package com.foresther.www.item;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/items")
@AllArgsConstructor
@Log4j2
public class ItemController {
    @Autowired
    private ItemService service;
    @GetMapping("")
    public List<ItemVO> itemList() {
        log.info(service.findItems());
        return service.findItems();
    }
}

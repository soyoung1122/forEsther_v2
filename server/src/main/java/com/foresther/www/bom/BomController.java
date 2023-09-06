package com.foresther.www.bom;

import com.foresther.www.item.ItemVO;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Log4j2
@RequestMapping("/boms/*")
@AllArgsConstructor
public class BomController {
    private BomService service;

    @GetMapping("data")
    public List<BomVO> bomList() {
        return service.getListOrigin();
    }

    @GetMapping("data/{bom_code}")
    public List<BomRegistrationVO> getChildItem(@PathVariable String bom_code){
        return service.getBomRegistration(bom_code);
    }

    @DeleteMapping("{bom_code}")
    public void bomRemove(@PathVariable String bom_code) {
        service.removeBom(bom_code);

    }

    @GetMapping("product/item/data")
    public List<ItemVO> ProductItemList() {

        return service.searchProduct("%%");
    }

    @GetMapping("product/item/data/{item_name}")
    public List<ItemVO> searchProductItemList(@PathVariable String item_name) {
        item_name = "%" + item_name + "%";
        return service.searchProduct(item_name);
    }

    @PostMapping("register/{item_code}&{product_name}")
    public String bomAdd(@PathVariable String item_code, @PathVariable String product_name) {
        return  product_name;
    }

//    @GetMapping("{bom_code}")
//    public BomVO bomDetails(@PathVariable String bom_code) {
//
//    }

}

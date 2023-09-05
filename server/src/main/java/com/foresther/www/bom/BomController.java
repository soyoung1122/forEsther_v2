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

    @GetMapping("data/{item_name}")
    public List<ItemVO> searchItemList(@PathVariable String item_name) {
        item_name = "%" + item_name + "%";

        return null;
    }
}

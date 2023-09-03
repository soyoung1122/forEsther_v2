package com.foresther.www.bom;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequestMapping("/bom/*")
@AllArgsConstructor
public class BomController {
    private BomService service;

    @GetMapping("data")
    public List<BomVO> list() {
        return service.getListOrigin();
    }
}

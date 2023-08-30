package com.foresther.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    private final Logger logger = LoggerFactory.getLogger(TestController.class);

    @RequestMapping("/test")
    public String test() {
        logger.info("test controller---------------------------------------");
        return "hello";
    }
}

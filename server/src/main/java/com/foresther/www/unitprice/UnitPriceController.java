package com.foresther.www.unitprice;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.util.*;

@RestController
@RequestMapping("/unitprices")
@Log4j2
public class UnitPriceController {
    @Autowired
    UnitPriceService service;

    @Autowired
    ServletContext servletContext;

    @GetMapping()
    public List<UnitPrice> unitPriceList() {
        log.info("unit price list.....................................");

        return service.getList();
    }

    @GetMapping("/{ucode}")
    public UnitPrice get(@PathVariable("ucode") String unit_price_code) {
        log.info("unit price get.....................................");

        return service.get(unit_price_code);
    }

    @GetMapping("/{ucode}/thumbnail") public ResponseEntity<byte[]>
    getThumbnail(@PathVariable("ucode") String unit_price_code, Model model) {
        log.info("getThumbnail.....................................");

        String path = "C:\\test" + File.separator;
        String file_name =
                service.getThumbnail(unit_price_code);


        if(file_name == null) {
            log.info("file not exists");
            return null;
        }


        File file = new File(path + file_name);

        log.info(file);

        ResponseEntity<byte[]> result = null;

        try { HttpHeaders header = new HttpHeaders();

            header.add("Content-Type", Files.probeContentType(file.toPath()));
            header.set("file-name", file_name);

            byte[] byteFile = FileCopyUtils.copyToByteArray(file); byte[] base64 =
                    Base64.getEncoder().encode(byteFile);

            log.info("===========================================");
            log.info(
                    Files.probeContentType(file.toPath()));

            result = new ResponseEntity<>(base64, header, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    @GetMapping(value = "/{ucode}/download", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<byte[]> downloadFile(@PathVariable("ucode") String unit_price_code) throws IOException {
        log.info("================================download file===========================================");

        String path = "C:\\test" + File.separator;

        log.info(unit_price_code);
        String file_name = service.getThumbnail(unit_price_code);

        log.info(file_name);

        FileSystemResource resource = new FileSystemResource(path + file_name);

        log.info(resource);

        HttpHeaders headers = new HttpHeaders();

        try {
            headers.add("Content-Disposition", "attachment; filename=" +
                    new String(file_name.getBytes("UTF-8"), "ISO-8859-1"));

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        byte[] fileBytes = Files.readAllBytes(resource.getFile().toPath());

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(fileBytes.length)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(fileBytes);
    }
    @GetMapping("/{icode}/chart")
    public Map<String, Object> getChart(@PathVariable("icode") String item_code) {
        log.info("getChart=========================================");

        Map<String, Object> result = new HashMap<String, Object>();

        result.put("result", service.getChart(item_code));

        return result;
    }

    @PostMapping()
    public void register(@RequestParam("uploadFile") MultipartFile uploadFile, UnitPrice unitPrice) {
        log.info(uploadFile);
        if (!uploadFile.isEmpty()) {
            String path = "C:\\test"; // 파일 저장 경로를 C 드라이브의 test 폴더로 설정

            log.info("path=========================================");
            log.info(path);

            File saveFile = new File(path, Objects.requireNonNull(uploadFile.getOriginalFilename()));

            try {
                uploadFile.transferTo(saveFile);
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
            log.info(unitPrice);
            QuotationFile file = new QuotationFile();

            file.setSerial_lot_code(unitPrice.getSerial_lot_code());
            file.setFile_format(uploadFile.getContentType());
            file.setFile_name(uploadFile.getOriginalFilename());
            file.setFile_size(uploadFile.getSize());
            file.setFile_path(path);

            if (service.registerWithFile(unitPrice, file) == 0) {
                log.info(saveFile.delete());
            } else {
                log.info(file);
            }
        } else {
            log.info("no file");
            // 파일이 업로드되지 않은 경우에도 서비스에 unitPrice 전달
            service.register(unitPrice);
        }
        log.info("Ddddd");
    }



    @PostMapping("/autocomplete")
    public @ResponseBody Map<String, Object> autocomplete(@RequestParam Map<String, Object> paramMap) {

        List<Map<String, Object>> resultList = service.autocomplete(paramMap);
        paramMap.put("resultList", resultList);

        return paramMap;
    }
    public String makepath() {
        String path = servletContext.getRealPath("/") + File.separator + "resources" + File.separator + "assets"
                + File.separator + "img" + File.separator + "quotationImg";

        return path;
    }
}

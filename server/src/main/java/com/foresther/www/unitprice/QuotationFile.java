package com.foresther.www.unitprice;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.util.Date;

@Data
@Alias("QuotationFile")
public class QuotationFile {
    private String quotation_file_code;
    private String serial_lot_code;
    private String file_name;
    private String file_path;
    private long file_size;
    private String file_format;
    private Date upload_date;
    private String file_description;
}

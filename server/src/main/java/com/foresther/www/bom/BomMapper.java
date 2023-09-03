package com.foresther.www.bom;

import com.foresther.www.item.ItemVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BomMapper {
    public int getCount(String product_name);
    public int getTotal();
    public BomVO get(String bom_code);
    public BomVO getBom(String bom_code);
    public List<BomVO> getBomList();
    public List<BomVO> getList();
    public List<BomVO> search(String product_name);
    public List<BomVO> searchBom(@Param("product_name") String product_name, @Param("pageNum") int pageNum, @Param("amount") int amount);

    public String getBomregCount();
    public void insertBom(BomVO bom_vo);
    public void insertBomRegistration(BomRegistrationVO bomregistration_vo);
    public int deleteBom(String bom_code);
    public int deleteBomToBomRegistration(String bom_code);
    public int deleteBomRegistration(String bom_registration_code);
    public List<ItemVO> getBomItemList();
    public List<ItemVO> getItemList();
    public ItemVO getItem(String item_code);
    public List<ItemVO> searchItem(String item_name);
    public List<ItemVO> searchProduct(String item_name);
    public List<BomRegistrationVO> getBomRegistration(String bom_code);
    public int updateBomRegistration(@Param("required_quantity") int required_quantity,@Param("bom_registration_code") String bom_registration_code);

    public List<BomVO> getListWithPaging(Criteria cri);
    public List<BomRegistrationVO> getBomRegList();
}

package com.foresther.www.bom;

import com.foresther.www.item.ItemVO;

import java.util.List;

public interface BomService {
    public List<BomVO> getListOrigin();
    public List<BomVO> getList(Criteria cri);
    public List<BomRegistrationVO> getBomRegList();
    public int getTotal();

    public List<BomVO> get(String product_name);
    public List<BomVO> searchBom(String product_name, Criteria cri);

    public int getCount(String product_name);
    public BomVO getDetail(String bom_code);
    public BomVO getBom(String bom_code);
    public List<BomVO> getBomList();

    public String getBomregCount();
    public void registerBom(BomVO bom_vo);
    public void registerBomRegistration(BomRegistrationVO bomregistration_vo);
    public boolean removeBom(String bom_code);
    public boolean removeBomToBomRegistration(String bom_code);
    public boolean removeBomRegistration(String bom_registration_code);
    public List<ItemVO> getItemList();
    public List<ItemVO> getBomItemList();

    public ItemVO getItem(String item_code);

    public List<ItemVO> searchItem(String item_name);
    public List<ItemVO> searchProduct(String item_name);
    public List<BomRegistrationVO> getBomRegistration(String bom_code);
    public boolean modifyBomRegistration(int required_quantity, String bom_registration_code);
}

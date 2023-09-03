package com.foresther.www.bom;

import com.foresther.www.item.ItemVO;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Log4j2
public class BomServiceImpl implements BomService {

    @Autowired
    private BomMapper mapper;

    //	@Override
//	public List<BomVO> getList() {
//
//		log.info("getList----------------------------------");
//
//		return mapper.getList();
//	}
    @Override
    public List<BomVO> getListOrigin() {

        log.info("getListOrigin----------------------------------");
        return mapper.getList();
    }

    @Override
    public List<BomVO> getList(Criteria cri) {

        log.info("getList with criteria : " + cri);

        return mapper.getListWithPaging(cri);
    }

    @Override
    public List<BomRegistrationVO> getBomRegList() {
        return mapper.getBomRegList();
    }


    @Override
    public List<BomVO> get(String product_name) {
        log.info("get----------------------------------");


        return mapper.search(product_name);
    }

    @Override
    public int getCount(String product_name) {
        log.info("getCount-------------------------------");

        return mapper.getCount(product_name);
    }

    @Override
    public String getBomregCount() {

        log.info("getBomregCount-----------------------------------------");

        return mapper.getBomregCount();
    }

    @Override
    public void registerBom(BomVO bom_vo) {

        log.info("register_bom----------------------------------------");
        mapper.insertBom(bom_vo);
    }

    @Override
    public void registerBomRegistration(BomRegistrationVO bomregistration_vo) {
        log.info("register_bom_registration---------------------------------");
        mapper.insertBomRegistration(bomregistration_vo);

    }

    @Transactional
    @Override
    public boolean removeBom(String bom_code) {
        log.info("remove_bom--------------------------");
        mapper.deleteBomToBomRegistration(bom_code);
        return mapper.deleteBom(bom_code) == 1;
    }

    @Override
    public boolean removeBomToBomRegistration(String bom_code) {

        log.info("remove_bom_to_bom_registration------------------------------------");

        return mapper.deleteBomToBomRegistration(bom_code) == 1;
    }

    @Override
    public boolean removeBomRegistration(String bom_registration_code) {

        log.info("remove_bom_registration-------------------------");

        return mapper.deleteBomRegistration(bom_registration_code) == 1;
    }

    @Override
    public List<ItemVO> getItemList() {

        log.info("getItemList-----------------------------");

        return mapper.getItemList();
    }


    @Override
    public List<ItemVO> getBomItemList() {
        log.info("getBomItemList-----------------------------");

        return mapper.getBomItemList();
    }

    @Override
    public BomVO getDetail(String bom_code) {

        log.info("getDetail........................");

        return mapper.get(bom_code);
    }

    @Override
    public ItemVO getItem(String item_code) {

        log.info("getItem..................");
        return mapper.getItem(item_code);
    }

    @Override
    public List<ItemVO> searchItem(String item_name) {

        log.info("searchItem.......................");
        return mapper.searchItem(item_name);
    }

    @Override
    public List<BomRegistrationVO> getBomRegistration(String bom_code) {

        log.info("getBomRegistration............................");
        return mapper.getBomRegistration(bom_code);
    }

    @Override
    public boolean modifyBomRegistration(int required_quantity, String bom_registration_code) {

        log.info("modifyBomRegistration......................");

        return mapper.updateBomRegistration(required_quantity, bom_registration_code) == 1;
    }

    @Override
    public List<ItemVO> searchProduct(String item_name) {

        log.info("searchProduct........................");

        return mapper.searchProduct(item_name);
    }

    @Override
    public List<BomVO> getBomList() {

        log.info("getBomList.................");

        return mapper.getBomList();
    }

    @Override
    public BomVO getBom(String bom_code) {

        log.info("getBom....................");

        return mapper.getBom(bom_code);
    }

    @Override
    public int getTotal() {

        log.info("getTotal....................");

        return mapper.getTotal();
    }

    @Override
    public List<BomVO> searchBom(String product_name, Criteria cri) {

        log.info("searchBom....................");



        return mapper.searchBom(product_name, cri.getPageNum(), cri.getAmount());
    }






}

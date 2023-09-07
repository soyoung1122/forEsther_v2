import { useEffect, useState } from "react";
import Button from "../../../components/form/Button";
import Dropdown from "../../../components/form/Dropdown";
import Form from "../../../components/form/Form";
import FormGroup from "../../../components/form/FormGroup";
import Input from "../../../components/form/Input";
import Label from "../../../components/form/Label";
import SearchInput from "../../../components/search/SearchInput";
import axios from "axios";

const RegisterPanel = ({ 
  data, 
  setData,
  categoryInfo, 
  procurementInfo,
  tableBody,
  setTableBody
}) => {
  const { item_name, item_classification, procurement, sub_category_code, sub_category_name, item_specification, safety_stock, supplier_name } = data;
  const { subCategory } = categoryInfo;

  const [isDisabledAddBtn, setIsDisabledAddBtn] = useState(true); //추가버튼 활성화 유무
  const [isDisabledSearchBtn, setIsDisabledSearchBtn] = useState(true); //구매처 검색버튼 활성화 유무
  const [specification, setSpecification] = useState({ value: '', unit: '단위'});
  const [supplier, setSupplier] = useState({
    contactPerson: '',
    contactNumber: '',
    address: ''
  })

  const itemClassificationInfo = [
    {
      idx: 1,
      name: "원재료",
      value: "원재료"
    },
    {
      idx: 2,
      name: "제품",
      value: "제품"
    },
    {
      idx: 3,
      name: "상품",
      value: "상품"
    },
  ]

  const itemUnit = [
    {
      idx: 1, 
      name: 'kg',
      value: 'kg'
    },
    {
      idx: 2, 
      name: 'g',
      value: 'g'
    },
    {
      idx: 3, 
      name: 'ml',
      value: 'ml'
    },
    {
      idx: 4, 
      name: 'l',
      value: 'l'
    },
  ]

  //추가버튼 비활성화 관련 기능
  useEffect(()=> {
    //구매처명 검색버튼 활성화 유무 처리
    if(item_classification == '품목구분' || item_classification == '제품') {
      setIsDisabledSearchBtn(true);
    } else {
      setIsDisabledSearchBtn(false);
    }

    //form 데이터 값이 초기값인지 아닌지에 따라 
    //추가버튼 활성화 유무 처리
    if(item_name != '' && item_classification != '품목구분' && sub_category_name != '소분류' 
      && procurement != '조달방법' && safety_stock != '') {
      setIsDisabledAddBtn(false);
    } else {
      setIsDisabledAddBtn(true);
    }
  }, [data])

  //품목 복사 시 필요한 기능
  useEffect(()=> {
    if(item_specification == '') return;
    const spec = item_specification.split(/([a-zA-Z]+)/);
    setSpecification({value: spec[0], unit: spec[1]});
  }, [item_specification])

  useEffect(()=> {
    if(subCategory.length == 0) return;
    const categoryName = subCategory.filter(item => item.value == sub_category_code);
    if(categoryName.length == 0) return;
    setData({...data, sub_category_name: categoryName[0].name});

  }, [sub_category_code])

  //품목명 이벤트
  const changeItemName = (e) => {
    setData({...data, item_name: e.currentTarget.value});
  }

  //품목구분 이벤트
  const clickItemClassification = (e) => {
    setData({...data, item_classification: e.currentTarget.textContent});
  }

  //소분류 이벤트
  const clickSubCategory = (e)=> {
    setData({...data, sub_category_name: e.currentTarget.textContent });
  }

  //규격 이벤트
  const specificationValue = (e) => {
    setSpecification({...specification, value: e.target.value})
    
  }
  const clickItemUnit = (e) => {
    setSpecification({...specification, unit: e.target.textContent})
  }

  //안전재고량 이벤트
  const changeSafetyStock = (e) => {
    setData({...data, safety_stock: e.currentTarget.value});
  }

  //조달방법 이벤트
  const clickProcurement = (e) => {
    setData({...data, procurement: e.currentTarget.textContent});
  }

  //구매처명 이벤트
  const searchSupplierName = async(searchValue) => {
    const res =await axios.get(`/items/supplier?searchValue=${searchValue}`);
    const { contact_person, contact_number, address } = res.data;
    setSupplier({contactPerson: contact_person, contactNumber: contact_number, address});
    setData({...data, supplier_name: res.data.supplier_name})
  }

  //품목 추가 버튼 이벤트
  const submitForm = (e) => {
    e.preventDefault();
    const result = {...data, item_specification: (specification.value+ specification.unit)};
    setData(result);
    setTableBody([...tableBody, result]);
  }

  return (
    <section style={{marginBottom: "20px", padding: "20px", borderRadius: "10px", backgroundColor: "#f1f1f1"}}>
      <Form>
        <div className="row" style={{marginBottom: "12px"}}>
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`itemName`} value={`품목명`}/>
              <Input value={item_name} id={`itemName`} type={`text`} placeholder={`품목명`} onChange={changeItemName}/>
            </FormGroup>
          </div>
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`itemClassification`} value={`품목구분`}/>
              <Dropdown initValue={item_classification} list={itemClassificationInfo} onClick={clickItemClassification}/>
            </FormGroup>
          </div>
          <div className="col">
            <Label id={`mainCategory`} value={`소분류`}/>
            <Dropdown initValue={sub_category_name} list={subCategory} onClick={clickSubCategory}/>
          </div>
          <div className="col">
            <Label id={`itemSafe`} value={`규격`}/>
            <div className="d-flex" style={{gap: "4px"}}>
              <Input value={specification.value} id={`itemSafe`} type={`text`} placeholder={`규격`} onChange={specificationValue}/>
              <Dropdown initValue={specification.unit} list={itemUnit} onClick={clickItemUnit}/>
            </div>
          </div>
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`itemSafe`} value={`안전재고량`}/>
              <Input value={safety_stock} id={`itemSafe`} type={`text`} placeholder={`안전재고량`} onChange={changeSafetyStock}/>
            </FormGroup>
          </div>
        </div>

        <div className="row" style={{marginBottom: "12px"}}>
          <div className="col">
            <Label id={`mainCategory`} value={`조달방법`}/>
            <Dropdown initValue={procurement} list={procurementInfo} onClick={clickProcurement}/>
          </div>
          <div className="col">
            <Label id={`itemSafe`} value={`구매처명`}/>
            <SearchInput onSubmit={searchSupplierName} disabled={isDisabledSearchBtn}/>
          </div>
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`itemSafe`} value={`담당자명`}/>
              <Input value={supplier.contactPerson} id={`itemSafe`} type={`text`}  disabled={true}/>
            </FormGroup>
          </div>
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`itemSafe`} value={`연락처`}/>
              <Input value={supplier.contactNumber} id={`itemSafe`} type={`text`} disabled={true}/>
            </FormGroup>
          </div>
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`itemSafe`} value={`주소`}/>
              <Input value={supplier.address} id={`itemSafe`} type={`text`} disabled={true}/>
            </FormGroup>
          </div>
        </div>

        <div className="row justify-content-center" style={{ marginTop: "40px"}}>
          <div style={{width: "300px"}}>
            <Button type={`submit`} value={`추가`} className={`btn-dark`} onClick={submitForm} disabled={isDisabledAddBtn}/>
          </div>
        </div>
      </Form>
    </section>
  )
}

export default RegisterPanel;
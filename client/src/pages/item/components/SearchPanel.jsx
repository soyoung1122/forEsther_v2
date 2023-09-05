import Form from "../../../components/form/Form";
import FormGroup from "../../../components/form/FormGroup";
import Label from '../../../components/form/Label';
import Input from '../../../components/form/Input';
import Dropdown from "../../../components/form/Dropdown";
import Button from "../../../components/form/Button";

const SearchPanel = ({
  categoryInfo,
  searchData,
  clickItemClassificationBtn,
  clicksubCategoryBtn,
  clickmainCategoryBtn,
  changeItemName,
  changeSupplierName,
  clickSearchBtn,
  clickResetBtn
}) => {
  const { mainCategory, subCategory} = categoryInfo;
  const {item_classification, sub_category_name, main_category_name, item_name, supplier_name } = searchData;

  const itemClassificationList = [
    {
      idx: 1, 
      name: '원재료',
      value: 1
    },
    {
      idx: 2, 
      name: '제품',
      value: 2
    },
    {
      idx: 3, 
      name: '상품',
      value: 3
    },
  ]

  return(
    <section style={{marginBottom: "20px", padding: "20px", borderRadius: "10px", backgroundColor: "#f1f1f1"}}>
      <Form>
        <div className="row" style={{marginBottom: "18px"}}>
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`itemClassification`} value={`품목구분`}/>
              <Dropdown initValue={item_classification} list={itemClassificationList} onClick={clickItemClassificationBtn}/>
            </FormGroup>
          </div>
          <div className="col">
            <Label id={`subCategory`} value={`소분류`}/>
            <Dropdown initValue={sub_category_name} list={subCategory} onClick={clicksubCategoryBtn}/>
          </div>
          <div className="col">
            <Label id={`mainCategory`} value={`대분류`}/>
            <Dropdown initValue={main_category_name} list={mainCategory} onClick={clickmainCategoryBtn}/>
          </div>
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`itemName`} value={`품목명`}/>
              <Input value={item_name} id={`itemName`} type={`text`} placeholder={`품목명을 입력하세요`} onChange={changeItemName}/>
            </FormGroup>
          </div>
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`supplierName`} value={`구매처`}/>
              <Input value={supplier_name} id={`supplierName`} type={`text`} placeholder={`구매처명을 입력하세요`} onChange={changeSupplierName}/>
            </FormGroup>
          </div>
        </div>
        <div className="row justify-content-center" style={{ marginTop: "40px"}}>
          <div style={{width: "200px"}}>
            <Button type={`button`} value={`초기화`} className={`btn-secondary`} onClick={clickResetBtn}/>
          </div>
          <div style={{width: "200px"}}>
            <Button type={`submit`} value={`검색`} className={`btn-dark`} onClick={clickSearchBtn}/>
          </div>
        </div>
      </Form>
    </section>
  )
}

export default SearchPanel;
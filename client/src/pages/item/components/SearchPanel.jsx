import Form from "../../../components/form/Form";
import FormGroup from "../../../components/form/FormGroup";
import Label from '../../../components/form/Label';
import Input from '../../../components/form/Input';
import Dropdown from "../../../components/form/Dropdown";
import Button from "../../../components/form/Button";

const SearchPanel = ({
  searchData,
  clickItemClassificationBtn,
  clicksubCategoryBtn,
  clickmainCategoryBtn,
  changeItemName,
  changeSupplierName,
  clickSearchBtn
}) => {

  const {itemClassification, subCategory, mainCategory, itemName, supplierName } = searchData;

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

  const subCategoryList = [
    {
      idx: 1,
      name: '과일류',
      value: 8
    },
    {
      idx: 2,
      name: '채소류',
      value: 9
    },
    {
      idx: 3,
      name: '수산물류',
      value: 10
    },
  ]

  const mainCategoryList = [
    {
      idx: 1,
      name: '냉동식품',
      value: 1
    },
    {
      idx: 2,
      name: '냉장식품',
      value: 2
    },
    {
      idx: 3,
      name: '신선식품',
      value: 3
    },
  ]

  return(
    <section style={{marginBottom: "20px", padding: "20px", borderRadius: "10px", backgroundColor: "#f1f1f1"}}>
      <Form action={``} method={``} submitEvt={()=> console.log('dd')}>
        <div className="row" style={{marginBottom: "18px"}}>
          <div className="col">
            <FormGroup type={'text'}>
            <Label id={`itemClassification`} value={`품목구분`}/>
            <Dropdown initValue={itemClassification} list={itemClassificationList} onClick={clickItemClassificationBtn}/>
            </FormGroup>
          </div>
          <div className="col">
            <Label id={`subCategory`} value={`소분류`}/>
            <Dropdown initValue={subCategory} list={subCategoryList} onClick={clicksubCategoryBtn}/>
          </div>
          <div className="col">
          <Label id={`mainCategory`} value={`대분류`}/>
            <Dropdown initValue={mainCategory} list={mainCategoryList} onClick={clickmainCategoryBtn}/>
          </div>
        </div>
        <div className="row row-cols-3">
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`itemName`} value={`품목명`}/>
              <Input value={itemName} id={`itemName`} type={`text`} placeholder={`품목명을 입력하세요`} onChange={changeItemName}/>
            </FormGroup>
          </div>
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`supplierName`} value={`구매처`}/>
              <Input value={supplierName} id={`supplierName`} type={`text`} placeholder={`구매처명을 입력하세요`} onChange={changeSupplierName}/>
            </FormGroup>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div style={{marginTop: "40px", width: "200px"}}>
            <Button type={`submit`} value={`검색`} className={`btn-dark`} onClick={clickSearchBtn}/>
          </div>
        </div>
      </Form>
    </section>
  )
}

export default SearchPanel;
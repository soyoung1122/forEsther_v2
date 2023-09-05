import Button from "../../../components/form/Button";
import Dropdown from "../../../components/form/Dropdown";
import Form from "../../../components/form/Form";
import FormGroup from "../../../components/form/FormGroup";
import Input from "../../../components/form/Input";
import Label from "../../../components/form/Label";
import SearchInput from "../../../components/search/SearchInput";

const RegisterPanel = () => {
  return (
    <section style={{marginBottom: "20px", padding: "20px", borderRadius: "10px", backgroundColor: "#f1f1f1"}}>
      <Form>
        <div className="row" style={{marginBottom: "12px"}}>
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`itemName`} value={`품목명`}/>
              <Input value={''} id={`itemName`} type={`text`} placeholder={`품목명`} onChange={()=> console.log(11)}/>
            </FormGroup>
          </div>
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`itemClassification`} value={`품목구분`}/>
              <Dropdown initValue={'품목구분'} list={[]} onClick={()=> console.log(22)}/>
            </FormGroup>
          </div>
          <div className="col">
            <Label id={`mainCategory`} value={`소분류`}/>
            <Dropdown initValue={'소분류'} list={[]} onClick={()=> console.log(33)}/>
          </div>
          <div className="col">
            <Label id={`itemSafe`} value={`규격`}/>
            <div className="d-flex" style={{gap: "4px"}}>
              <Input value={''} id={`itemSafe`} type={`text`} placeholder={`규격`} onChange={()=> console.log(11)}/>
              <Dropdown initValue={'단위'} list={[]} onClick={()=> console.log(33)}/>
            </div>
          </div>
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`itemSafe`} value={`안전재고량`}/>
              <Input value={''} id={`itemSafe`} type={`text`} placeholder={`안전재고량`} onChange={()=> console.log(11)}/>
            </FormGroup>
          </div>
        </div>

        <div className="row row-cols-5" style={{marginBottom: "12px"}}>
          <div className="col">
            <Label id={`itemSafe`} value={`구매처명`}/>
            <SearchInput />
          </div>
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`itemSafe`} value={`담당자명`}/>
              <Input value={''} id={`itemSafe`} type={`text`}  onChange={()=> console.log(11)} />
            </FormGroup>
          </div>
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`itemSafe`} value={`연락처`}/>
              <Input value={''} id={`itemSafe`} type={`text`}  onChange={()=> console.log(11)} />
            </FormGroup>
          </div>
          <div className="col">
            <FormGroup type={'text'}>
              <Label id={`itemSafe`} value={`주소`}/>
              <Input value={''} id={`itemSafe`} type={`text`}  onChange={()=> console.log(11)} />
            </FormGroup>
          </div>
        </div>

        <div className="row justify-content-center" style={{ marginTop: "40px"}}>
          <div style={{width: "300px"}}>
            <Button type={`submit`} value={`저장`} className={`btn-dark`} onClick={()=> console.log(123)}/>
          </div>
        </div>
      </Form>
    </section>
  )
}

export default RegisterPanel;
import Form from "../form/Form";
import Input from "../form/Input";
import Label from "../form/Label";

const SearchPanel = () => {
  return (
    <section style={{marginBottom: "20px", padding: "20px",  borderRadius: "8px", backgroundColor: "#f1f1f1"}}>
      <Form action={""} method={"POST"} submitEvt={()=> console.log('submit')}>
        <div>
          <Label id={"itemName"} value={"품목명"}/>
          <Input type={"text"} id={"itemName"} placeholder={"품목명을 입력하세요"} />
        </div>
      </Form>
    </section>
  )
}

export default SearchPanel;
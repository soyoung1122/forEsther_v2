import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Dropdown from "../../components/form/Dropdown";
import Input from "../../components/form/Input";
import Label from "../../components/form/Label";
import Radio from "../../components/form/Radio";
import PageCard from "../../components/page/PageCard";
import PageHeader from "../../components/page/PageHeader";
import PageTitle from "../../components/page/PageTitle";
import Button from "../../components/form/Button";
import FormGroup from "../../components/form/FormGroup";
import Autocomplete from "./Autocomplete";

const Register = () => {
  const [selectedVal ,setSelectedVal] = useState("직접입력");
  const [selectedRadio, setSelectedRadio] = useState("bp");
  const history = useHistory();
  const [serialLot, setSerialLot] = useState("");
  const [itemName, setItemname] = useState("");
  const [sCost, setSCost] = useState(0);
  const [pPrice, setPPrice] = useState(0);
  const [sPrice, setSPrice] = useState(0);
  const [margin, setMargin] = useState(0);

  const onLabelClick = (e) => {
    setSelectedVal(e.target.textContent);
  }

  useEffect(() => {
    calSPrice();
  }, [selectedRadio, margin, sPrice]);

  const calSPrice = () => {
    let price = 0;
    if(selectedRadio == "op") {
      price = sCost;
    } else if(selectedRadio == "bp") {
      price = pPrice;
    }
    setSPrice(parseInt(price) + parseInt(price * (margin / 100)));
  }

  const onCancel = (e) => {
    history.push("/unitprices");
  }

  const onSelectSL = (item) => {
    if(item.status == '등록완료') {
      alert("이미 등록된 SL");
    } else {
      setItemname(item.item);
      setSerialLot(item.value);
    }
  }

  const onChangeMargin = (e) => {
    setMargin(e.target.value);

  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <PageCard>
      <PageHeader>
        <PageTitle value="단가 신규등록" />
      </PageHeader>
      <form id="registerForm" className="modal-body"
          enctype="multipart/form-data" action="/unitPrice/register"
          method="post">
          <div className="row g-2">
            <div className="col mb-0">
              <h6 className="sub-title">품목 정보</h6>
            </div>
            <div className="col mb-0">
              <h6 className="sub-title">금액 정보</h6>
            </div>
          </div>
          <br />
          <div className="row g-2">
          <div className="col mb-0">
            <FormGroup> 
            <Label 
                id={"sy-sl-autocomplete"}
                value={"시리얼로트"}
              />
              <Autocomplete onClick={onSelectSL} />
            </FormGroup>
            </div>
            <div className="col mb-0">
              <FormGroup>
              <Label 
                  id={"sy-cal-op"}
                  value={"표준원가"}
                />
                <Input 
                  type={"text"}
                  id={"sy-cal-op"}
                  placeholder={"예시) 10000"}
                  value={sCost}
                  onChange={(e)=>{setSCost(e.target.value)}}
                />
                
                </FormGroup>
            </div>

          </div>
          <br />
          <div className="row g-2">
            <div className="col mb-0">
              <FormGroup>
                <Label 
                  id={"sy-op-input"}
                  value={"품목명"}
                />
                <input
                  value={itemName}
                  type="text"
                  className="form-control"
                  id="sy-op-input"
                  placeholder="예시) 김치찌개"
                  onChange={(e)=>{setItemname(e.target.value)}}
                />
                
                </FormGroup>
            </div>
            <div className="col mb-0">
            <FormGroup>
                <Label 
                  id={"sy-cal-bp"}
                  value={"구매단가"}
                />
                <Input 
                  value={pPrice}
                  type={"text"}
                  id={"sy-cal-bp"}
                  placeholder={"예시) 10000"}
                  onChange={(e)=>{setPPrice(e.target.value)}}
                />
                </FormGroup>
            </div>
          </div>
          <br></br>
          <div className="row g-2">
            <div className="col mb-0"></div>
            <div className="col mb-0">
              {/* <label for="nameBasic" className="form-label">판매단가</label> */}
              <div className="row g-2">
                <div className="col">
                    <FormGroup>
                    <Label 
                      id={"sy-cal-sp"}
                      value={"판매단가"}
                    />
                    <input
                      value={sPrice}
                      type="text"
                      className="form-control"
                      id="sy-cal-sp"
                      placeholder="예시) 10000"
                      onChange={(e)=>{setSPrice(e.target.value)}}
                    />
                    </FormGroup>
                </div>
                <div className="col" style={{
                  display: "flex",
                  alignItems: "flex-end"
                }}>
                  <div className="sy-ui-select" style={{
                    width: "100%"
                  }}>
                    <Dropdown 
                      initValue={selectedVal}
                      onClick={onLabelClick}
                      list={[
                        {
                          name: "직접입력",
                          value: "N"
                        },
                        {
                          name: "자동계산",
                          value: "Y"
                        }
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          { selectedVal == "자동계산" ? (
          <div id="sy-cal-body">
            <div className="row g-2">
              <div className="col mb-0"></div>
              <div className="col mb-0">
                <div className="row g-2">
                  <div className="col mt-3"style={{
                  display: "flex",
                  justifyContent: "space-between"
                }}><Label 
                id={"sy-cal-m"}
                value={"마진율"} />
                    <FormGroup type={"checkbox"}>
                  <Radio 
                      selected
                      name={"cal-price"}
                      value={"op"}
                      id={"defaultRadio1"}
                      onChange={(e) => {setSelectedRadio(e.target.value)}}
                  />
                  <Label 
                    id={"defaultRadio1"}
                    value={"표준원가대비"}
                  />
                  </FormGroup>
                  </div>
                  <div className="col mt-3"style={{
                  display: "flex",
                  justifyContent: "space-around"
                }}>
                  <FormGroup type={"checkbox"}>
                    <Radio 
                      name={"cal-price"}
                      value={"bp"}
                      id={"defaultRadio2"}
                      onChange={(e) => {setSelectedRadio(e.target.value)}}
                    />
                    <Label 
                    id={"defaultRadio2"}
                    value={"판매단가대비"} />
                      </FormGroup>
                  </div>
                </div>
              </div>
            </div>
              <div className="row g-2">
                <div className="col mb-0"></div>
                <div className="col mb-0">
                  <FormGroup>
                  <Input 
                    value={margin}
                    type={"text"}
                    id={"sy-cal-m"}
                    placeholder={"예시) 10(단위 %)"}
                    onChange={onChangeMargin}
                  />
                      </FormGroup>
                </div>
              </div>
          </div> )
          : null }
          <br />
          <div className="row g-2">
          <Label 
                id={"fileInput"}
                value={"견적서 파일 첨부"}
              />
          </div>
          <div className="row g-2">
            <div className="col mb-0 input-group">
              {/* <label for="nameBasic" className="form-label">견적서 파일 첨부</label> */}
              <input type="file" className="form-control" name="uploadFile"
                id="fileInput" aria-describedby="inputGroupFileAddon04"
                aria-label="Upload" />
              <button className="btn btn-outline-primary" type="button"
                id="fileBtn">첨부</button>
              <input type="hidden" name="file_name" /> <input
                type="hidden" name="file_size" /> <input type="hidden"
                name="file_format" />
            </div>
          </div>
          <br />
          <br />
          <br />
          <div className="row g-2">
          <div className="col" 
            style={{
              display: "flex",
              justifyContent: "flex-end"
            }}>
            <div style={{
              marginRight: "5px"
            }}>
              <Button 
                type={"button"}
                value={"취소"}
                onClick={onCancel}
                className={"btn-secondary"}
              />
            </div>
            <div>
              <Button 
                type={"submit"}
                value={"등록"}
                onClick={onSubmit}
                className={"btn-primary"}
              />
            </div>
          </div>
          <br />
          <br />
          </div>
        </form>
    </PageCard>
  );
}

export default Register; 
import { useState } from "react";

import Dropdown from "../../components/form/Dropdown";
import Input from "../../components/form/Input";
import Label from "../../components/form/Label";
import Radio from "../../components/form/Radio";
import PageCard from "../../components/page/PageCard";
import PageHeader from "../../components/page/PageHeader";
import PageTitle from "../../components/page/PageTitle";
import Button from "../../components/form/Button";
import FormGroup from "../../components/form/FormGroup";

const Register = () => {
  const [selectedVal ,setSelectedVal] = useState("직접입력");

  const onLabelClick = (e) => {
    setSelectedVal(e.target.textContent);
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
              <Input 
                type={"text"}
                id={"sy-sl-autocomplete"}
                placeholder={"예시) RM-002-20231231"}
                onChange={()=>{}}
              />
              
              {/* <input type="text" className="form-control"
                name="serial_lot_code" id="sy-sl-autocomplete"
                placeholder="예시) RM-002-20231231"
                aria-describedby="floatingInputHelp" /> <label
                for="floatingInput">시리얼로트</label> */}
            </FormGroup>
            </div>
            <div className="col mb-0">
              <FormGroup>
              <Label 
                  id={"sy-cal-op"}
                  value={"표준원가"}
                />
              {/* <input type="text" className="form-control" id="sy-cal-op"
                name="standard_cost" placeholder="예시) 10000"
                aria-describedby="floatingInputHelp" /> <label
                for="floatingInput">표준원가</label> */}
                <Input 
                  type={"text"}
                  id={"sy-cal-op"}
                  placeholder={"예시) 10000"}
                  onChange={()=>{}}
                />
                
                </FormGroup>
            </div>

          </div>
          <br />
          <div className="row g-2">
            <div className="col mb-0">
              <FormGroup>
              {/* <input type="text" className="form-control" id="sy-op-input"
                name="item_name" placeholder="예시) 김치찌개"
                aria-describedby="floatingInputHelp" /> <label
                for="floatingInput">품목명</label> */}
                <Label 
                  id={"sy-op-input"}
                  value={"품목명"}
                />
                <Input 
                  type={"text"}
                  id={"sy-op-input"}
                  placeholder={"예시) 김치찌개"}
                  onChange={()=>{}}
                />
                
                </FormGroup>
            </div>
            <div className="col mb-0">
            <FormGroup>
              {/* <input type="text" className="form-control" id="sy-cal-bp"
                name="purchase_price" placeholder="예시) 10000"
                aria-describedby="floatingInputHelp" /> <label
                for="floatingInput">구매단가</label> */}
                <Label 
                  id={"sy-cal-bp"}
                  value={"구매단가"}
                />
                <Input 
                  type={"text"}
                  id={"sy-cal-bp"}
                  placeholder={"예시) 10000"}
                  onChange={()=>{}}
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
                  {/* <input name="selling_price" type="text" id="sy-cal-sp"
                    className="form-control" /> */}
                    <FormGroup>
                    <Label 
                      id={"sy-cal-sp"}
                      value={"판매단가"}
                    />
                    <Input 
                      type={"text"}
                      id={"sy-cal-sp"}
                      placeholder={"예시) 10000"}
                      onChange={()=>{}}
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
                    {/* <select name="sy-ui-select" className="form-select"
                      id="sy-select" aria-label="Default select example">
                      <option value="N" selected="selected">직접입력</option>
                      <option value="Y">자동계산</option>
                    </select> */}
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
          <div id="sy-cal-body">
            <div className="row g-2">
              <div className="col mb-0"></div>
              <div className="col mb-0">
                <div className="row g-2">
                  <div className="col mt-3"style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}>
                    <FormGroup type={"checkbox"}>
                  <Radio 
                    name={"cal-price"}
                      value={"op"}
                      id={"defaultRadio1"}
                      onChange={() => {}}
                  />
                  <Label 
                    id={"defaultRadio1"}
                    value={"표준원가대비"}
                    onChange={() => {}}
                  />
                  </FormGroup>
                    {/* <input name="cal-price" className="form-check-input"
                      value="op" type="radio" value="" id="defaultRadio1" />
                    <label className="form-check-label" for="defaultRadio1">
                      표준원가대비 </label> */}
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
                    />
                    <Label 
                    id={"defaultRadio2"}
                    value={"판매단가대비"} />
                    {/* <input name="cal-price" className="form-check-input"
                      value="bp" type="radio" value="" id="defaultRadio2"
                      checked /> <label className="form-check-label"
                      for="defaultRadio2"> 구매단가대비 </label> */}
                      </FormGroup>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-2">
              <div className="col mb-0"></div>
              <div className="col mb-0">
                <FormGroup>
                <Label 
                    id={"sy-cal-m"}
                    value={"마진율"} />
                {/* <input type="text" className="form-control" id="sy-cal-m"
                  placeholder="예시) 10(단위 %)"
                  aria-describedby="floatingInputHelp" /> <label
                  for="floatingInput">마진율</label> */}
                <Input 
                  type={"text"}
                  id={"sy-cal-m"}
                  placeholder={"예시) 10(단위 %)"}
                  onChange={()=>{}}
                />
                    </FormGroup>
              </div>
            </div>
          </div>
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
                onClick={() => {}}
                className={"btn-secondary"}
              />
            </div>
            <div>
              <Button 
                type={"submit"}
                value={"등록"}
                onClick={() => {}}
                className={"btn-primary"}
              />
            </div>
          </div>
          </div>
        </form>
    </PageCard>
  );
}

export default Register;
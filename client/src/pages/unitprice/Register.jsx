import PageCard from "../../components/page/PageCard";
import PageHeader from "../../components/page/PageHeader";
import PageTitle from "../../components/page/PageTitle";

const Register = () => {
  return (
    <PageCard>
      <PageHeader>
        <PageTitle value="단가 신규등록" />
      </PageHeader>
      <form id="registerForm" class="modal-body"
          enctype="multipart/form-data" action="/unitPrice/register"
          method="post">
          <div class="row g-2">
            <div class="col mb-0">
              <h6 class="sub-title">품목 정보</h6>
            </div>
            <div class="col mb-0">
              <h6 class="sub-title">금액 정보</h6>
            </div>
          </div>
          <br />
          <div class="row g-2">
            <div class="form-floating col mb-0">
              <input type="text" class="form-control"
                name="serial_lot_code" id="sy-sl-autocomplete"
                placeholder="예시) RM-002-20231231"
                aria-describedby="floatingInputHelp" /> <label
                for="floatingInput">시리얼로트</label>
            </div>
            <div class="form-floating col mb-0">
              <input type="text" class="form-control" id="sy-cal-op"
                name="standard_cost" placeholder="예시) 10000"
                aria-describedby="floatingInputHelp" /> <label
                for="floatingInput">표준원가</label>
            </div>

          </div>
          <br />
          <div class="row g-2">
            <div class="form-floating col mb-0">
              <input type="text" class="form-control" id="sy-op-input"
                name="item_name" placeholder="예시) 김치찌개"
                aria-describedby="floatingInputHelp" /> <label
                for="floatingInput">품목명</label>
            </div>
            <div class="form-floating col mb-0">
              <input type="text" class="form-control" id="sy-cal-bp"
                name="purchase_price" placeholder="예시) 10000"
                aria-describedby="floatingInputHelp" /> <label
                for="floatingInput">구매단가</label>
            </div>
          </div>
          <div class="row g-2">
            <div class="col mb-0"></div>
            <div class="col mb-0">
              <label for="nameBasic" class="form-label">판매단가</label>
              <div class="row g-2">
                <div class="col">
                  <input name="selling_price" type="text" id="sy-cal-sp"
                    class="form-control" />
                </div>
                <div class="col">
                  <div class="sy-ui-select">
                    <select name="sy-ui-select" class="form-select"
                      id="sy-select" aria-label="Default select example">
                      <option value="N" selected="selected">직접입력</option>
                      <option value="Y">자동계산</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="sy-cal-body">
            <div class="row g-2">
              <div class="col mb-0"></div>
              <div class="col mb-0">
                <div class="row g-2">
                  <div class="col form-check mt-3">
                    <input name="cal-price" class="form-check-input"
                      value="op" type="radio" value="" id="defaultRadio1" />
                    <label class="form-check-label" for="defaultRadio1">
                      표준원가대비 </label>
                  </div>
                  <div class="col form-check">
                    <input name="cal-price" class="form-check-input"
                      value="bp" type="radio" value="" id="defaultRadio2"
                      checked /> <label class="form-check-label"
                      for="defaultRadio2"> 구매단가대비 </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row g-2">
              <div class="col mb-0"></div>
              <div class="form-floating col mb-0">
                <input type="text" class="form-control" id="sy-cal-m"
                  placeholder="예시) 10(단위 %)"
                  aria-describedby="floatingInputHelp" /> <label
                  for="floatingInput">마진율</label>
              </div>
            </div>
          </div>
          <br />
          <div class="row g-2">
            <div class="col mb-0 input-group">
              <label for="nameBasic" class="form-label">견적서 파일 첨부</label>
              <input type="file" class="form-control" name="uploadFile"
                id="fileInput" aria-describedby="inputGroupFileAddon04"
                aria-label="Upload" />
              <button class="btn btn-outline-primary" type="button"
                id="fileBtn">첨부</button>
              <input type="hidden" name="file_name" /> <input
                type="hidden" name="file_size" /> <input type="hidden"
                name="file_format" />
            </div>
          </div>
        </form>
    </PageCard>
  );
}

export default Register;
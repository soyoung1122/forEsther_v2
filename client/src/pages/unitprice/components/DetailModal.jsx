import ModalHeader from "../../../components/modal/ModalHeader";
import ModalBody from "../../../components/modal/ModalBody";
import ModalFooter from "../../../components/modal/ModalFooter";
import { useEffect, useState } from "react";

const DetailModal = ({ data, file, fileName, downloadLink, onDownload }) => {
  // 초기 상태값을 useState 훅을 통해 설정합니다.
  const [sl, setSl] = useState("");
  const [sc, setSc] = useState("");
  const [bp, setBp] = useState("");
  const [sp, setSp] = useState("");
  // console.log(downloadLink)
  useEffect(() => {
    // data 객체가 정의되었는지 확인 후 toLocaleString을 사용하도록 업데이트합니다.
    if (data) {
      setSl(data['serial_lot_code'] ? data['serial_lot_code'].toLocaleString() : "");
      setSc(data['standard_cost'] ? data['standard_cost'].toLocaleString() : "");
      setBp(data['purchase_price'] ? data['purchase_price'].toLocaleString() : "");
      setSp(data['selling_price'] ? data['selling_price'].toLocaleString() : "");
    }
  }, [data]);

  return (
    <>
      <ModalHeader>
        <h5>단가 상세정보</h5>
      </ModalHeader>
      <ModalBody>
        <div className="row">
          <section className="col-md">
            <h6 className="sub-title">품목 정보</h6>
            <br />
            <div className="sy-read-row">
              <div className="">Serial/Lot No</div>
              <div id="sy-read-modal-sl" className="sy-read-right">{sl}</div>
            </div>
            <div className="sy-read-row">
              <div className="">품목명</div>
              <div id="sy-read-modal-in" className="sy-read-right">{data['item_name']}</div>
            </div>
            <br /> <br /> <br />
            <h6 className="sub-title">첨부파일</h6>
            <br />
            {file && 
            <div id="sy-file-container">
              <div className="thumbnail" id="sy-file-thumbnail">
                <img src={file} 
                  style={{
                    width: '30px',
                    height: '70px'
                  }}
                />
              </div>
              <div className="thumbnail" id="sy-file-filename">
                <label>{fileName}</label>
              </div>
              <div id="sy-file-dBtn-container">
                <a
                  onClick={() => {onDownload(downloadLink)}}
                  id="sy-file-btn"
                  className="btn btn-outline-secondary me-2 btn-xs "
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
</svg>
                  <label>다운로드</label>
                </a>
              </div>
            </div>
            }
          </section>
          <section className="col-md">
            <h6 className="sub-title">금액 정보</h6>
            <br />
            <div className="sy-read-row">
              <div className="">표준원가</div>
              <div id="sy-read-modal-op" className="sy-read-right">{sc}</div>
            </div>
            <div className="sy-read-row">
              <div className="">구매단가</div>
              <div id="sy-read-modal-bp" className="sy-read-right">{bp}</div>
            </div>
            <div className="sy-read-row">
              <div className="">판매단가</div>
              <div id="sy-read-modal-sp" className="sy-read-right">{sp}</div>
            </div>
          </section>
        </div>
      </ModalBody>
      <ModalFooter>
      </ModalFooter>
    </>
  );
};

export default DetailModal;

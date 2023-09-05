import { Link } from "react-router-dom/cjs/react-router-dom.min";

import readExcel from '../../utils/readExcel';

import PageCard from "../../components/page/PageCard";
import PageHeader from "../../components/page/PageHeader";
import PageTitle from "../../components/page/PageTitle";
import RegisterPanel from "./components/RegisterPanel";
import Table from '../../components/table/Table';
import Button from "../../components/button/Button";
import ModalMain from "../../components/modal/ModalMain";
import ModalHeader from "../../components/modal/ModalHeader";
import ModalBody from "../../components/modal/ModalBody";

const RegisterPage = () => {

  //엑셀 가져오기 버튼 이벤트
  const handleExcelFileChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    readExcel(file);
  };

  const tableHead = [
    { 
      key: 'no',
      title: '#'
    },
    { 
      key: 'item_code',
      title: '품목명',
    },
    { 
      key: 'item_code',
      title: '품목구분'
    },
    { 
      key: 'item_code',
      title: '소분류',
    },
    { 
      key: 'item_code',
      title: '대분류'
    },
    { 
      key: 'item_code',
      title: '규격',
    },
    { 
      key: 'item_code',
      title: '안전재고량'
    },
    { 
      key: 'item_code',
      title: '구매처명'
    },
  ]

  const tableBody = [
  ]

  return (
    <PageCard>
      <PageHeader>
        <PageTitle value="품목 등록"/>
        <div style={{ marginRight: "10px", display: "flex", gap: "8px"}}>
          <Link to="/items" className="btn btn-dark">품목 조회</Link>
        </div>
      </PageHeader>
      <RegisterPanel />
      <hr/>
      <Button dataBsToggle={"modal"} dataBsTarget={"#basicModal"} buttonName="엑셀 등록" buttonClass="btn-dark"/>
      <Table thead={tableHead} tbody={tableBody}/>

      <ModalMain>
          <ModalHeader>
            <h5 className="modal-title" id="exampleModalLabel1">엑셀 등록</h5>
          </ModalHeader>
          <ModalBody>
            <div style={{ display: "flex", flexDirection: "column", rowGap: "10px"}}>
              <Button buttonClass={"btn-secondary w-100"} buttonName={"엑셀 양식 다운로드"} />
              {/* <Button buttonClass={"btn-secondary w-100"} buttonName={"엑셀 가져오기"} /> */}
              <label className="btn btn-secondary" htmlFor="inputGroupFile04">엑셀 가져오기</label>
              <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"
                onChange={handleExcelFileChange} style={{display: 'none'}}/>
            </div>
          </ModalBody>
      </ModalMain>
    </PageCard>
  )
}

export default RegisterPage;
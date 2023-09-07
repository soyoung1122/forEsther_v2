import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

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
  const history = useHistory();
  //form 데이터
  const [data, setData] =useState({
    item_name: '',
    item_classification: '품목구분',
    sub_category_name: '소분류',
    item_specification: '',
    safety_stock: '',
    procurement: '조달방법',
    supplier_name: '',
  });
  //분류 드롭다운 리스트 정보
  const [categoryInfo, setCategoryInfo] = useState({
    mainCategory: [],
    subCategory: []
  });
  const procurementInfo = [
    {
      idx: 1,
      value: '생산',
      name: '생산'
    },
    {
      idx: 2,
      value: '조달',
      name: '조달'
    }
  ]
  //모달창 유무
  const [isModalOpen, setIsModalOpen] = useState(false);
  //테이블 바디 데이터
  const [tableBody, setTableBody] = useState([]);

  //테이블 헤더 데이터
  const tableHead = [
    { 
      key: 'no',
      title: '#'
    },
    { 
      key: 'item_name',
      title: '품목명',
    },
    { 
      key: 'item_classification',
      title: '품목구분'
    },
    { 
      key: 'sub_category_name',
      title: '소분류',
    },
    { 
      key: 'item_specification',
      title: '규격',
    },
    { 
      key: 'safety_stock',
      title: '안전재고량'
    },
    { 
      key: 'procurement',
      title: '조달방법'
    },
    { 
      key: 'supplier_name',
      title: '구매처명'
    },
  ]

  //품목 분류 데이터 요청
  useEffect(()=> {
    const getCategory = async () => {
      const resCat = await axios.get('/items/category');

      //드롭다운 컴포넌트에 맞춰 데이터 가공
      const mainArr= [];
      const subArr = [];

      resCat.data.mainCategory.forEach(item => {
        mainArr.push({ idx: item.main_category_code, name: item.main_category_name, value:  item.main_category_name });
      })
      resCat.data.subCategory.forEach(item => {
        subArr.push({ idx: item.sub_category_code, name: item.sub_category_name, value:  item.sub_category_code });
      })

      setCategoryInfo({ mainCategory: mainArr, subCategory: subArr});
    };
    getCategory();
  }, [])

  //엑셀 가져오기 버튼 이벤트
  const handleExcelFileChange = async (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const list = await readExcel(file);

    //테이블 바디 데이터 가공
    const fileData = [];
    list.forEach(item => {
      fileData.push({
        item_name: item.품목명,
        item_classification: item.품목구분,
        sub_category_name: item.소분류,
        item_specification: item.규격,
        safety_stock: item.안전재고량,
        procurement: item.조달방법,
        supplier_name: item.구매처명
      })
    })

    setIsModalOpen(false);
    setTableBody([...tableBody, ...fileData]);

    const backdropElement = document.querySelector(".modal-backdrop");
    if (backdropElement) {
      // .modal-backdrop 요소가 존재하는 경우에만 삭제
      document.body.removeChild(backdropElement);
    }
  };

  //등록 버튼 이벤트
  const submitForm = async (e) => {
    e.preventDefault();
    console.log(tableBody)
    const res = await axios.post('/items/register', tableBody);
    if(res.status == 200) {
      alert("품목 등록 완료!");
      history.push('/items');
    } else {
      alert("품목 등록 실패! 다시 등록해주세요")
    }
  }

  return (
    <PageCard style={{height: "100vh"}}>
      <PageHeader>
        <PageTitle value="품목 등록"/>
        <div style={{ display: "flex", gap: "8px"}}>
          <Link to="/items" className="btn btn-outline-dark">목록 조회</Link>
          <Button buttonName="등록하기" buttonClass="btn-dark" onClick={submitForm}/>
        </div>
      </PageHeader>

      <RegisterPanel 
        data={data} 
        setData={setData}
        categoryInfo={categoryInfo}
        procurementInfo={procurementInfo}
        tableBody={tableBody}
        setTableBody={setTableBody}
        />
      <hr/>

      <div style={{marginBottom: "10px", display: "flex", justifyContent: "space-between"}}>
        <span style={{ display: "flex", alignItems: "end", fontWeight: 'bold'}}>총 {20}건</span>
        <Button dataBsToggle={"modal"} dataBsTarget={"#basicModal"} buttonName="엑셀 업로드" buttonClass="btn-secondary" onClick={()=> setIsModalOpen(true)}/>
      </div>
      <Table thead={tableHead} tbody={tableBody == undefined? [] : tableBody}/>

      <ModalMain show={isModalOpen} onHide={()=> setIsModalOpen(false)}>
          <ModalHeader>
            <h5 className="modal-title" id="exampleModalLabel1">엑셀 업로드</h5>
          </ModalHeader>
          <ModalBody>
            <div style={{ display: "flex", flexDirection: "column", rowGap: "10px"}}>
              <Button buttonClass={"btn-secondary w-100"} buttonName={"엑셀 양식 다운로드"} />
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

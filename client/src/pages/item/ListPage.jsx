import { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

import readExcel from '../../utils/readExcel';

import PageCard from "../../components/page/PageCard";
import PageHeader from "../../components/page/PageHeader";
import PageTitle from "../../components/page/PageTitle";
import Table from "../../components/table/Table";
import SearchPanel from "./components/SearchPanel";
import Button from "../../components/button/Button";
import ModalMain from "../../components/modal/ModalMain";
import ModalHeader from "../../components/modal/ModalHeader";
import ModalBody from "../../components/modal/ModalBody";


const ListPage = () => {
  const [data, setData] = useState([]);
  const [tableBody, setTableBody] = useState([]);
  const [searchData, setSearchData] = useState({
    itemClassification: '품목구분',
    subCategory: '소분류',
    mainCategory: '대분류',
    itemName: '',
    supplierName: ''
  })

  //서버 데이터 요청
  useEffect(()=> {
    const getDate = async () => {
      const res = await axios.get('item/data');
      setData(res.data);
    }
    getDate();
  }, [])

  //테이블 데이터 가공
  useEffect(()=> {
    const dataList = [];
    let supplierList = [];

    for(let i=0; i<data.length; i++) {
      const {item_code, item_name, item_classification, item_specification, itemsupplier_vo  } = data[i];

      for(let i=0; i<itemsupplier_vo.length; i++) {
        if(itemsupplier_vo[i].supplier_vo !== null) {
          supplierList.push({
            name:  itemsupplier_vo[i].supplier_vo.supplier_name,
            color: "default"
          })
        }
      }

      const newData = {item_code, item_name, item_classification, item_specification, supplier_name: supplierList};
      dataList.push(newData);
      supplierList = []; //리셋
    };

    setTableBody([...dataList]);
  }, [data])

  const tableHead = [
    { 
      key: 'no',
      title: '#'
    },
    { 
      key: 'item_code',
      title: '품목코드',
      data: {
        link: {
          origin: "/item",
          id: "item_code"
        }
      }
    },
    { 
      key: 'item_name',
      title: '품목명'
    },
    { 
      key: 'item_classification',
      title: '품목구분'
    },
    {
      key: 'item_specification',
      title: '규격'
    },
    {
      key: 'supplier_name',
      title: '구매처명',
      isArray: true,
      isBadge: true,
      data: {
        key: "name"
      }
    }
  ]

  //엑셀 가져오기 버튼 이벤트
  const handleExcelFileChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    readExcel(file);
  };

  //품목구분 드롭다운 
  const clickItemClassificationBtn = (e) => {
    console.log(e.target.textContent)
    setSearchData({...searchData, itemClassification: e.target.textContent})
  }

  return (
    <PageCard>
      <PageHeader>
        <PageTitle value="품목관리"/>
        <div style={{ marginRight: "10px", display: "flex", gap: "8px"}}>
          <Button dataBsToggle={"modal"} dataBsTarget={"#basicModal"} buttonName="엑셀 등록" buttonClass="btn-dark"/>
          <Link to="/item/register" className="btn btn-dark">신규 등록</Link>
        </div>
        {/* <div className="d-flex">
        
          <div style={{ marginRight: "10px"}}>
           
            <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
              엑셀 등록
            </button>
       
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">엑셀 등록</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <Button type={'button'} value={'엑셀 양식 다운로드'} className={'btn-secondary'}/>
                    <div class="input-group">
                      <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"
                        onChange={handleExcelFileChange}/>
                      <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">등록</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </div> */}
      </PageHeader>
        <SearchPanel 
          searchData={searchData}
          clickItemClassificationBtn={clickItemClassificationBtn}/>
        <div >
          <span style={{ fontWeight: 'bold'}}>총 20건</span>
        </div>
        <Table thead={tableHead} tbody={tableBody}/>
        {/* 모달창 */}
        <ModalMain>
          <ModalHeader>
            <h5 className="modal-title" id="exampleModalLabel1">엑셀 등록</h5>
          </ModalHeader>
          <ModalBody >
            <div>
            <Button buttonClass={"btn-secondary w-100"} buttonName={"엑셀 양식 다운로드"} />
            <Button buttonClass={"btn-secondary w-100"} buttonName={"엑셀 양식 다운로드"} />
            </div>
            <div class="input-group">
              <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"
                onChange={handleExcelFileChange}/>
              <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">등록</button>
            </div>
          </ModalBody>
      </ModalMain>
    </PageCard>
  )
}

export default ListPage;
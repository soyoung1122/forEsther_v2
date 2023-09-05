import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import Label from "../../components/form/Label";


const ListPage = () => {
  const [data, setData] = useState([]);
  const [tableBody, setTableBody] = useState([]);
  const [searchData, setSearchData] = useState({
    item_classification: '품목구분',
    sub_category_name: '소분류',
    main_category_name: '대분류',
    item_name: '',
    supplier_name: ''
  })

  //서버 데이터 요청
  useEffect(()=> {
    const getDate = async () => {
      const res = await axios.get('/items');
      setData(res.data);
    }
    getDate();
  }, [])

  //테이블 바디 데이터 가공
  useEffect(()=> {
    const dataList = [];
    let supplierList = [];

    for(let i=0; i<data.length; i++) {
      let itemClassification = {
        name: '',
        color: ''
      }
  
      const {item_code, item_name, item_classification, item_specification, itemSupplier_vo, subCategory_vo  } = data[i];

      for(let i=0; i<itemSupplier_vo.length; i++) {
        if(itemSupplier_vo[i].supplier_vo !== null) {
          supplierList.push({
            name:  itemSupplier_vo[i].supplier_vo.supplier_name,
            color: "default"
          })
        }
      }

      itemClassification.name = item_classification;
      switch(item_classification) {
        case "원재료":
          itemClassification.color = 'red';
          break;
        case "제품":
          itemClassification.color = 'blue';
          break;
        case "상품":
          itemClassification.color = 'purple';
          break;
        default:
          break;
      }

      const newData = {
        item_code, 
        item_name, 
        item_classificationsss: itemClassification,
        item_specification, 
        sub_category_name: subCategory_vo[0].sub_category_name,
        main_category_name: subCategory_vo[0].mainCategory_vo.main_category_name,
        supplier_name: supplierList,
        btn: [
          {
            text: "수정", 
            onClick: (e) => {
              console.log(e.target.value)
            }
          },
          {
            text: "삭제", 
            onClick: (e) => {
              console.log("삭제")
            }
          },
          {
            text: "복사", 
            onClick: (e) => {
              console.log("복사")
            }
          },
        ]
      };

      dataList.push(newData);
      supplierList = []; //리셋
    };

    setTableBody([...dataList]);
  }, [data])

  //테이블 헤더 데이터
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
          origin: "/items",
          id: "item_code"
        }
      }
    },
    { 
      key: 'item_name',
      title: '품목명'
    },
    { 
      key: 'item_classificationsss',
      title: '품목구분',
      isBadge: true,
      data: {
        key: "name"
      }
    },
    {
      key: 'item_specification',
      title: '규격'
    },
    {
      key: 'sub_category_name',
      title: '소분류명'
    },
    {
      key: 'main_category_name',
      title: '대분류명'
    },
    {
      key: 'supplier_name',
      title: '구매처명',
      isArray: true,
      isBadge: true,
      data: {
        key: "name"
      }
    },
    {
      key: "btn",
      title: " ",
      data: {
        btnVal: 'item_code'
      }
    }
  ]

  //엑셀 가져오기 버튼 이벤트
  const handleExcelFileChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    readExcel(file);
  };

  //품목구분 드롭다운 이벤트
  const clickItemClassificationBtn = (e) => {
    setSearchData({...searchData, item_classification: e.target.textContent})
  }

  //소분류 드롭다운 이벤트
  const clicksubCategoryBtn = (e) => {
    setSearchData({...searchData, sub_category_name: e.target.textContent})
  }

  //대분류 드롭다운 이벤트
  const clickmainCategoryBtn = (e) => {
    setSearchData({...searchData, main_category_name: e.target.textContent})
  }

  //품목명 이벤트 
  const changeItemName = (e) => {
    setSearchData({...searchData, item_name: e.currentTarget.value})
  }

  //구매처명 이벤트
  const changeSupplierName = (e) => {
    setSearchData({...searchData, supplier_name: e.currentTarget.value})
  }

  //초기화 버튼 이벤트
  const clickResetBtn = (e) => {
    const newData = {...searchData};

    newData.item_classification = '품목구분';
    newData.main_category_name = '대분류';
    newData.sub_category_name = '소분류';
    newData.item_name = '';
    newData.supplier_name = '';

    setSearchData(newData);

  }

  //검색 버튼 이벤트
  const clickSearchBtn = async (e) => {
    e.preventDefault();
    const newData = {...searchData};

    if(newData.item_classification == '품목구분') {
      newData.item_classification = '';
    }

    if(newData.main_category_name == '대분류') {
      newData.main_category_name = '';
    }

    if(newData.sub_category_name == '소분류') {
      newData.sub_category_name = '';
    }

    const res = await axios.post(`/items/search`, newData);
    setData(res.data);
  }

  return (
    <PageCard>
      <PageHeader>
        <PageTitle value="품목 조회"/>
        <div style={{ marginRight: "10px", display: "flex", gap: "8px"}}>
          {/* <Button dataBsToggle={"modal"} dataBsTarget={"#basicModal"} buttonName="엑셀 등록" buttonClass="btn-dark"/> */}
          <Link to="/items/register" className="btn btn-dark">신규 등록</Link>
        </div>
      </PageHeader>
        <SearchPanel 
          searchData={searchData}
          clickItemClassificationBtn={clickItemClassificationBtn}
          clicksubCategoryBtn={clicksubCategoryBtn}
          clickmainCategoryBtn={clickmainCategoryBtn}
          changeItemName={changeItemName}
          changeSupplierName={changeSupplierName}
          clickSearchBtn={clickSearchBtn}
          clickResetBtn={clickResetBtn}
          />
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

export default ListPage;
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import PageCard from "../../components/page/PageCard";
import PageHeader from "../../components/page/PageHeader";
import PageTitle from "../../components/page/PageTitle";
import Table from "../../components/table/Table";
import SearchPanel from "./components/SearchPanel";

const ListPage = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [tableBody, setTableBody] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState({
    mainCategory: [],
    subCategory: []
  });
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
      //품목 데이터 요청
      const resItem = await axios.get('/items');
      setData(resItem.data);

      //품목 분류 데이터 요청
      const resCat = await axios.get('/items/category');

      //드롭다운 컴포넌트에 맞춰 데이터 가공
      const mainArr= [];
      const subArr = [];
      resCat.data.mainCategory.forEach(item => {
        mainArr.push({ idx: item.main_category_code, name: item.main_category_name, value:  item.main_category_name });
      })
      resCat.data.subCategory.forEach(item => {
        subArr.push({ idx: item.sub_category_code, name: item.sub_category_name, value:  item.sub_category_name });
      })

      setCategoryInfo({ mainCategory: mainArr, subCategory: subArr});
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
  
      const {item_code, item_name, item_classification, item_specification, itemSupplier_vo, procurement, subCategory_vo, safety_stock  } = data[i];

      console.log(procurement)
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
        sub_category_name: subCategory_vo[0].sub_category_name,
        main_category_name: subCategory_vo[0].mainCategory_vo.main_category_name,
        item_specification, 
        safety_stock,
        procurement,
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
              if(window.confirm('품목을 복사하시겠습니까?')) {
                history.push(`/items/register?copyId=${e.target.value}`);
              } else {
                return;
              }
              
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
      key: 'sub_category_name',
      title: '소분류명'
    },
    {
      key: 'main_category_name',
      title: '대분류명'
    },
    {
      key: 'item_specification',
      title: '규격'
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
    console.log(searchData)
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
    clickResetBtn(); //초기화
  }

  return (
    <PageCard>
      <PageHeader>
        <PageTitle value="품목 조회"/>
        <div style={{display: "flex", gap: "8px"}}>
          <Link to="/items/register" className="btn btn-dark">신규 등록</Link>
        </div>
      </PageHeader>
        <SearchPanel 
          categoryInfo={categoryInfo}
          searchData={searchData}
          clickItemClassificationBtn={clickItemClassificationBtn}
          clicksubCategoryBtn={clicksubCategoryBtn}
          clickmainCategoryBtn={clickmainCategoryBtn}
          changeItemName={changeItemName}
          changeSupplierName={changeSupplierName}
          clickSearchBtn={clickSearchBtn}
          clickResetBtn={clickResetBtn}
          />
        <div style={{marginBottom: "10px"}}>
          <span style={{ fontWeight: 'bold'}}>총 {data.length}건</span>
        </div>
        <Table thead={tableHead} tbody={tableBody}/>
        
    </PageCard>
  )
}

export default ListPage;
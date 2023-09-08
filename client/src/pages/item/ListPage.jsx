import { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";

import PageCard from "../../components/page/PageCard";
import PageHeader from "../../components/page/PageHeader";
import PageTitle from "../../components/page/PageTitle";
import Table from "../../components/table/Table";
import SearchPanel from "./components/SearchPanel";
import Pagination from "../../components/pagination/Pagination";

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

  //현재페이지를 url에 저장하기 위해
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageParam = params.get('page');

  //현재 페이지 
  const [currentPage, setCurrentPage] = useState(1);
  //총 포스트 수
  const [numberOfData, setNumberOfData] = useState(0);
  //총 페이지 수
  const [numberOfPages, setNumberOfPages] = useState(0);
  //한 페이지에 몇개씩 글이 보일 것인지
  const limit = 10;
  //현재 페이지의 인덱스 시작 숫자
  const [startIndex, setStartIndex] = useState(1);

  useEffect(() => {
    //무조건 반올림 => 5개씩 출력 될때 14개면 3페이지가 출력 되어야 함
    setNumberOfPages(Math.ceil(numberOfData/limit));
  }, [numberOfData]);
  //글갯수에 따라 페이지 수가 변경되기 때문에 의존성 배열에 포스트 수를 넣음

  //뒤로가기 했을 때 이전 페이지로 돌아가는게 아닌 다른페이지로 이동하는 문제 해결을 위해
  const onClickPageButton = (page) => {
    // history.push(`/admin?page=${page}`);
    //Blogs에서 다른 페이지 이동할 때 Admin의 페이지로 이동하는거 해결하기
    history.push(`${location.pathname}?page=${page}`);
    getData(page);

    //페이지 버튼 눌러도 색이 안바뀌어서 넣어 줌
    setCurrentPage(page);
  }


  const getData = async (page = 1) => {
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

    // const res = await axios.post(`/items/search`, newData);
    // setData(res.data);
    // clickResetBtn(); //초기화




    //품목 데이터 요청
    const resItem = await axios.post('/items/search', newData);
    setNumberOfData(resItem.data.length);
    
    const offset = (page-1)*limit;
    setStartIndex(offset+1);
    const sliceData = () => {
      if(resItem){
        let result = resItem.data.slice(offset, offset + limit);
        return result;
      }
    }
    setData(sliceData());
    

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
  //서버 데이터 요청
  useEffect(()=> {
    //넘어온 페이지 값으로 currentPage 값 적용
    setCurrentPage(parseInt(pageParam) || 1);

    //함수 호출해서 불러오기
    //리렌더링을 통해 현재 페이지 출력
    //pageParam은 string이기 때문에 int로 캐스팅을 해줘야 함
    //페이지 번호가 없다면 default로 1
    getData(parseInt(pageParam) || 1);

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

      const no = startIndex + i;
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
        ],
        no
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
    getData(1);
    // clickResetBtn(); //초기화
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
          <span style={{ fontWeight: 'bold'}}>총 {numberOfData}건</span>
        </div>
        <Table thead={tableHead} tbody={tableBody}/>
        {/* 페이지가 1개밖에 없을 때 페이지 버튼 안보이기 */}
        {numberOfPages > 1 && <Pagination 
                      currentPage={currentPage} 
                      numberOfPages={numberOfPages} 
                      //onClick={getPosts}    
                      onClick={onClickPageButton}    
                  /> 
              }
    </PageCard>
  )
}

export default ListPage;
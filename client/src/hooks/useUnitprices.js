import { useEffect, useState} from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import axios from "../utils/axios";

const useUnitprices = ({changeModal}) => {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  //현재페이지를 url에 저장하기 위해
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageParam = params.get('page');

  const history = useHistory();
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
    getUnitprices(page);

    //페이지 버튼 눌러도 색이 안바뀌어서 넣어 줌
    setCurrentPage(page);
  }

  useEffect(() => {
    //넘어온 페이지 값으로 currentPage 값 적용
    setCurrentPage(parseInt(pageParam) || 1);

    //함수 호출해서 불러오기
    //리렌더링을 통해 현재 페이지 출력
    //pageParam은 string이기 때문에 int로 캐스팅을 해줘야 함
    //페이지 번호가 없다면 default로 1
    getUnitprices(parseInt(pageParam) || 1);
  }, []);

  const deleteUnitprice = (id) => {
    axios.delete(`unitprices/${id}`).then((res) => {
      getUnitprices();
    });
  };

  const updateUnitprice = (id) => {
    axios.put(`unitprices/${id}`).then((res) => {
      getUnitprices();
    });
  };

  const getUnitprice = (id) => {
    axios.get(`unitprices/${id}`).then((res) => {
      console.log(res);
    });
  };

  const getUnitprices = (page = 1) => {
    axios.get("unitprices").then((res) => {
       //총 글 갯수
      // setNumberOfData(res.headers['x-total-count']);
      setNumberOfData(res.data.length);
      //서버로 부터 넘어온 값은 파라미터로 가져옴 res
      const offset = (page-1)*limit;
      setStartIndex(offset+1);
      const sliceData = () => {
        if(res.data){
          let result = res.data.slice(offset, offset + limit);
          return result;
        }
      }
      setData(sliceData());
    });
  };

  const onSLClick = async (e) => {
    e.preventDefault();
    const res = await axios(e.target.getAttribute("href"));
    changeModal("detail");
  }

  const onIClick = async (e) => {
    e.preventDefault();
    const res = await axios(e.target.getAttribute("href")+"chart");
    changeModal("chart");
  }


  const head = [
    {
      key: "no",
      title: "#",
    },
    {
      key: "serial_lot_code", //필수
      title: "Serial/Lot No", //필수
      isModal: true,
      data: {
        link: {
          origin: "unitprices",
          id: "item_code"
        },
        onClick: onSLClick,
      },
    },
    {
      key: "item_code",
      title: "품목코드",
      isModal: true,
      data: {
        link: {
          origin: "unitprices",
          id: "item_code",
        },
        onClick: onIClick
      }
    },
    {
      key: "item_name",
      title: "품목명",
      data: {
        class: ["b", "bc"],
        onClick: {},
      },
    },
    {
      key: "standard_cost",
      title: "표준원가",
      isCurrency: true,
    },
    {
      key: "purchase_price",
      title: "구매단가",
      isCurrency: true,
    },
    {
      key: "selling_price",
      title: "판매단가",
      isCurrency: true,
    },
    {
      key: "btn",
      title: " ",
      data: {
        btnVal : "item_code"
      }
    }
  ];

  const searchLabel = [
    {
      "name" : "품목명",
      "value" : "N"
    },
    {
      "name" : "품목코드",
      "value" : "C"
    },
    {
      "name" : "S/L",
      "value" : "S"
    }
  ];


  
  const btn = [
    {
      text: "수정", 
      onClick: (e) => {
        console.log(e.target.value);
      }
    },
    {
      text: "삭제", 
      onClick: (e) => {
        console.log(e.target.value);
      }
    },
  ];

  
  useEffect(() => {
    const newList = [];

    data.map((data, i) => {
      const serialLotVO = data['serialLot'];
      const no = startIndex+i;
      const tempData = {...data, 
        'item_code': serialLotVO['item_code'], 
        "btn" : btn,
        "no": no
      }
      newList.push(tempData);
    })

    setList([...newList])
  },[data])
  // const addData = (prevList) => {
  //   const newList = [];

  //   prevList.map((data, i) => {
  //     const serialLotVO = data['serialLot'];
  //     const no = startIndex+i;
  //     const tempData = {...data, 
  //       'item_code': serialLotVO['item_code'], 
  //       "btn" : btn,
  //       "no": no
  //     }
  //     newList.push(tempData);
  //   })

  //   setList([...newList])
  // };
  
  


  return {
    head,
    list,
    searchLabel,
    currentPage,
    numberOfPages,
    numberOfData,
    //selectedVal,
    deleteUnitprice,
    updateUnitprice,
    //onLabelClick
    onClickPageButton,
  };
};

export default useUnitprices;

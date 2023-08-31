import { useEffect, useState } from "react";
import axios from "../utils/axios";

const useUnitprices = () => {
  const [list, setList] = useState([]);

  const head = [
    {
      key: "no",
      title: "#",
      data: {
        class: ["a", "ab", "ccc"],
      },
    },
    {
      key: "serial_lot_code", //필수
      title: "Serial/Lot No", //필수
      currency: false, //선택
      class: [], //선택
      isToggle: true,
      data: {
        //선택
        class: ["b", "bc"],
        link: {
          origin: "/unitprices",
          id: "item_code",
        },
        onClick: {},
      },
    },
    {
      key: "item_code",
      title: "품목코드",
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
      key: "test",
      title: "test",
      isArray: true,
      isBadge: true,
      data: {
        key: "name"
      }
    },
    {
      key: "test2",
      title: "test2",
      isBadge: true,
      data: {
        key: "test2"
      }
    },
    {
      key: "btn",
      title: " "
    }
  ];

  const test = [
    {name: "세진나라", "color" : "red"},
    {name: "세진킹덤", "color" : "purple"},
    {name: "(주)세진", "color" : "green"},
  ];

  const test2 = {"test2" : "testtest", "color" : "purple"};
  
  const btn = [
    {
      text: "수정", 
      onClick: (e) => {
        console.log("수정")
        console.log(e)
      }
    },
    {
      text: "삭제", 
      onClick: (e) => {
        console.log("삭제")
        console.log(e)
      }
    },
  ];

  useEffect(() => {
    getUnitprices();
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

  const getUnitprices = () => {
    axios.get("unitprices").then((res) => {
      addData(res.data);
    });
  };

  const addData = (prevList) => {
    const newList = [];

    prevList.map((data) => {
      const serialLotVO = data['serialLotVO'];
      const tempData = {...data, 
        'item_code': serialLotVO['item_code'], 
        'test': test, 
        "test2" : test2,
        "btn" : btn
      }
      newList.push(tempData);
    })

    setList([...newList])
  };

  return {
    head,
    list,
    deleteUnitprice,
    updateUnitprice
  };
};

export default useUnitprices;

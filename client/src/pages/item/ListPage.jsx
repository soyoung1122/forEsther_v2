import { useState, useEffect } from "react";
import axios from "axios";
import PageCard from "../../components/page/PageCard";
import PageHeader from "../../components/page/PageHeader";
import PageTitle from "../../components/page/PageTitle";
import Table from "../../components/table/Table";
import SearchPanel from "../../components/searchPanel/SearchPanel";

const ListPage = () => {
  const [data, setData] = useState([]);
  const [tableBody, setTableBody] = useState([]);

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
          supplierList.push({name:  itemsupplier_vo[i].supplier_vo.supplier_name})
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
      data: {
        key: "name"
      }
    }
  ]

  return (
    <PageCard>
      <PageHeader>
        <PageTitle value="품목관리"/>
      </PageHeader>
        <SearchPanel />
        <Table thead={tableHead} tbody={tableBody}/>
    </PageCard>
  )
}

export default ListPage;
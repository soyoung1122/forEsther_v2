import { useState, useEffect } from "react";
import axios from "axios";
import PageCard from "../../components/page/PageCard";
import PageHeader from "../../components/page/PageHeader";
import PageTitle from "../../components/page/PageTitle";
import Table from "../../components/table/Table";
import Pagination from "../../components/pagination/Pagination";
import Button from "../../components/button/Button";
import ModalMain from "../../components/modal/ModalMain";
import ModalHeader from "../../components/modal/ModalHeader";
import ModalBody from "../../components/modal/ModalBody";
import ModalFooter from "../../components/modal/ModalFooter";

const ListPage = () => {
  const [data, setData] = useState([]);
  const [tableBody, setTableBody] = useState([]);

  //서버 데이터 요청
  useEffect(()=> {
    const getDate = async () => {
      const res = await axios.get('bom/data');
      setData(res.data);
    }
    getDate();
  }, [])

  //테이블 데이터 가공
  useEffect(()=> {
    const arr = [];
    for(let i=0; i<data.length; i++) {
      // const {item_code, item_name, item_classification, item_specification, itemsupplier_vo  } = data[i];
      // let company = (itemsupplier_vo[0].supplier_vo !== null) ? (itemsupplier_vo[0].supplier_vo.supplier_name) : '';
      // const newData = {item_code, item_name, item_classification, item_specification, supplier_name: company};
      
      const {bom_code, product_name, item_code, item_name, bom_register_vo } = data[i];
      const newData = {bom_code, product_name, item_code, item_name, bom_register_vo};
      console.log(bom_register_vo);
      arr.push(newData);
    };
    setTableBody([...arr]);
  }, [data])
 
  const tableHead = [
    { 
      key: 'no',
      title: '#'
    },
    { 
      key: 'bom_code',
      title: 'BOM코드',
      data: {
        link: {
          origin: "/boms",
          id: "bom_code"
        }
      }
    },
    { 
      key: 'bom_code',
      title: '모품목코드'
    },
    { 
      key: 'product_name',
      title: '모품목명'
    },
    {
      key: 'b',
      title: '구성품목'
    },
    {
      key: '',
      title: ''
    }
  ]

  return (
    <PageCard>
      <PageHeader>
        <PageTitle value="BOM관리"/>
        <Button dataBsToggle={"modal"} dataBsTarget={"#basicModal"} buttonName="신규등록" />
      </PageHeader>
      <ModalMain>
        <ModalHeader>
        <h5 className="modal-title" id="exampleModalLabel1">BOM 신규 작성</h5>
        </ModalHeader>
        <ModalBody>
          <div className="row g-2">
            <div className="col mb-0">
              <div className="input-group input-group-merge">
                <span className="input-group-text" id="basic-addon-search31"><i className="bx bx-search"></i></span>
                <input 
                  type="text" 
                  className="form-control" 
                  id="item_name_input"  
                  placeholder="품목명 검색..." 
                  aria-label="Search..." 
                  aria-describedby="basic-addon-search31"
                />
              </div>
              <br/>
              <label for="item_name" class="form-label">모품목 선택</label>
              <select class="form-select" id="item_name" aria-label="모품목을 선택해 주세요">
 
              </select>
            </div>
          </div>
          <br/>
          <div class="row g-2">
            <div class="col mb-0">
              <label for="product_name" class="form-label">제품명</label>
              <input type="text" id="product_name" class="form-control" placeholder="BOM 등록할 제품명을 등록하세요." />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button buttonClass={"btn-label-secondary"} dataBsDismiss={"modal"} buttonName={"취소"} />
          <Button ButtonId={"btnRegister"} buttonName={"BOM 등록"} />
        </ModalFooter>
      </ModalMain>
      <Table thead={tableHead} tbody={tableBody}/>
      <Pagination />
    </PageCard>
  )
}

export default ListPage;
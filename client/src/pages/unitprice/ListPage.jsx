
import ModalMain from "../../components/modal/ModalMain";
import ModalHeader from "../../components/modal/ModalHeader";
import ModalBody from "../../components/modal/ModalBody";
import PageCard from "../../components/page/PageCard";
import PageHeader from "../../components/page/PageHeader";
import PageTitle from "../../components/page/PageTitle";
import SearchInput from "../../components/search/SearchInput";
import Table from "../../components/table/Table";
import Dropdwon from "../../components/form/Dropdown";
import Pagination from "../../components/pagination/Pagination";

import useUnitprices from "../../hooks/useUnitprices";

import { useState } from "react";
import { Link } from "react-router-dom";



const ListPage = () => {
  const [modalSet, setModalSet] = useState("");
  const changeModal = (set) => {
    setModalSet(set);
  }
  const { head, list, searchLabel, currentPage, numberOfPages, numberOfData, onClickPageButton } = useUnitprices({changeModal});
  const [selectedVal ,setSelectedVal] = useState("품목명");


  const onLabelClick = (e) => {
    setSelectedVal(e.target.textContent);
  }



  return (
    <PageCard>
      <PageHeader>
        <PageTitle value="단가관리" />
        <Link to="/unitprices/register" className="btn btn-dark">신규 등록</Link>
      </PageHeader>
      <div style={{
        display: "flex",
        justifyContent: "flex-end"
      }}>
        <div style={{
          marginRight: "5px",
          width: "130px"
        }}>
          <Dropdwon 
            initValue={selectedVal}
            list={searchLabel}
            onClick={onLabelClick}
          />
        </div>
        <div>
          <SearchInput />
        </div>
      </div>
      <div style={{marginBottom: "10px"}}>
        <span style={{ fontWeight: 'bold'}}>총 {numberOfData}건</span>
      </div>
      <Table 
        thead={head} 
        tbody={list}
      /> 
        <ModalMain>
          <ModalHeader>
            { modalSet == "chart" 
              ? <h5>입고가 변동내역</h5>
              : <h5>단가 상세정보</h5>
            } 
          </ModalHeader>
          <ModalBody>
            
          </ModalBody>
        </ModalMain>
        {/* 페이지가 1개밖에 없을 때 페이지 버튼 안보이기 */}
        {numberOfPages > 1 && <Pagination 
                      currentPage={currentPage} 
                      numberOfPages={numberOfPages} 
                      //onClick={getPosts}    
                      onClick={onClickPageButton}    
                  /> 
              }
    </PageCard>
  );
};

export default ListPage;

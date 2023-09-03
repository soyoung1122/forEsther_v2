import PageCard from "../../components/page/PageCard";
import PageHeader from "../../components/page/PageHeader";
import PageTitle from "../../components/page/PageTitle";
import SearchInput from "../../components/search/SearchInput";
import Table from "../../components/table/Table";
import Dropdwon from "../../components/form/Dropdown";

import useUnitprices from "../../hooks/useUnitprices";
import ModalMain from "../../components/modal/ModalMain";

const ListPage = () => {
  const { head, list, searchLabel, onLabelClick } = useUnitprices();


  return (
    <PageCard>
      <PageHeader>
        <PageTitle value="단가관리" />
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
            initValue={"품목명"}
            list={searchLabel}
            onCLick={onLabelClick}
            
          />
        </div>
        <div>
          <SearchInput />
        </div>
      </div>
      <Table 
        thead={head} 
        tbody={list}
      />
      <ModalMain>
        
      </ModalMain>
    </PageCard>
  );
};

export default ListPage;

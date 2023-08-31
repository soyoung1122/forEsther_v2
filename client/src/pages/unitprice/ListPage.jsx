import PageCard from "../../components/page/PageCard";
import PageHeader from "../../components/page/PageHeader";
import PageTitle from "../../components/page/PageTitle";
import SearchInput from "../../components/search/SearchInput";
import Table from "../../components/table/Table";

import useUnitprices from "../../hooks/useUnitprices";

const ListPage = () => {
  const { head, list } = useUnitprices();
  const cthead = [
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
    }]

  return (
    <PageCard>
      <PageHeader>
        <PageTitle value="단가관리" />
      </PageHeader>
      <SearchInput />
      <Table 
        thead={head} 
        tbody={list} 
        isChild={true}
        cthead={cthead}
      />
    </PageCard>
  );
};

export default ListPage;

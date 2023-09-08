
import ModalMain from "../../components/modal/ModalMain";
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
import DetailModal from "./components/DetailModal";
import ChartModal from "./components/ChartModal";

const ListPage = () => {
  const [modalSet, setModalSet] = useState("");
  const [detailData, setDetailData] = useState({});
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        borderColor: '#1565C0',
        backgroundColor: '#1A7FF2',
      },
    ],
  });
  const changeModal = (set) => {
    setModalSet(set);
  }

  const { head, list, searchLabel, currentPage, numberOfPages, numberOfData, onClickPageButton } = useUnitprices({changeModal});


  const handleDownload = async (link) => {
    try { 
      // 서버로 파일 다운로드 요청 보내기
      console.log(link)
      const response = await fetch(link);

      if (response.ok) {
        // 파일 다운로드 링크 생성
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '견적서.png'; // 다운로드될 파일 이름 설정
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('파일 다운로드 실패');
      }
    } catch (error) {
      console.error('파일 다운로드 오류:', error);
    }
  
}

  const setDetail = (data, file) => {
    setDetailData({...data});
    
    setDownloadLink(`/unitprices/${data["unit_price_code"]}/download`);
    setFileName(file.headers['file-name']);

    const binary = atob(file.data); // Base64 문자열을 바이너리 데이터로 변환

    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: 'image/png' });
    const blobUrl = URL.createObjectURL(blob);
    setFile(blobUrl);
  }

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
        <ModalMain modalClass={"modal-lg"}>
          { modalSet == "chart" 
            ? <ChartModal 
                chartData={chartData}
            />
            : <DetailModal 
                data={detailData}
                file={file}
                fileName={fileName}
                downloadLink={downloadLink}
                onDownload={handleDownload}
                />
          }
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

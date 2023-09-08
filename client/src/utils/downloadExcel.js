import { saveAs } from 'file-saver';
import * as ExcelJS from "exceljs";

const downloadExcel = async () => {
  //workbook(엑셀 파일 하나를 구성하는 여러 시트로 이루어진 단위) 생성
  const workbook = new ExcelJS.Workbook();
    //sheet 생성
    const worksheet = workbook.addWorksheet("item-list"); 
 
    //sheet 데이터 설정
    worksheet.columns = [
      { header: "품목명", width: 15 },
      { header: "품목구분", width: 15 },
      { header: "소분류", width: 15 },
      { header: "규격", width: 15 },
      { header: "안전재고량", width: 15 },
      { header: "조달방법", width: 15 },
      { header: "구매처명", width: 15 },
    ];

    //다운로드
    const mimeType = { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], mimeType);
    saveAs(blob, "품목등록파일.xlsx");
}

export default downloadExcel;
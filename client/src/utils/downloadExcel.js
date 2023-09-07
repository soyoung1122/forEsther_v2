import { saveAs } from 'file-saver';
import * as ExcelJS from "exceljs";

const downloadExcel = async () => {
  //workbook(엑셀 파일 하나를 구성하는 여러 시트로 이루어진 단위) 생성
  const workbook = new ExcelJS.Workbook();
    //sheet 생성
    const worksheet = workbook.addWorksheet("item-list"); 

    //TITLE
    worksheet.mergeCells('A1', 'G2');
    worksheet.getCell('A1').value = '** 품목 등록 파일 **';
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center'};


    worksheet.mergeCells('A3', 'G3');
    worksheet.getCell('A3').value = '[품목 데이터를 각 컬럼에 맞추어 입력해주세요]';
    worksheet.getCell('A3').alignment = { vertical: 'middle', horizontal: 'center'};

    //Column Header
    worksheet.getRow(5).values = ['품목명', '품목구분', '소분류', '규격', '안전재고량', '조달방법', '구매처명'];

    //다운로드
    const mimeType = { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], mimeType);
    saveAs(blob, "품목등록파일.xlsx");
}

export default downloadExcel;
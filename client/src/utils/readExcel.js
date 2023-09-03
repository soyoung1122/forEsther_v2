import * as XLSX from 'xlsx';

// Excel을 읽는 함수

const readExcel = async (file) => {
  //fileReader 객체 생성
  const fileReader = new FileReader();

  //readAsArrayBuffer()로 선택한 파일을 ArrayBuffer 형태로 읽기
  fileReader.readAsArrayBuffer(file);

  //onload 이벤트가 발생하면, arrayBuffer 데이터를 XLSX 라이브러리의 .read()함수에 전달하여 파일을 파싱하기
  fileReader.onload = (e) => {
    if (!e.target) return;
    const bufferArray = e.target.result;
    const fileInformation = XLSX.read(bufferArray, {
      type: 'buffer',
      cellText: false,
      cellDates: true,
    });

    //반환된 객체에서 sheetNames는 sheet 이름들의 배열
    const sheetName = fileInformation.SheetNames[0];
    const rawData = fileInformation.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(rawData);
    console.log(data);

    //data && setUploadedFileData(mappingDataToTable(data));
  };
};

export default readExcel;
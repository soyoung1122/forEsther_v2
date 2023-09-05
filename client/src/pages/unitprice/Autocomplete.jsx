import React, { useState, useEffect } from 'react';
import "../../styles/unitprices/Unitprice.css";

function Autocomplete({onClick}) {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (term.length < 2) {
      setIsOpen(false); // 검색어가 2자 이하일 때 드롭다운 닫기
      return;
    }

    // AJAX 요청 대신 비동기 함수를 호출하여 데이터를 가져옵니다.
    // 예를 들어, fetch 또는 axios를 사용하여 서버에서 데이터를 가져올 수 있습니다.
    // 아래 예제는 가짜 데이터를 사용한 예시입니다.
    const fetchData = async () => {
      try {
        const response = await fetch(`/unitprices/autocomplete?value=${term}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('오류가 발생했습니다.');
        }

        const data = await response.json();
        const resultList = data.resultList || [];

        const formattedResults = resultList.map(item => ({
          label: item.SERIAL_LOT_CODE,
          value: item.SERIAL_LOT_CODE,
          status: item.STATUS,
          item: item.ITEM_NAME,
        }));

        setResults(formattedResults);
        setIsOpen(true); // 검색 결과가 있을 때 드롭다운 열기
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [term]);

  const handleSelect = (selectedItem) => {
    onClick(selectedItem);
    setIsOpen(false); // 항목 선택 후 드롭다운 닫기
  };

  return (
    <div className="autocomplete-container">
      <input
        className = 'form-control'
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        minLength={2}
        autoFocus={true}
        placeholder=""
      />
      {isOpen && (
        <div className="dropdown autocomplete">
          {results.map((item) => (
            <div
              key={item.value}
              className="dropdown-item autocomplete-item"
              onClick={() => handleSelect(item)}
            >
              <span className=''>{item.label}</span>
              <span className="sy-item">{item.item}</span>
              <span className={`sy-status badge text-bg-${item.status == '미등록' ? 'secondary' : 'success'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Autocomplete;

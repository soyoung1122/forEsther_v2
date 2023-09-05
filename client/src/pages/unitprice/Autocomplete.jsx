import React, { useState, useEffect } from 'react';
import "../../styles/unitprices/Unitprice.css";

function Autocomplete({ onClick, value }) {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (term.length < 2) {
      setIsOpen(false); // 검색어가 2자 이하일 때 드롭다운 닫기
      return;
    }

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
    setTerm(selectedItem.value); // 선택한 항목의 값을 인풋창에 입력
    setIsOpen(false); // 항목 선택 후 드롭다운 닫기
  };

  const handleInputChange = (e) => {
    setTerm(e.target.value);
    setIsOpen(false); // 입력이 변경되면 드롭다운 닫기
  };

  return (
    <div className="autocomplete-container">
      <input
        className='form-control'
        type="text"
        value={term}
        onChange={handleInputChange}
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

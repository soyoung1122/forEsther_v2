import React, { useState, useEffect } from 'react';

function Autocomplete() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (term.length < 2) {
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
        setIsOpen(true);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [term]);

  const handleSelect = (selectedItem) => {
    console.log(selectedItem.item);
    // 선택한 항목을 처리하거나 다른 작업을 수행합니다.
    // 예를 들어, state를 업데이트하거나 다른 동작을 수행할 수 있습니다.
    setIsOpen(false); // 항목 선택 후 드롭다운 닫기
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        minLength={2}
        autoFocus={true}
        placeholder="검색어 입력"
      />
      {isOpen && (
        <div className="dropdown">
          {results.map((item) => (
            <div
              key={item.value}
              className="dropdown-item"
              onClick={() => handleSelect(item)}
            >
              <span>{item.label}</span>
              <span className="sy-item">{item.item}</span>
              <span className={`sy-status badge bg-label-${item.status === '미등록' ? 'secondary' : 'info'}`}>
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

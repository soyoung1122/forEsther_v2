import { useState } from "react";

const SearchInput = ({onSubmit, disabled}) => {
  const [inputVal, setInputVal] = useState("");
  const styleSheet = {
    marginBottom: "10px",
  }
  return (
    <div 
      style={styleSheet}
      className="input-group input-group-merge"
    >
      <input
        name="keyword"
        type="text"
        className="form-control"
        placeholder="검색..."
        aria-label="검색..."
        aria-describedby="basic-addon-search31"
        onChange={(e) => {setInputVal(e.target.value)}}
        value={inputVal}
        disabled={disabled}
      />
      <button 
        type="submit" 
        className="btn btn-secondary search-btn"
        onClick={(e) => {
          e.preventDefault();
          onSubmit(inputVal);
        }}
        style={{ cursor: `${disabled ? 'not-allowed' : 'pointer'}` }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </button>
    </div>
  );
}

export default SearchInput;
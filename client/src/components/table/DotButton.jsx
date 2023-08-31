const DotButton = ({btns}) => {

  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle-hide-arrow"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
      </button>
      <ul className="dropdown-menu">
        {
          btns.map((btn, index) => {
            return (
              <li key={index}>
                <button 
                  className="dropdown-item" 
                  type="button"
                  onClick={btn["onClick"]}
                >
                  {btn["text"]}
                </button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default DotButton;
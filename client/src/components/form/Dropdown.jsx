import { Link } from 'react-router-dom';

const Dropdown = ({value, list, itemValue, onClick}) => {
  return (
    <div className="dropdown">
      <button className="btn btn-outline-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        {value}
      </button>
      <ul className="dropdown-menu w-100">
        {
          list.map(item => (
            <li >
              <Link to='#' className="dropdown-item" value={itemValue} onClick={onClick}>
                {item.value}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Dropdown;
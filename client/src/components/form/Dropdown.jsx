import { Link } from 'react-router-dom';

const Dropdown = ({initValue, list, onClick}) => {
  //initValue  : 초기 값
  //list : 드롭다운 리스트 / 예: [{id: 1, name: :"사과", value: "apple"}, {id: 2, name: "바나나", value: "banana"}]

  return (
    <div className="dropdown">
      <button className="btn btn-outline-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        {initValue}
      </button>
      <ul className="dropdown-menu w-100">
        {
          list.map(item => (
            <li>
              <Link to='#' className="dropdown-item" value={item.value} onClick={onClick}>
                {item.name}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Dropdown;
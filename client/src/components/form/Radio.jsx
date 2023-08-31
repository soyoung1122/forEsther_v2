const Radio = ({id, name, value, onChange}) => {
  // id : label과 연결될 값
  // name : 라디오 버튼 그룹핑되는 값 => 그룹핑 되어야 단일 선택 가능함
  // value : 클릭 이벤트 시 가져올 수 있는 값

  return (
    <input className="form-check-input" type="radio" name={name} id={id} value={value} onChange={onChange}/>
  )
}

export default Radio;

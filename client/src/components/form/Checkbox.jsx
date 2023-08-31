const Checkbox = ({id, value, isChecked, onClick }) => {
  return (
    <input className="form-check-input" type="checkbox" value={value} id={id} checked={isChecked} onClick={onClick} />
  )
}

export default Checkbox;
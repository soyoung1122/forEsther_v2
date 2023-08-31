const Select = ({optionList}) => {
  return (
    <select class="form-select" aria-label="Default select example">
      {
        optionList.map(option => {
          <option value={option.value} selected={isSelected}>{option.name}</option>
        })
      }
    </select>
  )
}

export default Select;
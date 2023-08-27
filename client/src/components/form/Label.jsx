const Label = ({id, value}) => {
  return (
    <label htmlFor={id} class="form-label">{value}</label>
  )
}

export default Label;
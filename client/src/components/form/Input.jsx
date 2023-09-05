const Input = ({type = "text", id, placeholder, onChange, value, disabled}) => {
  return (
    <input 
      type={type} 
      id={id}
      value={value}
      placeholder={placeholder}
      className="form-control"
      onChange={onChange}
      disabled={disabled}
      />
  )
}

export default Input;
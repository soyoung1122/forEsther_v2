const Input = ({type = "text", id, placeholder, onChange, value}) => {
  return (
    <input 
      type={type} 
      id={id}
      value={value}
      placeholder={placeholder}
      className="form-control"
      onChange={onChange}/>
  )
}

export default Input;
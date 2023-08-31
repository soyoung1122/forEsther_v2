const Input = ({type = "text", id, placeholder, onChange}) => {
  return (
    <input 
      type={type} 
      id={id}
      placeholder={placeholder}
      className="form-control"
      onChange={onChange}/>
  )
}

export default Input;
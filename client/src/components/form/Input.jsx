const Input = ({type, id, placeholder}) => {
  return (
    <input 
      type={type} 
      id={id}
      placeholder={placeholder}
      class="form-control"/>
  )
}

export default Input;
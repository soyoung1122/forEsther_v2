const Button = ({type, value, onClick}) => {
  return (
    <button type={type} className="btn btn-primary w-100" onClick={onClick}>{value}</button>
  )
}

export default Button;
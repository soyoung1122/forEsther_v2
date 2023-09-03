const Button = ({type, value, className,  onClick}) => {
  return (
    <button type={type} className={`btn w-100 ${className}`} onClick={onClick}>{value}</button>
  )
}

export default Button;
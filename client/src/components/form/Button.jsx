const Button = ({type, value, className,  onClick, disabled}) => {
  return (
    <button 
      type={type} 
      className={`btn w-100 ${className}`} 
      onClick={onClick} 
      disabled={disabled}
      style={{ cursor: `${disabled ? 'not-allowed' : 'pointer'}` }}
    >
      {value}
    </button>
  )
}

export default Button;